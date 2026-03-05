import illusions from '../game/illusions'
import useGameStore from '../game/store'
import { motion } from 'framer-motion'

export default function ProgressBar() {
    const current = useGameStore(s => s.current)
    const progress = (current / illusions.length) * 100

    return <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
        style={{
            position: 'fixed',
            bottom: 30,
            left: '50%',
            transform: 'translateX(-50%)',
            height: 10,
            width: 400,
            backgroundColor: '#334155',
            borderRadius: 5,
            overflow: 'hidden',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}
    >
        <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            style={{
                height: '100%',
                backgroundColor: '#22c55e',
                borderRadius: 5,
                boxShadow: '0 2px 4px rgba(34, 197, 94, 0.6)'
            }}
        />
    </motion.div>
}
