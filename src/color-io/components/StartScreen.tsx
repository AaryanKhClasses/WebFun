import { motion } from 'framer-motion'
import { useGame } from '../game/GameProvider'
import Button from '../ui/Button'

export default function StartScreen() {
    const { startGame } = useGame()

    return <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '24px'
        }}
    >
        <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
                fontSize: '48px',
                letterSpacing: '6px',
                fontWeight: 500
            }}
        >COLOR.IO</motion.h1>
        <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.6 }}
            style={{
                fontSize: '18px',
                letterSpacing: '2px'
            }}
        >Test your color perception...</motion.p>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
        >
            <Button onClick={startGame}>Start Game</Button>
        </motion.div>
    </motion.div>
}
