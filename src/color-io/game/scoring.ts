import type { HSL } from './types'
import { deltaE2000, hslToRgb, rgbToXyz, xyzToLab } from './utils'

export function calculateScore(target: HSL, guess: HSL): number {
    const rgb1 = hslToRgb(target)
    const xyz1 = rgbToXyz(rgb1.r, rgb1.g, rgb1.b)
    const lab1 = xyzToLab(xyz1.x, xyz1.y, xyz1.z)

    const rgb2 = hslToRgb(guess)
    const xyz2 = rgbToXyz(rgb2.r, rgb2.g, rgb2.b)
    const lab2 = xyzToLab(xyz2.x, xyz2.y, xyz2.z)

    const distance = deltaE2000(lab1, lab2)
    const score = 10 - (distance / 30) * 10
    return Math.max(0, Math.min(10, Number(score.toFixed(2))))
}

export function getGrade(progress: number): string {
    if(progress >= 0.95) return 'SS'
    if(progress >= 0.9) return 'S'
    if(progress >= 0.8) return 'A'
    if(progress >= 0.7) return 'B'
    if(progress >= 0.5) return 'C'
    return 'D'
}
