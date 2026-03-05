import { useState } from 'react'
import type { IllusionComponentProps } from '../game/types'
import { motion } from 'framer-motion'
import ResultSplash from '../ui/ResultSplash'

function generateLines() {
    const base = 240
    const same = Math.random() < 0.45

    let left = base, right = base

    if(!same) {
        const diff = 20 + Math.random() * 30
        if(Math.random() < 0.5) left += diff
        else right += diff
    }

    const correct = left > right ? 'left' : right > left ? 'right' : 'none'
    return { left, right, correct }
}

export default function MullerLyerIllusion({ onAnswer }: IllusionComponentProps) {
    const [lines] = useState(generateLines)
    const [revealed, setRevealed] = useState(false)
    const [fooled, setFooled] = useState(false)

    const choose = (side: 'left' | 'right') => {
        const result = side !== lines.correct
        setFooled(result)
        setRevealed(true)
        setTimeout(() => onAnswer(result), 2000)
    }

    return <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
            justifyContent: 'center',
            height: '100vh',
            textAlign: 'center',
            backgroundColor: '#0f172a',
            padding: 40
        }}
    >
        <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
        >Which line is longer?</motion.h1>

        <motion.div
            style={{
                display: 'flex',
                gap: 40,
                marginTop: 20,
                justifyContent: 'center'
            }}
        >
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                onClick={() => !revealed && choose('left')}
                style={{
                    width: lines.left,
                    height: 10,
                    backgroundColor: '#fff',
                    position: 'relative',
                    cursor: 'pointer'
                }}
            />
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                onClick={() => !revealed && choose('right')}
                style={{
                    width: lines.right,
                    height: 10,
                    backgroundColor: '#fff',
                    position: 'relative',
                    cursor: 'pointer'
                }}
            />
        </motion.div>
        {revealed && lines.correct === 'none' && <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
        >
            <p style={{ marginTop: 20 }}>Trick question! Both lines are the same length.</p>
        </motion.div>}
        {revealed && lines.correct !== 'none' && <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
        >
            <p style={{ marginTop: 20 }}>The correct answer is the <b>{lines.correct}</b> line. The arrows create a context that tricks your brain into misjudging the lengths!</p>
        </motion.div>}
        <ResultSplash show={revealed} fooled={!!fooled} />
    </motion.div>
}
