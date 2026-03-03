import addNews from './news'
import type { Purchase } from './types'

const purchases: Purchase[] = [
    {
        id: 'houses',
        name: 'Buy 1,000 houses',
        cost: 5_000_000,
        description: 'Acquire housing inventory by 1,000.',
        effect: (world) => {
            world.housingSupply -= 25
            world.economy += 5
            world.publicSentiment -= 10
            addNews(world, 'Housing market tightens after large acquisition.', 'general')
        }
    },
    {
        id: 'farmland',
        name: 'Buy 100,000 acres of farmland',
        cost: 7_000_000,
        description: 'Acquire 100,000 acres of farmland to control food production.',
        effect: (world) => {
            world.foodSupply -= 30
            world.economy += 10
            world.publicSentiment -= 15
            addNews(world, 'Food prices rise as farmland is consolidated under one owner.', 'economy')
        }
    },
    {
        id: 'factories',
        name: 'Buy 50 factories',
        cost: 10_000_000,
        description: 'Acquire 50 factories to control manufacturing output.',
        effect: (world) => {
            world.economy += 20
            world.environment -= 25
            world.publicSentiment -= 20
            addNews(world, 'Industrial growth surges, but environmental concerns grow.', 'environment')
        }
    },
    {
        id: 'affordable_housing',
        name: 'Invest in affordable housing',
        cost: 3_000_000,
        description: 'Invest in affordable housing projects to increase housing supply.',
        effect: (world) => {
            world.housingSupply += 20
            world.economy += 5
            world.publicSentiment += 10
            addNews(world, 'Affordable housing initiatives help ease the housing crisis.', 'general')
        }
    },
    {
        id: 'renewable_energy',
        name: 'Invest in renewable energy',
        cost: 4_000_000,
        description: 'Invest in renewable energy projects to improve the environment.',
        effect: (world) => {
            world.environment += 20
            world.economy -= 10
            world.publicSentiment += 15
            addNews(world, 'Renewable energy investments boost the environment and public sentiment, but at a cost to the economy.', 'environment')
        }
    },
    {
        id: 'parks',
        name: 'Build public parks',
        cost: 2_000_000,
        description: 'Build public parks to improve public sentiment and the environment.',
        effect: (world) => {
            world.environment -= 10
            world.publicSentiment += 20
            world.economy -= 5
            addNews(world, 'New parks provide green space and improve public sentiment, but at a cost to the economy.', 'environment')
        }
    },
    {
        id: 'education',
        name: 'Invest in education',
        cost: 6_000_000,
        description: 'Invest in education to improve public sentiment and the economy.',
        effect: (world) => {
            world.economy += 15
            world.publicSentiment += 20
            addNews(world, 'Education investments lead to a more skilled workforce and improved public sentiment.', 'economy')
        }
    }
]

export default purchases
