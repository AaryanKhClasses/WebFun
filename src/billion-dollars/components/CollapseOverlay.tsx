import { motion, AnimatePresence } from 'framer-motion'
import useWorldStore from '../game/store'
import type { GameStats } from '../game/types'

const collapseMessages = {
    civil_war: 'Civil War Erupts',
    economic_collapse: 'Global Economic Crisis',
    famine: 'Mass Starvation',
    environmental_disaster: 'Environmental Catastrophe',
    political_overthrow: 'Revolution and Regime Change',
}

function getRating(stats: GameStats) {
    if(stats.ticksSurvived > 100) return 'Stategic Mastermind'
    if(stats.ticksSurvived > 50) return 'Calculated Risk Taker'
    if(stats.ticksSurvived > 30) return 'Reckless Mogul'
    return 'Chaotic Billionare'
}

export default function CollapseOverlay() {
    const world = useWorldStore(s => s.world)
    const reset = useWorldStore(s => s.reset)

    const collapse = world.collapse
    const stats = world.stats

    return <AnimatePresence>
        {collapse && <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                padding: 20,
                textAlign: 'center'
            }}
        >
            <motion.h1
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                style={{ fontSize: 32, marginBottom: 20 }}
            >{collapseMessages[collapse]}</motion.h1>

            <div style={{ fontSize: 18, marginBottom: 30, lineHeight: 1.8 }}>
                <div>Total Spent: ${stats.totalSpent.toLocaleString('en-US')}</div>
                <div>Ticks Survived: {stats.ticksSurvived}</div>
                <div>Events Triggered: {stats.eventsTriggered}</div>
                <div>Peak Economy: {stats.peakEconomy}</div>
                <div>Lowest Stability: {stats.lowestStability}</div>
                <div style={{ marginTop: 10, fontStyle: 'italic' }}>Rating: {getRating(stats)}</div>
            </div>

            <button onClick={reset} style={{
                padding: '12px 24px',
                fontSize: 16,
                borderRadius: 8,
                cursor: 'pointer'
            }}>Restart World!</button>
        </motion.div>}
    </AnimatePresence>
}
