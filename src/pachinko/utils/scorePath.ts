type Point = { x: number, y: number }
const CANVAS_DIAGONAL = Math.hypot(800, 600)
const RESAMPLE_POINTS = 120

function distance(a: Point, b: Point) {
    const dx = a.x - b.x
    const dy = a.y - b.y
    return Math.sqrt(dx * dx + dy * dy)
}

function clamp(value: number) {
    return Math.max(0, Math.min(1, value))
}

function resamplePath(path: Point[], sampleCount: number) {
    if(path.length === 0) return []
    if(path.length === 1) return Array.from({ length: sampleCount }, () => path[0])

    let totalLength = 0
    for(let i = 1; i < path.length; i++) {
        totalLength += distance(path[i - 1], path[i])
    }
    if(totalLength === 0) return Array.from({ length: sampleCount }, () => path[0])

    const samples: Point[] = []
    const step = totalLength / (sampleCount - 1)

    let segmentStart = path[0]
    let segmentEnd = path[1]
    let segmentIndex = 1
    let segmentLength = distance(segmentStart, segmentEnd)
    let traversed = 0

    for(let i = 0; i < sampleCount; i++) {
        const target = i * step

        while(segmentIndex < path.length - 1 && traversed + segmentLength < target) {
            traversed += segmentLength
            segmentIndex += 1
            segmentStart = path[segmentIndex - 1]
            segmentEnd = path[segmentIndex]
            segmentLength = distance(segmentStart, segmentEnd)
        }

        const remaining = target - traversed
        const t = segmentLength === 0 ? 0 : remaining / segmentLength
        samples.push({
            x: segmentStart.x + (segmentEnd.x - segmentStart.x) * t,
            y: segmentStart.y + (segmentEnd.y - segmentStart.y) * t
        })
    }

    return samples
}

export default function calculateScore(predicted: Point[], actual: Point[]) {
    if(predicted.length < 2 || actual.length < 2) return 0

    const predictedResampled = resamplePath(predicted, RESAMPLE_POINTS)
    const actualResampled = resamplePath(actual, RESAMPLE_POINTS)

    let totalDistanceSquared = 0
    for(let i = 0; i < RESAMPLE_POINTS; i++) {
        const d = distance(predictedResampled[i], actualResampled[i])
        totalDistanceSquared += d * d
    }

    const rmsError = Math.sqrt(totalDistanceSquared / RESAMPLE_POINTS)
    const normalizedError = clamp(rmsError / 200)
    const score = Math.pow(1 - normalizedError, 1.5) * 100

    return Math.round(score)
}
