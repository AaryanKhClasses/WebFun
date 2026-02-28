import type { GameState, HSL } from './types'
import { createContext, useContext, useState, type ReactNode } from 'react'
import { randomHSL } from './utils'
import { calculateScore } from './scoring'

const GameContext = createContext<any>(null)

export default function GameProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<GameState>({
        phase: 'start',
        roundIndex: 0,
        rounds: []
    })

    function startGame(): void {
        const rounds = Array.from({ length: 5 }, () => ({
            target: randomHSL()
        }))

        setState({
            phase: 'memorize',
            roundIndex: 0,
            rounds
        })
    }

    function startGuessPhase(): void {
        setState(s => ({
            ...s,
            phase: 'guess'
        }))
    }

    function submitGuess(guess: HSL): void {
        setState(s => {
            const round = s.rounds[s.roundIndex]
            const score = calculateScore(round.target, guess)

            const rounds = [...s.rounds]
            rounds[s.roundIndex] = {
                ...round, guess, score
            }

            return {
                ...s, rounds, phase: 'result'
            }
        })
    }

    function nextRound(): void {
        setState(s => {
            if(s.roundIndex === 4) {
                return {
                    ...s, phase: 'final'
                }
            }

            return {
                ...s, roundIndex: s.roundIndex + 1, phase: 'memorize'
            }
        })
    }

    function restart(): void {
        setState({
            phase: 'start',
            roundIndex: 0,
            rounds: []
        })
    }

    return <GameContext.Provider value={{
        state,
        startGame,
        startGuessPhase,
        submitGuess,
        nextRound,
        restart
    }}>{children}</GameContext.Provider>
}

export function useGame() {
    return useContext(GameContext)
}
