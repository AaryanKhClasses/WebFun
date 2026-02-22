import type { HSL } from './types'

export function calculateScore(target: HSL, guess: HSL): number {
    const dh = Math.abs(target.h - guess.h) / 360
    const ds = Math.abs(target.s - guess.s) / 100
    const dl = Math.abs(target.l - guess.l) / 100

    const diff = Math.sqrt(dh * dh + ds * ds + dl * dl)
    const score = Math.max(0, 10 - diff * 10)
    return Math.round(score * 10) / 10
}

export function getGrade(progress: number): string {
    if(progress >= 0.95) return 'SS'
    if(progress >= 0.9) return 'S'
    if(progress >= 0.8) return 'A'
    if(progress >= 0.7) return 'B'
    if(progress >= 0.5) return 'C'
    return 'D'
}
