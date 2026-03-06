import { useState } from 'react'
import type { IllusionComponentProps } from '../game/types'
import { motion } from 'framer-motion'
import ResultSplash from '../ui/ResultSplash'

function generateMotion() {
    const actuallyMoving = Math.random() < 0.45
    return { actuallyMoving, correct: actuallyMoving ? 'yes' : 'no' }
}

export default function PeripheralMotionIllusion({ onAnswer }: IllusionComponentProps) {
    const [data] = useState(generateMotion)
    const [revealed, setRevealed] = useState(false)
    const [fooled, setFooled] = useState(false)

    const choose = (side: 'yes' | 'no') => {
        const result = side !== data.correct
        setFooled(result)
        setRevealed(true)
        setTimeout(() => onAnswer(result), 2000)
    }

    return <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
    >
        <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
        >Do you see motion?</motion.h1>
        <MotionPattern rotating={data.actuallyMoving} />

        <motion.div
            style={{
                display: 'flex',
                gap: 40,
                marginTop: 20,
                justifyContent: 'center'
            }}
        >
            <motion.button
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                onClick={() => choose('yes')}
                style={{ padding: '10px 20px', fontSize: 18, cursor: 'pointer' }}
            >Yes</motion.button>
            <motion.button
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                onClick={() => choose('no')}
                style={{ padding: '10px 20px', fontSize: 18, cursor: 'pointer' }}
            >No</motion.button>
        </motion.div>
        {revealed && <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
        >
            <p style={{ marginTop: 20 }}>The pattern was {data.actuallyMoving ? 'rotating!' : 'actually completely static...'}!</p>
        </motion.div>}
        <ResultSplash show={revealed} fooled={!!fooled} />
    </motion.div>
}

function MotionPattern({ rotating }: { rotating: boolean }) {
    return <div style={{
        width: 360,
        height: 360,
        borderRadius: '50%',
        background: 'conic-gradient(from 0deg, #64748b 0deg 30deg, transparent 30deg 60deg, #64748b 60deg 90deg, transparent 90deg 120deg, #64748b 120deg 150deg, transparent 150deg 180deg, #64748b 180deg 210deg, transparent 210deg 240deg, #64748b 240deg 270deg, transparent 270deg 300deg, #64748b 300deg 330deg, transparent 330deg 360deg)',
        backgroundSize: '60px 60px',
        animation: rotating ? 'spin 1800s linear infinite' : 'none'
    }} />
}
