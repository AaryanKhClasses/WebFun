import { useState } from 'react'
import type { Screen } from './game/types'
import Landing from './pages/LandingPage'
import Game from './pages/GamePage'
import Result from './pages/ResultPage'

export default function Illusion() {
    const [screen, setScreen] = useState<Screen>('landing')

    switch(screen) {
        case 'landing': return <Landing onStart={() => setScreen('game')} />
        case 'game': return <Game onFinish={() => setScreen('result')} />
        default: return <Result onRestart={() => setScreen('landing')} />
    }
}
