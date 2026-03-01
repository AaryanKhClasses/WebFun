import { create } from 'zustand'
import type { Purchase, WorldState } from './types'
import { produce } from 'immer'
import runSimulationTick from './simulation'

type WorldStore = {
    world: WorldState
    tick: number
    buy: (purchase: Purchase) => void
}

const useWorldStore = create<WorldStore>((set) => ({
    tick: 0,
    world: {
        money: 1_000_000_000,
        economy: 80,
        housingSupply: 80,
        foodSupply: 80,
        politicalStability: 80,
        environment: 80,
        publicSentiment: 80,
        news: [],
        history: []
    },
    buy: (purchase) => set((state) => produce(state, draft => {
        if(draft.world.money < purchase.cost) return
        draft.world.money -= purchase.cost
        purchase.effect(draft.world)
        runSimulationTick(draft.world)
        draft.tick += 1

        draft.world.history.push({
            tick: draft.tick,
            economy: draft.world.economy,
            stability: draft.world.politicalStability,
            sentiment: draft.world.publicSentiment
        })
    }))
}))

export default useWorldStore
