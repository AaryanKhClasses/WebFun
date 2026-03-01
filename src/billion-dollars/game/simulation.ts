import type { WorldState } from './types'

export default function runSimulationTick(world: WorldState) {
    if(world.housingSupply < 40) {
        world.publicSentiment -= 5
        world.news.push('Housing shortage causes public dissatisfaction.')
    }

    if(world.foodSupply < 30) {
        world.economy -= 4
        world.news.push('Food shortage leads to economic downturn.')
    }

    if(world.publicSentiment < 30) {
        world.politicalStability -= 10
        world.news.push('Protests erupt due to low public sentiment.')
    }

    if(world.environment < 30) {
        world.foodSupply -=5
    }

    clampWorld(world)
}

function clampWorld(world: WorldState) {
    const keys = [
        'economy', 'housingSupply', 'foodSupply', 'publicSentiment', 'politicalStability', 'environment'
    ] as const

    keys.forEach(key => {
        world[key] = Math.max(0, Math.min(100, world[key]))
    })
}
