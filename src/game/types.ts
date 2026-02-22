export type HSL = {
    h: number
    s: number
    l: number
}

export type Round = {
    target: HSL
    guess?: HSL
    score?: number
}

export type Phase = 'start' | 'memorize' | 'guess' | 'result' | 'final'

export type GameState ={
    phase: Phase
    rounds: Round[]
    roundIndex: number
}
