import addNews from './news'
import type { WorldEvent } from './types'

const worldEvents: WorldEvent[] = [
    {
        id: 'housing_crash',
        title: 'Housing Market Crash',
        probability: 0.4,
        condition: (world) => world.housingSupply < 30,
        effect: (world) => {
            world.economy -= 15
            world.publicSentiment -= 10
            addNews(world, 'The housing market has crashed, causing economic turmoil and public discontent.', 'economy')
        }
    },
    {
        id: 'food_riots',
        title: 'Food Riots',
        probability: 0.3,
        condition: (world) => world.foodSupply < 20,
        effect: (world) => {
            world.politicalStability -= 20
            world.publicSentiment -= 15
            addNews(world, 'Food shortages have led to widespread riots, destabilizing the political landscape.', 'politics')
        }
    },
    {
        id: 'economic_boom',
        title: 'Economic Boom',
        probability: 0.2,
        condition: (world) => world.economy > 80,
        effect: (world) => {
            world.economy += 5
            world.publicSentiment += 10
            addNews(world, 'The economy is booming, leading to increased public optimism and prosperity.', 'economy')
        }
    },
    {
        id: 'environmental_disaster',
        title: 'Environmental Disaster',
        probability: 0.1,
        condition: (world) => world.environment < 30,
        effect: (world) => {
            world.environment -= 20
            world.publicSentiment -= 10
            addNews(world, 'An environmental disaster has struck, causing widespread damage and public concern.', 'environment')
        }
    },
    {
        id: 'political_scandal',
        title: 'Political Scandal',
        probability: 0.25,
        condition: (world) => world.politicalStability > 50,
        effect: (world) => {
            world.politicalStability -= 15
            world.publicSentiment -= 20
            addNews(world, 'A major political scandal has erupted, shaking public trust and destabilizing the government.', 'politics')
        }
    }
]

export default worldEvents
