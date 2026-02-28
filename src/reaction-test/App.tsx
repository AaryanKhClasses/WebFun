import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import './style.css'
import ReactionGraph from './components/ReactionGraph'

type State = 'idle' | 'waiting' | 'ready' | 'too-early'

export default function ReactionTest() {
    const [state, setState] = useState<State>('idle')
    const [reactionTime, setReactionTime] = useState<number | null>(null)
    const [attempts, setAttempts] = useState<number[]>([])

    const startTimeRef = useRef<number>(0)
    const timeoutRef = useRef<number | null>(null)

    const handleClick = () => {
        switch(state) {
            case 'idle': return startWaiting()
            case 'waiting': return tooEarly()
            case 'ready': return recordReaction()
            case 'too-early': return reset()
        }
    }

    const startWaiting = () => {
        setState('waiting')
        setReactionTime(null)

        const delay = 2000 + Math.random() * 3000
        timeoutRef.current = window.setTimeout(() => {
            startTimeRef.current = performance.now()
            setState('ready')
        }, delay)
    }

    const tooEarly = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        setState('too-early')
    }

    const recordReaction = () => {
        const time = performance.now() - startTimeRef.current
        setReactionTime(time)
        setAttempts(prev => [...prev, time])
        setState('idle')
    }

    const reset = () => {
        setState('idle')
        setReactionTime(null)
    }

    const getBackground = () => {
        switch(state) {
            case 'waiting': return '#c40303'
            case 'ready': return '#019d01'
            case 'too-early': return '#0000b5'
            default: return '#333'
        }
    }

    const getMessage = () => {
        switch(state) {
            case 'idle': return reactionTime ? `Your reaction time: ${reactionTime.toFixed(2)} ms` : 'Click to start'
            case 'waiting': return 'Wait for green...'
            case 'ready': return 'Click now!'
            case 'too-early': return 'Too early! Click to try again.'
        }
    }

    return <motion.div
        className="screen"
        animate={{ background: getBackground() }}
        transition={{ duration: state === "ready" ? 0 : 0.5 }}
        onClick={handleClick}
    >
        <motion.div
            key={state + reactionTime}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.2 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: 'center' }}
        >
            <div style={{ fontSize: '2em' }}>{getMessage()}</div>
            {state === 'idle' && attempts.length >= 2 && <ReactionGraph data={attempts} />}
        </motion.div>
    </motion.div>
}
