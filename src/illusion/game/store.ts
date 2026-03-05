import { create } from 'zustand'
import type { GameState } from './types'

const useGameStore = create<GameState>(set => ({
    current: 0,
    fooledCount: 0,
    answers: [],
    startTime: null,
    elapsed: 0,
    startGame: () => set({
        startTime: Date.now(),
        elapsed: 0
    }),
    tick: () => set(state => {
        if(!state.startTime) return state
        return { elapsed: Date.now() - state.startTime }
    }),
    next: (fooled) => set(state => ({
        current: state.current + 1,
        fooledCount: state.fooledCount + (fooled ? 1 : 0),
        answers: [...state.answers, fooled]
    })),
    reset: () => set({
        current: 0,
        fooledCount: 0,
        answers: [],
        startTime: null,
        elapsed: 0
    })
}))

export default useGameStore
