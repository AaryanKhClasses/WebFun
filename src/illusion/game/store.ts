import { create } from 'zustand'
import type { GameState } from './types'

const useGameStore = create<GameState>(set => ({
    current: 0,
    fooledCount: 0,
    answers: [],
    next: (fooled) => set(state => ({
        current: state.current + 1,
        fooledCount: state.fooledCount + (fooled ? 1 : 0),
        answers: [...state.answers, fooled]
    })),
    reset: () => set({
        current: 0,
        fooledCount: 0,
        answers: []
    })
}))

export default useGameStore
