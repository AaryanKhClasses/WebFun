import ColorContrastIllusion from '../illusions/ColorContrast'
import MullerLyerIllusion from '../illusions/MullerLyer'
import EbbinghausIllusion from '../illusions/Ebbinghaus'
import PeripheralMotionIllusion from '../illusions/PeripheralMotion'
import type { Illusion } from './types'

const illusions: Illusion[] = [
    {
        id: 'color-contrast',
        title: 'Color Perception Test',
        Component: ColorContrastIllusion,
        explanation: 'Your brain adjusts the colors based on surrounding hues, making the central squares appear different even though they are the same color.'
    },
    {
        id: 'muller-lyer',
        title: 'Line Length Illusion',
        Component: MullerLyerIllusion,
        explanation: 'The lines with outward-facing arrows appear longer than those with inward-facing arrows, even though they are the same length.'
    },
    {
        id: 'ebbinghaus',
        title: 'Size Perception Test',
        Component: EbbinghausIllusion,
        explanation: 'The central circle surrounded by smaller circles appears larger than the identical central circle surrounded by larger circles.'
    },
    {
        id: 'peripheral-motion',
        title: 'Peripheral Motion Test',
        Component: PeripheralMotionIllusion,
        explanation: 'Objects in your peripheral vision can appear to be moving when they are actually stationary, due to the way your brain processes motion and peripheral information.'
    }
]

export default illusions
