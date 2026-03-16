import { useEffect, useRef, useState } from 'react'
import type { GamePhase, HitResult, RoundConfig } from './types'

const KEY_POOL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

function randomKey() {
    return KEY_POOL[Math.floor(Math.random() * KEY_POOL.length)]
}

function randomZone(width: number) {
    const min = 0.3, max = 0.7 - width
    return Math.random() * (max - min) + min
}

export const rounds: RoundConfig[] = [
    { type: 'normal', speed: 0.4, greenWidth: 0.18 },
    { type: 'fake', speed: 0.45, greenWidth: 0.16 },
    { type: 'reverse', speed: 0.5, greenWidth: 0.15 },
    { type: 'fake', speed: 0.55, greenWidth: 0.14 },
    { type: 'suddenDeath', speed: 0.6, greenWidth: 0.13 },
    { type: 'reverse', speed: 0.65, greenWidth: 0.12 },
    { type: 'normal', speed: 0.7, greenWidth: 0.11 },
    { type: 'reverse', speed: 0.75, greenWidth: 0.10 },
    { type: 'suddenDeath', speed: 0.8, greenWidth: 0.08 },
    { type: 'fake', speed: 0.9, greenWidth: 0.06 }
]

export function useQTE() {
    const [phase, setPhase] = useState<GamePhase>('countdown')
    const [result, setResult] = useState<HitResult | null>(null)
    const [countdown, setCountdown] = useState(3)

    const [round, setRound] = useState(0)
    const [score, setScore] = useState(0)
    const [stats, setStats] = useState<{ [key in HitResult]: number }>({ perfect: 0, great: 0, good: 0, miss: 0 })
    const [gameOver, setGameOver] = useState(false)

    const [requiredKey, setRequiredKey] = useState(randomKey())
    const [displayKey, setDisplayKey] = useState(requiredKey)
    const [fakeSwitch, setFakeSwitch] = useState(false)
    const [greenStart, setGreenStart] = useState(0.4)
    const [arrowPos, setArrowPos] = useState(0)

    const arrowRef = useRef(0)
    const dirRef = useRef(1)
    const animRef = useRef<number>(0)
    const gameActiveRef = useRef(false)

    const config = rounds[round]

    useEffect(() => {
        const real = randomKey()
        let fake = randomKey()
        while(fake === real) fake = randomKey()

        setRequiredKey(real)
        setFakeSwitch(false)
        if(config.type === 'fake') setDisplayKey(fake)
        else setDisplayKey(real)

        setGreenStart(randomZone(config.greenWidth))
        
        arrowRef.current = config.type === 'reverse' ? 1 : 0
        dirRef.current = config.type === 'reverse' ? -1 : 1
        setArrowPos(arrowRef.current)
    }, [round])

    useEffect(() => {
        if(phase !== 'playing') {
            gameActiveRef.current = false
            return
        }

        gameActiveRef.current = true
        let last = performance.now()
        
        const traverseTime = 1 / config.speed
        const timeoutId = setTimeout(() => {
            if(gameActiveRef.current) {
                gameActiveRef.current = false
                triggerResult('miss')
            }
        }, traverseTime * 1000)
        
        function loop(now: number) {
            if(!gameActiveRef.current) return
            
            const dt = (now - last) / 1000
            last = now

            arrowRef.current += dirRef.current * config.speed * dt

            if(config.type === 'fake' && !fakeSwitch && arrowRef.current > greenStart - 0.15) {
                setDisplayKey(requiredKey)
                setFakeSwitch(true)
            }
            
            setArrowPos(arrowRef.current)
            animRef.current = requestAnimationFrame(loop)
        }
        animRef.current = requestAnimationFrame(loop)
        return () => {
            gameActiveRef.current = false
            clearTimeout(timeoutId)
            cancelAnimationFrame(animRef.current)
        }
    }, [phase, round, greenStart, fakeSwitch, config.type, requiredKey])

    useEffect(() => {
        if(phase !== 'countdown') return
        setCountdown(3)
        let n = 4
        const interval = setInterval(() => {
            n--
            if(n <= 0) {
                clearInterval(interval)
                setPhase('playing')
            }
            setCountdown(n-1)
        }, 1000)

        return () => clearInterval(interval)
    }, [phase, round])

    function evaluateHit(): HitResult {
        if(arrowRef.current < 0 || arrowRef.current > 1) return 'miss'
        
        const center = greenStart + config.greenWidth / 2
        const dist = Math.abs(arrowRef.current - center)

        if(dist < 0.02) return 'perfect'
        if(dist < 0.05) return 'great'
        if(dist < 0.1) return 'good'
        return 'miss'
    }

    function points(result: HitResult) {
        if(result === 'perfect') return 100
        if(result === 'great') return 70
        if(result === 'good') return 40
        return 0
    }

    function triggerResult(res: HitResult) {
        setResult(res)
        const pts = points(res)
        setScore(s => s + pts)
        setPhase('result')
        setStats(st => ({ ...st, [res]: st[res] + 1 }))

        setTimeout(() => {
            if(config.type === 'suddenDeath' && res === 'miss') return setGameOver(true)
            if(round + 1 >= rounds.length) return setGameOver(true)
            setPhase('countdown')
            setRound(r => r + 1)
            setResult(null)
        }, 1000)
    }

    function roundLabel(type: RoundConfig['type']) {
        switch(type) {
            case 'reverse': return 'Reverse Arrow'
            case 'suddenDeath': return 'Sudden Death'
            default: return 'Quick Time Event'
        }
    }

    function getRank(score: number) {
        if(score == 1000) return 'SS'
        if(score >= 800) return 'S'
        if(score >= 600) return 'A'
        if(score >= 400) return 'B'
        if(score >= 200) return 'C'
        return 'D'
    }

    useEffect(() => {
        function handleKey(e: KeyboardEvent) {
            if(gameOver || phase !== 'playing') return
            const key = e.key.toUpperCase()

            if(key !== requiredKey) {
                gameActiveRef.current = false
                return triggerResult('miss')
            }
            const result = evaluateHit()
            gameActiveRef.current = false
            triggerResult(result)
        }

        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [phase, requiredKey, round])

    return {
        round, score, gameOver, phase, stats, result, countdown, displayKey, roundLabel, getRank, arrowPos, greenStart, greenWidth: config.greenWidth, roundType: config.type
    }
}
