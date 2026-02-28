import { motion, animate } from 'framer-motion'
import { hslToCss } from '../game/utils'
import { useEffect, useState } from 'react'
import ColorCard from '../ui/ColorCard'
import Button from '../ui/Button'
import { useGame } from '../game/GameProvider'

export default function ResultScreen() {
    const { state, nextRound } = useGame()

    const round = state.rounds[state.roundIndex]
    const target = round.target
    const guess = round.guess!
    const score = round.score!

    const targetCss = hslToCss(target)
    const guessCss = hslToCss(guess)

    const [displayScore, setDisplayScore] = useState(0)

    useEffect(() => {
        const controls = animate(0, score, {
            duration: 2,
            ease: 'easeOut',
            onUpdate(value) {
                setDisplayScore(Number(value.toFixed(2)))
            }
        })
        return () => controls.stop()
    }, [])

    return <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '32px'
        }}
    >
        <div style={{
            display: 'flex',
            gap: '48px'
        }}>
            <ColorCard label='Target' color={targetCss} hsl={target} />
            <ColorCard label='Your Guess' color={guessCss} hsl={guess} />
        </div>

        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            style={{ fontSize: '36px', letterSpacing: '2px' }}
        >{displayScore.toFixed(2)} / 10</motion.div>

        <Button onClick={nextRound}>
            {state.roundIndex === 4 ? 'FINISH' : 'NEXT'}
        </Button>
    </motion.div>
}
