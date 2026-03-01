export type WorldState = {
    money: number

    economy: number
    housingSupply: number
    foodSupply: number
    politicalStability: number
    environment: number
    publicSentiment: number

    news: string[]
    history: {
        tick: number
        economy: number
        stability: number
        sentiment: number
    }[]
}

export type Purchase = {
    id: string
    name: string
    description: string
    cost: number
    effect: (state: WorldState) => void
}
