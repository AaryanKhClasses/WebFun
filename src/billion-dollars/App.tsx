import GraphPanel from './components/GraphPanel'
import PurchaseList from './components/PurchaseList'
import WorldStats from './components/WorldStats'

export default function BillionDollars() {
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
        </div>
    </div>
}
