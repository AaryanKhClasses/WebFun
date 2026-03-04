import useGameStore from '../game/store'
import type { PageProps } from '../game/types'
import { motion } from 'framer-motion'

export default function Result({ onRestart }: PageProps) {
    const fooled = useGameStore(s => s.fooledCount)

    return <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
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
        >Results!</motion.h1>
        <motion.p
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
        >You were fooled by <b>{fooled}</b> illusion(s)!</motion.p>
        <motion.button
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            onClick={onRestart}
            style={{
                padding: '1rem 4rem',
                fontSize: 16,
                cursor: 'pointer',
                backgroundColor: '#1e293b',
                color: '#fff',
                borderRadius: 8,
                border: '1px solid #334155',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}>Try Again!</motion.button>
    </motion.div>
}
