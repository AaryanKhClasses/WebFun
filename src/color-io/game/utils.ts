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

export function hslToRgb({ h, s, l }: HSL): { r: number, g: number, b: number } {
    s /= 100
    l /= 100

    const k = (n: number) => (n + h / 30) % 12
    const a = s * Math.min(l, 1 - l)
    const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))

    return {
        r: Math.round(f(0) * 255),
        g: Math.round(f(8) * 255),
        b: Math.round(f(4) * 255)
    }
}

export function rgbToXyz(r: number, g: number, b: number): { x: number, y: number, z: number } {
    r /= 255
    g /= 255
    b /= 255

    r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92
    g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92
    b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92

    return {
        x: r * 0.4124564 + g * 0.2126729 + b * 0.0193339,
        y: r * 0.2126729 + g * 0.7151522 + b * 0.0721750,
        z: r * 0.0193339 + g * 0.0721750 + b * 0.9503041
    }
}

export function xyzToLab(x: number, y: number, z: number): { l: number, a: number, b: number } {
    const refX = 0.95047
    const refY = 1.00000
    const refZ = 1.08983

    x /= refX
    y /= refY
    z /= refZ

    const f = (t: number) => t > 0.008856 ? Math.cbrt(t) : (t * 903.3 + 16) / 116
    const fx = f(x)
    const fy = f(y)
    const fz = f(z)

    return {
        l: 116 * fy - 16,
        a: 500 * (fx - fy),
        b: 200 * (fy - fz)
    }
}

/*
export function deltaE(lab1: { l: number, a: number, b: number }, lab2: { l: number, a: number, b: number }): number {
    return Math.sqrt(
        Math.pow(lab1.l - lab2.l, 2) +
        Math.pow(lab1.a - lab2.a, 2) +
        Math.pow(lab1.b - lab2.b, 2)
    )
}
*/

export function deltaE2000(lab1: { l: number, a: number, b: number }, lab2: { l: number, a: number, b: number }): number {
    const avgLp = (lab1.l + lab2.l) / 2
    const c1 = Math.sqrt(lab1.a * lab1.a + lab1.b * lab1.b)
    const c2 = Math.sqrt(lab2.a * lab2.a + lab2.b * lab2.b)
    const avgC = (c1 + c2) / 2

    const G = 0.5 * (1 - Math.sqrt(Math.pow(avgC, 7) / (Math.pow(avgC, 7) + Math.pow(25, 7))))

    const a1p = lab1.a * (1 + G)
    const c1p = Math.sqrt(a1p * a1p + lab1.b * lab1.b)
    const h1p = Math.atan2(lab1.b, a1p)

    const a2p = lab2.a * (1 + G)
    const c2p = Math.sqrt(a2p * a2p + lab2.b * lab2.b)
    const h2p = Math.atan2(lab2.b, a2p)

    const dhp = Math.abs(h1p - h2p) <= Math.PI ?
    h2p - h1p : h2p <= h1p ?
    h2p - h1p + 2 * Math.PI : h2p - h1p - 2 * Math.PI
    
    const dLp = lab2.l - lab1.l
    const dCp = c2p - c1p
    const dHp = 2 * Math.sqrt(c1p * c2p) * Math.sin(dhp / 2)
    
    const avgCp = (c1p + c2p) / 2
    const avgHp = Math.abs(h1p - h2p) <= Math.PI ?
        (h1p + h2p) / 2 : (h1p + h2p + 2 * Math.PI) / 2

    const T = 1
        - 0.17 * Math.cos(avgHp - Math.PI / 6)
        + 0.24 * Math.cos(2 * avgHp)
        + 0.32 * Math.cos(3 * avgHp + Math.PI / 30)
        - 0.20 * Math.cos(4 * avgHp - 63 * Math.PI / 180)
    
    const Sl = 1 + (0.015 * Math.pow(avgLp - 50, 2)) / Math.sqrt(20 + Math.pow(avgLp - 50, 2))
    const Sc = 1 + 0.045 * avgCp
    const Sh = 1 + 0.015 * avgCp * T

    const Rt = -2
        * Math.sqrt(Math.pow(avgCp, 7) / (Math.pow(avgCp, 7) + Math.pow(25, 7)))
        * Math.sin(60
            * Math.exp(
                -Math.pow((avgHp * 180) / Math.PI - 275, 2)
                / (25 * 25)
            )
            * (Math.PI / 180)
        )
    
    return Math.sqrt(
        Math.pow(dLp / Sl, 2) +
        Math.pow(dCp / Sc, 2) +
        Math.pow(dHp / Sh, 2) +
        Rt * (dCp / Sc) * (dHp / Sh)
    )
}
