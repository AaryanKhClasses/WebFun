import purchases from '../game/purchases'
import useWorldStore from '../game/store'

export default function PurchaseList() {
    const buy = useWorldStore(s => s.buy)

    return <div>
        <h2>Purchases</h2>
        {purchases.map(p => <button key={p.id} onClick={() => buy(p)}>
            {p.name} - ${p.cost.toLocaleString('en-US')}
        </button>)}
    </div>
}
