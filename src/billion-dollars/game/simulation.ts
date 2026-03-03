import worldEvents from './events'
import addNews from './news'
import type { WorldState } from './types'

export default function runSimulationTick(world: WorldState) {
    if(Math.random() > 0.6) world.environment -= 0.5
    
    if(world.housingSupply < 40) {
        world.publicSentiment -= 5
        addNews(world, 'Housing shortage causes public dissatisfaction.', 'general')
    }

    if(world.foodSupply < 30) {
        world.economy -= 4
        addNews(world, 'Food shortage leads to economic downturn.', 'economy')
    }

    if(world.publicSentiment < 30) {
        world.politicalStability -= 10
        addNews(world, 'Protests erupt due to low public sentiment.', 'politics')
    }

    if(world.environment < 30) world.foodSupply -=5
    if(world.foodSupply < 40) world.economy -= 5
    if(world.publicSentiment < 40) world.politicalStability -= 5

    triggerRandomEvents(world)
    clampWorld(world)

    world.stats.peakEconomy = Math.max(world.stats.peakEconomy, world.economy)
    world.stats.lowestStability = Math.min(world.stats.lowestStability, world.politicalStability)
    checkCollapse(world)
}

function triggerRandomEvents(world: WorldState) {
    worldEvents.forEach(event => {
        const cooldown = world.eventCooldowns[event.id] || 0
        if(cooldown > 0) return world.eventCooldowns[event.id] -= 1
        if(event.condition(world)) {
            const roll = Math.random()
            if(roll < event.probability) {
                event.effect(world)
                world.stats.eventsTriggered += 1
                world.eventCooldowns[event.id] = 5
            }
        }
    })
}

function clampWorld(world: WorldState) {
    const keys = [
        'economy', 'housingSupply', 'foodSupply', 'publicSentiment', 'politicalStability', 'environment'
    ] as const

    keys.forEach(key => {
        world[key] = Math.max(0, Math.min(100, world[key]))
    })
}

function checkCollapse(world: WorldState) {
    if(world.politicalStability <= 0) world.collapse = 'civil_war'
    else if(world.economy <= 0) world.collapse = 'economic_collapse'
    else if(world.environment <= 0) world.collapse = 'environmental_disaster'
    else if(world.publicSentiment <= 0) world.collapse = 'political_overthrow'
    else if(world.foodSupply <= 0) world.collapse = 'famine'
}
