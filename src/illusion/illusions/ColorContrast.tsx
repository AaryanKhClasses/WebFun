import { useState } from 'react'
import type { IllusionComponentProps } from '../game/types'
import { motion } from 'framer-motion'
import ResultSplash from '../ui/ResultSplash'

function generateColorPair() {
    const hue = Math.floor(Math.random() * 360)
    const saturation = 60 + Math.random() * 20
    const baseLightness = 50 + Math.random() * 10

    const delta = Math.random()
    const identical = delta < 0.2
    const lighter = baseLightness + delta
    const darker = baseLightness - delta

    const askLighter = Math.random() < 0.5
    const swap = Math.random() < 0.5
    
    const lightColor = `hsl(${hue}, ${saturation}%, ${lighter}%)`
    const darkColor = `hsl(${hue}, ${saturation}%, ${darker}%)`
    
    const left = swap ? lightColor : darkColor
    const right = swap ? darkColor : lightColor
    
    let correct: 'left' | 'right'
    if(askLighter) correct = swap ? 'left' : 'right'
    else correct = swap ? 'right' : 'left'

    if(!identical) return { left, right, correct, ask: askLighter ? 'lighter' : 'darker' }
    return {
        left: lightColor,
        right: lightColor,
        correct: 'none',
        ask: askLighter ? 'lighter' : 'darker'
    }
}

export default function ColorContrastIllusion({ onAnswer }: IllusionComponentProps) {
    const [pair] = useState(generateColorPair)
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
        >Which square is {pair.ask}?</motion.h1>

        <motion.div
            style={{
                display: 'flex',
                gap: 40,
                marginTop: 20,
                justifyContent: 'center'
            }}
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6 }}
                onClick={() => !revealed && choose('left')}
                style={{
                    width: 150,
                    height: 150,
                    backgroundColor: pair.left,
                    cursor: 'pointer',
                    border: revealed && pair.correct === 'left' ? '4px solid #22c55e' : '4px solid transparent',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    borderRadius: 8
                }} />
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6 }}
                onClick={() => !revealed && choose('right')}
                style={{
                    width: 150,
                    height: 150,
                    backgroundColor: pair.right,
                    cursor: 'pointer',
                    border: revealed && pair.correct === 'right' ? '4px solid #22c55e' : '4px solid transparent',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    borderRadius: 8
                }} />
        </motion.div>
        {revealed && pair.correct === 'none' && <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
        >
            <p style={{ marginTop: 20 }}>Trick question! Both squares are the same color.</p>
        </motion.div>}
        {revealed && pair.correct !== 'none' && <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
        >
            <p style={{ marginTop: 20 }}>The correct answer was on the {pair.correct}!</p>
        </motion.div>}
        <ResultSplash show={revealed} fooled={!!fooled} />
    </motion.div>
}
