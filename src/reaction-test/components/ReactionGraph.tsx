import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'

type Props = {
    data: number[]
}

export default function ReactionGraph({ data }: Props) {
    const width = 700, height = 200, padding = 40
    const [hoverIndex, setHoverIndex] = useState<number | null>(null)

    if(data.length < 2) return null
    const min = Math.min(...data)
    const max = Math.max(...data)
    const range = max - min || 1
    const avg = data.reduce((a, b) => a + b, 0) / data.length

    const movingAvg = useMemo(() => {
        const windowSize = 3
        return data.map((_, i) => {
            const start = Math.max(0, i - windowSize + 1)
            const window = data.slice(start, i + 1)
            return window.reduce((a, b) => a + b, 0) / window.length
        })
    }, [data])

    const scaleX = (i: number) => padding + (i / (data.length - 1)) * (width - 2 * padding)
    const scaleY = (d: number) => height - padding - ((d - min) / range) * (height - 2 * padding)

    const buildSmoothPath = (values: number[]) => {
        const points = values.map((v, i) => ({
            x: scaleX(i),
            y: scaleY(v)
        }))
        if(points.length < 2) return ''
        let d = `M${points[0].x},${points[0].y}`
        for(let i = 1; i < points.length - 1; i++) {
            const midX = (points[i].x + points[i+1].x) / 2
            const midY = (points[i].y + points[i+1].y) / 2
            d += ` Q${points[i].x},${points[i].y} ${midX},${midY}`
        }
        const last = points[points.length - 1]
        d += ` T${last.x},${last.y}`
        return d
    }

    const rawPath = buildSmoothPath(data)
    const maPath = buildSmoothPath(movingAvg)

    const ySteps = 5
    const yLabels = Array.from({ length: ySteps + 1 }, (_, i) => {
        const value = min + (i / ySteps) * range
        return Math.round(value * 100) / 100
    })

    return <div style={{ marginTop: '2rem' }}>
        <svg width='100%' viewBox={`0 0 ${width} ${height}`}>
            {yLabels.map((l, i) => {
                return <g key={i}>
                    <line x1={padding} y1={scaleY(l)} x2={width - padding} y2={scaleY(l)} stroke='#222' />
                    <text x={10} y={scaleY(l) + 4} fill='#666' fontSize='10'>{Math.round(l)} ms</text>
                </g>
            })}
            <line x1={padding} y1={scaleY(avg)} x2={width - padding} y2={scaleY(avg)} stroke='#333' />
            <motion.path
                d={maPath}
                fill='none'
                stroke='#00ccff'
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, ease: 'easeInOut' }}
            />
            <motion.path
                d={rawPath}
                fill='none'
                stroke='#00ff88'
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, ease: 'easeInOut' }}
            />
            {data.map((v, i) => {
                const x = scaleX(i)
                const y = scaleY(v)
                return <motion.circle
                    key={i}
                    cx={x}
                    cy={y}
                    r={4}
                    fill='#00ff88'
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + i * 0.05, duration: 0.3 }}
                    onMouseEnter={() => setHoverIndex(i)}
                    onMouseLeave={() => setHoverIndex(null)}
                    style={{ cursor: 'pointer' }}
                />
            })}
            {hoverIndex !== null && <g>
                <rect
                    x={scaleX(hoverIndex) - 30}
                    y={scaleY(data[hoverIndex]) - 30}
                    width={60}
                    height={20}
                    fill='#111'
                    rx={4}
                    stroke='#00ff88'
                />
                <text
                    x={scaleX(hoverIndex)}
                    y={scaleY(data[hoverIndex]) - 15}
                    fill='#00ff88'
                    fontSize='10'
                    textAnchor='middle'
                >{Math.round(data[hoverIndex])} ms</text>
            </g>}
        </svg>
    </div>
}
