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

function pathLength(path: Point[]) {
    if(path.length < 2) return 0

    let length = 0
    for(let i = 1; i < path.length; i++) {
        length += distance(path[i - 1], path[i])
    }
    return length
}

function resamplePath(path: Point[], sampleCount: number) {
    if(path.length === 0) return []
    if(path.length === 1) return Array.from({ length: sampleCount }, () => path[0])

    const totalLength = pathLength(path)
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

function meanNearestDistance(from: Point[], to: Point[]) {
    if(from.length === 0 || to.length === 0) return Infinity

    let total = 0
    for(const point of from) {
        let nearest = Infinity
        for(const target of to) {
            const d = distance(point, target)
            if(d < nearest) nearest = d
        }
        total += nearest
    }
    return total / from.length
}

export default function calculateScore(predicted: Point[], actual: Point[]) {
    if(predicted.length < 2 || actual.length < 2) return 0

    const predictedResampled = resamplePath(predicted, RESAMPLE_POINTS)
    const actualResampled = resamplePath(actual, RESAMPLE_POINTS)

    const predictedToActual = meanNearestDistance(predictedResampled, actualResampled)
    const actualToPredicted = meanNearestDistance(actualResampled, predictedResampled)

    const endpointError = (
        distance(predicted[0], actual[0]) +
        distance(predicted[predicted.length - 1], actual[actual.length - 1])
    ) / 2

    const predictedLength = pathLength(predicted)
    const actualLength = pathLength(actual)
    const lengthRatio = Math.min(predictedLength, actualLength) / Math.max(predictedLength, actualLength)

    const normalizedPredictedToActual = clamp(predictedToActual / CANVAS_DIAGONAL)
    const normalizedActualToPredicted = clamp(actualToPredicted / CANVAS_DIAGONAL)
    const normalizedEndpointError = clamp(endpointError / CANVAS_DIAGONAL)

    const distancePenalty = clamp(
        normalizedPredictedToActual * 0.25 +
        normalizedActualToPredicted * 0.55 +
        normalizedEndpointError * 0.20
    )

    const shapeScore = 1 - distancePenalty
    const coverageMultiplier = Math.sqrt(clamp(lengthRatio))
    const score = shapeScore * coverageMultiplier * 100

    return Math.round(clamp(score / 100) * 100)
}
