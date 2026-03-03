import { AnimatePresence, motion } from 'framer-motion'
import useWorldStore from '../game/store'
import { useEffect } from 'react'

function getColor(category: string) {
    switch(category) {
        case 'economy': return '#22c55e'
        case 'disaster': return '#ef4444'
        case 'politics': return '#eab308'
        case 'environment': return '#3b82f6'
        default: return '#6b7280'
    }
}

export default function NewsFeed() {
    const news = useWorldStore(s => s.world.news)
    const removeNews = useWorldStore(s => s.removeNews)

    return <div style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        width: 300,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        zIndex: 1000
    }}>
        <AnimatePresence initial={false}>
            {news.map(item => <Toast key={item.id} item={item} onClose={() => removeNews(item.id)} />)}
        </AnimatePresence>
    </div>
}

function Toast({ item, onClose }: { item: any, onClose: () => void }) {
    useEffect(() => {
        const timer = setTimeout(onClose, 5000)
        return () => clearTimeout(timer)
    }, [])

    return <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.3 }}
        style={{
            padding: 12,
            borderRadius: 8,
            backgroundColor: '#1e293b',
            color: 'white',
            fontWeight: 'bold',
            borderLeft: `4px solid ${getColor(item.category)}`,
            boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
        }}
    >{item.title}</motion.div>
}
