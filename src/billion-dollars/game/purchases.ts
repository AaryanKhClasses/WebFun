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
            world.news.push('Housing market tightens after large acquisition.')
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
            world.news.push('Food prices rise as farmland is consolidated under one owner.')
        }
    }
]

export default purchases
