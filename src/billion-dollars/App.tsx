import PurchaseList from './components/PurchaseList'
import WorldStats from './components/WorldStats'

export default function BillionDollars() {
    return <div style={{ padding: 20 }}>
        <h1>Spend a Billion Dollars</h1>
        <WorldStats />
        <PurchaseList />
    </div>
}
