import illusions from '../game/illusions'
import useGameStore from '../game/store'
import type { PageProps } from '../game/types'
import { motion } from 'framer-motion'

export default function Game({ onFinish }: PageProps) {
    const current = useGameStore(s => s.current)
    const next = useGameStore(s => s.next)

    const illusion = illusions[current]
    if (!illusion) {
        onFinish!()
        return null
    }

    const Component = illusion.Component
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
        >{illusion.title}</motion.h1>
        <Component onAnswer={next} />
    </motion.div>
}
