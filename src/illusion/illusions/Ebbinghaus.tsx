import { useState } from 'react'
import type { IllusionComponentProps } from '../game/types'
import { motion } from 'framer-motion'
import ResultSplash from '../ui/ResultSplash'

function generateEbbinghaus() {
    const base = 70
    const same = Math.random() < 0.45

    let left = base, right = base
    if(!same) {
        const diff = 6 + Math.random() * 12
        if(Math.random() < 0.5) left += diff
        else right += diff
    }

    const correct = left > right ? 'left' : right > left ? 'right' : 'none'
    return { left, right, leftOuter: 14, rightOuter: 34, correct }
}

export default function EbbinghausIllusion({ onAnswer }: IllusionComponentProps) {
    const [pair] = useState(generateEbbinghaus)
    const [revealed, setRevealed] = useState(false)
    const [fooled, setFooled] = useState(false)

    const choose = (side: 'left' | 'right') => {
        const result = side !== pair.correct
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
        >Which center circle is bigger?</motion.h1>

        <motion.div
            style={{
                display: 'flex',
                gap: 40,
                marginTop: 20,
                justifyContent: 'center'
            }}
        >
            <motion.div
                onClick={() => choose('left')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ cursor: 'pointer' }}
            >
                <CircleCenter centerSize={pair.left} outerSize={pair.leftOuter} />
            </motion.div>
            <motion.div
                onClick={() => choose('right')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ cursor: 'pointer' }}
            >
                <CircleCenter centerSize={pair.right} outerSize={pair.rightOuter} />
            </motion.div>
        </motion.div>
        {revealed && pair.correct === 'none' && <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
        >
            <p style={{ marginTop: 20 }}>Both circles are the same size!</p>
        </motion.div>}
        {revealed && pair.correct !== 'none' && <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
        >
            <p style={{ marginTop: 20 }}>Actually, the {pair.correct} circle is bigger!</p>
        </motion.div>}
        <ResultSplash show={revealed} fooled={!!fooled} />
    </motion.div>
}

function CircleCenter({ centerSize, outerSize }: { centerSize: number, outerSize: number }) {
    const outerCount = 6
    const radius = 70

    const circles = Array.from({ length: outerCount })
    return <div style={{
            position: 'relative',
            width: 200,
            height: 200
        }}
    >
        {circles.map((_, i) => {
            const angle = (i / outerCount) * Math.PI * 2
            const x = Math.cos(angle) * radius
            const y = Math.sin(angle) * radius

            return <div key={i} style={{
                position: 'absolute',
                width: outerSize,
                height: outerSize,
                borderRadius: '50%',
                backgroundColor: '#64748b',
                left: 100 + x - outerSize / 2,
                top: 100 + y - outerSize / 2
            }} />
        })}
        <div style={{
            position: 'absolute',
            width: centerSize,
            height: centerSize,
            borderRadius: '50%',
            backgroundColor: '#fff',
            left: 100 - centerSize / 2,
            top: 100 - centerSize / 2
        }} />
    </div>
}
