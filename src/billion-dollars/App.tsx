import { useEffect } from 'react'
import GraphPanel from './components/GraphPanel'
import PurchaseList from './components/PurchaseList'
import WorldStats from './components/WorldStats'
import useWorldStore from './game/store'
import NewsFeed from './components/NewsFeed'
import './style.css'
import CollapseOverlay from './components/CollapseOverlay'

export default function BillionDollars() {
    const tickWorld = useWorldStore(s => s.tickWorld)
    useEffect(() => {
        const interval = setInterval(() => tickWorld(), 2000)
        return () => clearInterval(interval)
    }, [])

    return <div style={{
        padding: 20,
        backgroundColor: '#0f172a',
        color: 'white',
        minHeight: '100vh'
    }}>
        <h1>Spend a Billion Dollars</h1>
        <div style={{
            display: 'flex',
            gap: 20,
            alignItems: 'flex-start',
            marginTop: 20
        }}>
            <WorldStats />
            <GraphPanel />
        </div>
        <div style={{ marginTop: 20 }}>
            <PurchaseList />
            <NewsFeed />
        </div>
        <CollapseOverlay />
    </div>
}
