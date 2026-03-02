import purchases from '../game/purchases'
import useWorldStore from '../game/store'
import { motion } from 'framer-motion'

export default function PurchaseList() {
    const buy = useWorldStore(s => s.buy)
    const money = useWorldStore(s => s.world.money)

    return <div>
        <h2>Purchases</h2>
        <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))' }}>
            {purchases.map(p => {
                const canAfford = money >= p.cost
                return <motion.div
                    key={p.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => canAfford && buy(p)}
                    style={{
                        padding: 16,
                        borderRadius: 12,
                        backgroundColor: '#1e293b',
                        cursor: canAfford ? 'pointer' : 'not-allowed',
                        opacity: canAfford ? 1 : 0.5,
                        border: '1px solid #334155'
                    }}
                >
                    <h3 style={{ margin: 0 }}>{p.name}</h3>
                    <strong>${p.cost.toLocaleString('en-US')}</strong>
                </motion.div>
            })}
        </div>
    </div>
}
