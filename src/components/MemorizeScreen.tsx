import { motion } from 'framer-motion'
import { useGame } from '../game/GameProvider'
import { hslToCss } from '../game/utils'
import { useEffect } from 'react'
import TimerCircle from '../ui/TimerCircle'
import RoundIndicator from '../ui/RoundIndicator'

const DURATION = 5

export default function MemorizeScreen() {
    const { state, startGuessPhase } = useGame()

    const round = state.rounds[state.roundIndex]
    const color = hslToCss(round.target)

    useEffect(() => {
        const timer = setTimeout(() => {
            startGuessPhase()
        }, DURATION * 1000)
        return () => clearTimeout(timer)
    }, [])

    return <motion.div
        key={state.roundIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{
            height: '100vh',
            width: '100vw',
            backgroundColor: color,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'
        }}
    >
        <TimerCircle duration={DURATION} />
        <RoundIndicator round={state.roundIndex + 1} total={state.rounds.length} />
    </motion.div>
}
