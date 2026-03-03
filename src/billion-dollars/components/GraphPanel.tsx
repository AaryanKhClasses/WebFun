import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import useWorldStore from '../game/store'

export default function GraphPanel() {
    const history = useWorldStore(s => s.world.history)

    return <div style={{ width: '100%', height: 300 }}>
        <h2>World Trends</h2>
        <ResponsiveContainer width='100%' height='100%'>
            <LineChart data={history}>
                <XAxis dataKey='tick' />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line type='monotone' dataKey='economy' stroke='#22c55e' />
                <Line type='monotone' dataKey='stability' stroke='#3b82f6' />
                <Line type='monotone' dataKey='sentiment' stroke='#f59e0b' />
            </LineChart>
        </ResponsiveContainer>
    </div>
}
