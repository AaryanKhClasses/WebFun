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

    const ball = Bodies.circle(400, 50, 12, { restitution: 0.8 })
    const floor = Bodies.rectangle(400, 590, 810, 60, { isStatic: true })
    
    const peg1 = Bodies.circle(300, 200, 10, { isStatic: true })
    const peg2 = Bodies.circle(500, 300, 10, { isStatic: true })
    const peg3 = Bodies.circle(400, 400, 10, { isStatic: true })

    Composite.add(engine.world, [ball, floor, peg1, peg2, peg3])

    const runner = Runner.create()
    Render.run(render)
    Runner.run(runner, engine)

    const actualPath: { x: number, y: number }[] = []
    Events.on(engine, 'afterUpdate', () => {
        actualPath.push({ x: ball.position.x, y: ball.position.y })
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

    return { engine, render, runner, ball, stop, actualPath }
}
