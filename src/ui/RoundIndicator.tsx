import { motion } from 'framer-motion'

export default function RoundIndicator({ round, total }: { round: number, total: number }) {
    return <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 0.3 }}
        style={{
            position: 'absolute',
            bottom: 30,
            fontSize: '14px',
            letterSpacing: '2px',
            color: 'white'
        }}
    >ROUND {round} / {total}</motion.div>
}
