import useWorldStore from '../game/store'
import { motion } from 'framer-motion'

function StatBar({ label, value }: { label: string, value: number }) {
    const getColor = () => {
        if(value > 60) return '#22c55e'
        if(value > 30) return '#eab308'
        return '#ef4444'
    }

    return <motion.div style={{ marginBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{label}</span>
            <span>{value}</span>
        </div>
        <div style={{
            height: 10,
            backgroundColor: '#1f2937',
            borderRadius: 5,
            marginTop: 4
        }}>
            <motion.div
                style={{
                    height: '100%',
                    backgroundColor: getColor(),
                    borderRadius: 5
                }}
                animate={{ width: `${value}%` }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
            />
        </div>
    </motion.div>
}

export default function WorldStats() {
    const world = useWorldStore(s => s.world)
    
    return <div style={{ padding: 20, backgroundColor: '#1e293b', borderRadius: 12, width: '40vw' }}>
        <h2>Money: ${world.money.toLocaleString('en-US')}</h2>
        <StatBar label='Economy' value={world.economy} />
        <StatBar label='Housing' value={world.housingSupply} />
        <StatBar label='Food' value={world.foodSupply} />
        <StatBar label='Stability' value={world.politicalStability} />
        <StatBar label='Environment' value={world.environment} />
        <StatBar label='Sentiment' value={world.publicSentiment} />
    </div>
}
