import Matter from 'matter-js'

export default function createWorld(canvas: HTMLCanvasElement) {
    const { Engine, Render, Runner, Bodies, Composite, Events } = Matter
    const engine = Engine.create()
    const render = Render.create({
        canvas, engine, options: {
            width: 800,
            height: 600,
            wireframes: false,
            background: '#111'
        }
    })

    const floor = Bodies.rectangle(400, 590, 810, 60, {
        isStatic: true,
        restitution: 0.7,
        friction: 0.05
    })
    const leftWall = Bodies.rectangle(0, 300, 40, 600, {
        isStatic: true,
        restitution: 0.95,
        friction: 0.01
    })
    const rightWall = Bodies.rectangle(800, 300, 40, 600, {
        isStatic: true,
        restitution: 0.95,
        friction: 0.01
    })
    Composite.add(engine.world, [floor, leftWall, rightWall])
    createBoard(Bodies, Composite, engine.world)

    const runner = Runner.create()
    Render.run(render)
    Runner.run(runner, engine)

    let ball: Matter.Body | null = null
    let ballStopped = false
    let spawnX = 400
    const actualPath: { x: number, y: number }[] = []
    
    const spawnBall = () => {
        ballStopped = false
        ball = Bodies.circle(spawnX, 50, 12, { restitution: 0.8 })
        Composite.add(engine.world, ball)
        actualPath.length = 0
    }

    const generateSpawn = () => spawnX = 100 + Math.random() * 600
    
    Events.on(engine, 'afterUpdate', () => {
        if(!ball) return
        actualPath.push({ x: ball.position.x, y: ball.position.y })
        if(ball.speed < 0.01 && ball.position.y > 500) return ballStopped = true
    })

    Events.on(render, 'afterRender', () => {
        const ctx = render.context
        ctx.beginPath()

        for(let i = 0; i < actualPath.length; i++) {
            const point = actualPath[i]
            if(i === 0) ctx.moveTo(point.x, point.y)
            else ctx.lineTo(point.x, point.y)
        }

        ctx.strokeStyle = 'red'
        ctx.lineWidth = 2
        ctx.stroke()
    })

    const stop = () => {
        Render.stop(render)
        Runner.stop(runner)
        Engine.clear(engine)
    }

    return {
        spawnBall, stop, actualPath, generateSpawn,
        get ballStopped() { return ballStopped },
        get spawnX() { return spawnX }
    }
}

function createBoard(Bodies: typeof Matter.Bodies, Composite: typeof Matter.Composite, world: Matter.World) {
    const rows = 8, cols = 10
    const spacingX = 70, spacingY = 55
    const startX = 70, startY = 120

    const pegs: Matter.Body[] = []
    for(let row = 0; row < rows; row++) {
        for(let col = 0; col < cols; col++) {
            const offset = row % 2 === 0 ? 0 : spacingX / 2

            const x = startX + col * spacingX + offset
            const y = startY + row * spacingY
            const peg = Bodies.circle(x, y, 8, { isStatic: true })
            pegs.push(peg)
        }
    }
    Composite.add(world, pegs)
}
