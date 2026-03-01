import useWorldStore from '../game/store'

export default function WorldStats() {
    const world = useWorldStore(s => s.world)
    
    return <div>
        <h2>Money: ${world.money.toLocaleString('en-US')}</h2>
        <p>Economy: {world.economy}</p>
        <p>Housing Supply: {world.housingSupply}</p>
        <p>Food Supply: {world.foodSupply}</p>
        <p>Political Stability: {world.politicalStability}</p>
        <p>Environment: {world.environment}</p>
        <p>Public Sentiment: {world.publicSentiment}</p>
    </div>
}
