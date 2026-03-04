import ColorContrastIllusion from '../illusions/ColorContrast'
import type { Illusion } from './types'

const illusions: Illusion[] = [
    {
        id: 'color-contrast',
        title: 'Color Perception Test',
        Component: ColorContrastIllusion,
        explanation: 'Your brain adjusts the colors based on surrounding hues, making the central squares appear different even though they are the same color.'
    },
    // {
    //     id: 'muller-lyer',
    //     title: 'Line Length Illusion',
    //     Component: MullerLyerIllusion,
    //     explanation: 'The lines with outward-facing arrows appear longer than those with inward-facing arrows, even though they are the same length.'
    // }
]

export default illusions
