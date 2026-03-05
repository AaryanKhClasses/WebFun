import { useEffect } from 'react'
import useGameStore from '../game/store'
import { motion } from 'framer-motion'

export default function GameTimer() {
    const elapsed = useGameStore(s => s.elapsed)
    const tick = useGameStore(s => s.tick)

    useEffect(() => {
        const id = setInterval(tick, 100)
        return () => clearInterval(id)
    }, [])

    const seconds = Math.floor(elapsed / 1000)
    const minutes = Math.floor(seconds / 60)
    const remaining = seconds % 60
    const time = `${minutes}:${remaining.toString().padStart(2, '0')}`

    return <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
            position: 'absolute',
            top: 20,
            right: 20,
            width: 60,
            height: 60,
            borderRadius: '50%',
            backgroundColor: '#1e293b',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
            fontWeight: 'bold',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}
    >{time}</motion.div>
}
