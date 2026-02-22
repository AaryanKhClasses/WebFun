import type { HSL } from './types'

export function randomHSL(): HSL {
    return {
        h: Math.floor(Math.random() * 360),
        s: Math.floor(Math.random() * 70) + 30,
        l: Math.floor(Math.random() * 60) + 20
    }
}

export function hslToCss(hsl: HSL): string {
    return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
}
