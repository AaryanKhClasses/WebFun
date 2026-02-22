import { motion } from 'framer-motion'
import { useGame } from '../game/GameProvider'
import { useState } from 'react'
import { hslToCss } from '../game/utils'
import Slider from '../ui/Slider'
import Button from '../ui/Button'
import RoundIndicator from '../ui/RoundIndicator'

export default function GuessScreen() {
    const { state, submitGuess } = useGame()

    const [h, setH] = useState(180)
    const [s, setS] = useState(50)
    const [l, setL] = useState(50)

    const preview = hslToCss({ h, s, l })

    return <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '24px'
        }}
    >
        <motion.div
            animate={{ backgroundColor: preview }}
            transition={{ duration: 0.5 }}
            style={{
                width: 160,
                height: 160,
                borderRadius: 16,
                border: '1px solid #222'
            }}
        />

        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
        }}>
            <Slider label='Hue' value={h} min={0} max={360} onChange={setH} />
            <Slider label='Saturation' value={s} min={0} max={100} onChange={setS} />
            <Slider label='Lightness' value={l} min={0} max={100} onChange={setL} />
        </div>

        <Button onClick={() => submitGuess({ h, s, l })}>GUESS</Button>
        <RoundIndicator round={state.roundIndex + 1} total={state.rounds.length} />
    </motion.div>
}
