import { motion, AnimatePresence } from 'framer-motion'

export default function ResultSplash({ show, fooled }: { show: boolean, fooled: boolean }) {
    return <AnimatePresence>
        {show && <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.5 }}
            style={{
                position: 'fixed',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(15, 23, 42, 0.8)',
                pointerEvents: 'none',
                zIndex: 1000
            }}
        >
            <motion.div
                initial={{ y: 100, opacity: 0, scale: 0.7 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.3 }}
                style={{
                    fontSize: 72,
                    fontWeight: 'bold',
                    color: fooled ? '#ef4444' : '#22c55e',
                    textShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
            >{fooled ? 'Fooled!' : 'Resisted!'}</motion.div>
        </motion.div>}
    </AnimatePresence>
}
