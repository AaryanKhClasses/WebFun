export type RoundConfig = {
    type: RoundType
    speed: number
    greenWidth: number
}

export type RoundType = 'normal' | 'fake' | 'reverse' | 'suddenDeath'
export type HitResult = 'perfect' | 'great' | 'good' | 'miss'
export type GamePhase = 'countdown' | 'playing' | 'result'
