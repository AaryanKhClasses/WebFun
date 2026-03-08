import { useEffect, useRef, useState } from 'react'
import createWorld from './utils/createWorld'
import calculateScore from './utils/scorePath'
import { motion } from 'framer-motion'

export default function Pachinko() {
    const physicsCanvasRef = useRef<HTMLCanvasElement>(null)
    const drawingCanvasRef = useRef<HTMLCanvasElement>(null)
    const worldRef = useRef<ReturnType<typeof createWorld> | null>(null)

    const [canStart, setCanStart] = useState(false)
    const [score, setScore] = useState<number | null>(null)

    const predictedPath = useRef<{ x: number, y: number }[]>([])
    const drawing = useRef(false)

    useEffect(() => {
        const physicsCanvas = physicsCanvasRef.current
        const drawingCanvas = drawingCanvasRef.current
        if(!physicsCanvas || !drawingCanvas) return

        worldRef.current = createWorld(physicsCanvas)
        worldRef.current.generateSpawn()

        const canvas = drawingCanvas
        const ctx = canvas.getContext('2d')
        if(!ctx) return
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        drawBallStart(ctx, worldRef.current.spawnX)

        const getPos = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect()
            return {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            }
        }

        const onMouseDown = (e: MouseEvent) => {
            drawing.current = true
            predictedPath.current = []

            const pos = getPos(e)
            predictedPath.current.push(pos)
            ctx.beginPath()
            ctx.moveTo(pos.x, pos.y)
        }

        const onMouseMove = (e: MouseEvent) => {
            if(!drawing.current) return

            const pos = getPos(e)
            predictedPath.current.push(pos)
            ctx.lineTo(pos.x, pos.y)
            ctx.strokeStyle = 'cyan'
            ctx.lineWidth = 2
            ctx.stroke()
            if(predictedPath.current.length > 5) setCanStart(true)
        }

        const onMouseUp = () => {
            drawing.current = false
        }

        canvas.addEventListener('mousedown', onMouseDown)
        canvas.addEventListener('mousemove', onMouseMove)
        canvas.addEventListener('mouseup', onMouseUp)
        
        return () => {
            canvas.removeEventListener('mousedown', onMouseDown)
            canvas.removeEventListener('mousemove', onMouseMove)
            canvas.removeEventListener('mouseup', onMouseUp)
            worldRef.current?.stop()
            worldRef.current = null
        }
    }, [])

    const startSimulation = () => {
        const world = worldRef.current
        if(!world) return

        const canvas = drawingCanvasRef.current!
        const ctx = canvas.getContext('2d')!
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        world.spawnBall()
        setCanStart(false)
    
        const renderLoop = () => {
            if(!worldRef.current) return

            const actual = worldRef.current.actualPath
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            drawPath(ctx, predictedPath.current, 'cyan')
            drawPath(ctx, actual, 'red')

            if(worldRef.current.ballStopped) return showScoreOverlay()
            requestAnimationFrame(renderLoop)
        }
        renderLoop()
    }

    const showScoreOverlay = () => {
        if(!worldRef.current) return

        const actual = worldRef.current.actualPath
        const predicted = predictedPath.current
        const finalScore = calculateScore(predicted, actual)
        setScore(finalScore)
    }

    return <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            background: '#0a0a0a'
        }}
    >
        <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{
                position: 'relative',
                width: 800,
                height: 600
            }}
        >
            <motion.canvas
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                ref={physicsCanvasRef}
                width={800}
                height={600}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    borderRadius: 12,
                    border: '1px solid #333',
                    background: '#111'
                }}
            />
            <motion.canvas
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                ref={drawingCanvasRef}
                width={800}
                height={600}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0
                }}
            />
            {score !== null && <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: 800,
                    height: 600,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: '1px solid #333',
                    background: '#111111b0',
                    color: 'white',
                    fontSize: 48,
                    borderRadius: 12,
                    fontWeight: 'bold'
                }}
            >
                <motion.p>Score: {score}%</motion.p>
                <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                    onClick={() => location.reload()}
                    style={{
                        width: 400,
                        background: 'rgba(255, 255, 255, 0.9)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: 8,
                        color: 'black',
                        marginTop: 20,
                        padding: '10px 20px',
                        fontSize: 16,
                        cursor: 'pointer',
                        transition: 'background 1s ease, border 1s ease, color 1s ease'
                    }}
                >Play Again</motion.button>
            </motion.div>}
        </motion.div>
        <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            disabled={!canStart}
            onClick={startSimulation}
            style={{
                width: 400,
                background: canStart ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.1)',
                border: canStart ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 8,
                color: canStart ? 'black' : 'white',
                marginTop: 20,
                padding: '10px 20px',
                fontSize: 16,
                opacity: canStart ? 1 : 0.5,
                cursor: canStart ? 'pointer' : 'not-allowed',
                transition: 'background 1s ease, border 1s ease, color 1s ease'
            }}
        >Start Simulation</motion.button>
    </motion.div>
}

function drawBallStart(ctx: CanvasRenderingContext2D, x: number) {
    ctx.beginPath()
    ctx.arc(x, 50, 12, 0, Math.PI * 2)
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 2
    ctx.setLineDash([6, 6])
    ctx.stroke()
    ctx.setLineDash([])
}

function drawPath(ctx: CanvasRenderingContext2D, path: { x: number, y: number }[], color: string) {
    if(!path.length) return
    ctx.beginPath()

    for(let i = 0; i < path.length; i++) {
        const point = path[i]
        if(i === 0) ctx.moveTo(point.x, point.y)
        else ctx.lineTo(point.x, point.y)
    }

    ctx.strokeStyle = color
    ctx.lineWidth = 2
    ctx.stroke()
}
