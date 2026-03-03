export type WorldState = {
    money: number

    economy: number
    housingSupply: number
    foodSupply: number
    politicalStability: number
    environment: number
    publicSentiment: number

    news: NewsItem[]
    history: {
        tick: number
        economy: number
        stability: number
        sentiment: number
    }[]
    eventCooldowns: Record<string, number>
    collapse: CollapseType | null
    stats: GameStats
}

export type Purchase = {
    id: string
    name: string
    description: string
    cost: number
    effect: (state: WorldState) => void
}

export type WorldEvent = {
    id: string
    title: string
    probability: number
    condition: (state: WorldState) => boolean
    effect: (state: WorldState) => void
}

export type NewsItem = {
    id: string
    title: string
    category: 'economy' | 'disaster' | 'politics' | 'environment' | 'general'
    timestamp: number
}

export type CollapseType = 'civil_war' | 'economic_collapse' | 'environmental_disaster' | 'political_overthrow' | 'famine'

export type GameStats = {
    totalSpent: number
    ticksSurvived: number
    eventsTriggered: number
    peakEconomy: number
    lowestStability: number
}
