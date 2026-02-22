import { motion } from 'framer-motion'
import type { HSL } from '../game/types'

export default function ColorCard({ label, color, hsl }: { label: string, color: string, hsl: HSL }) {
    return <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px'
        }}
    >
        <div style= {{
            fontSize: '12px',
            opacity: 0.6,
            letterSpacing: '2px'
        }}>{label}</div>
        <div style={{
            width: 140,
            height: 140,
            borderRadius: 16,
            backgroundColor: color,
            border: '1px solid #222'
        }} />
        <div style={{
            fontSize: '13px',
            textAlign: 'center',
            lineHeight: 1.6,
            opacity: 0.8
        }}>
            H {Math.round(hsl.h)}°<br />
            S {Math.round(hsl.s)}%<br />
            L {Math.round(hsl.l)}%
        </div>
    </motion.div>
}
