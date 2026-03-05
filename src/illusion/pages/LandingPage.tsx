import useGameStore from '../game/store'
import type { PageProps } from '../game/types'
import { motion } from 'framer-motion'

export default function Landing({ onStart }: PageProps) {
    const reset = useGameStore(s => s.reset)
    const startGame = useGameStore(s => s.startGame)

    const start = () => {
        reset()
        startGame()
        onStart!()
    }

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
            backgroundColor: '#0f172a'
        }}
    >
        <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
        >Can You Beat Your Own Brain??</motion.h1>
        <motion.p
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{ fontSize: 18 }}
        >Test your perception with a series of illusions. See if you can spot the tricks your brain is playing on you!</motion.p>
        <motion.button
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            onClick={start}
            style={{
                padding: '1rem 4rem',
                fontSize: 16,
                cursor: 'pointer',
                backgroundColor: '#1e293b',
                color: '#fff',
                borderRadius: 8,
                border: '1px solid #334155',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
        >
            Start Game
        </motion.button>
    </motion.div>
}
