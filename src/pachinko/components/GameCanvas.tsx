import { useEffect, useRef } from 'react'
import createWorld from '../physics/createWorld'

export default function GameCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if(!canvasRef.current) return
        const world = createWorld(canvasRef.current)
        setTimeout(() => console.log(world.actualPath), 3000)
        return () => world.stop()
    }, [])

    return <canvas ref={canvasRef} width={800} height={600} style={{
        borderRadius: 12,
        border: '1px solid #333',
        background: '#111'
    }} />
}
