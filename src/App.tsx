import FinalScreen from './components/FinalScreen'
import GuessScreen from './components/GuessScreen'
import MemorizeScreen from './components/MemorizeScreen'
import ResultScreen from './components/ResultScreen'
import StartScreen from './components/StartScreen'
import GameProvider, { useGame } from './game/GameProvider'

function GameView() {
    const { state } = useGame()

    switch(state.phase) {
        case 'start': return <StartScreen />
        case 'memorize': return <MemorizeScreen />
        case 'guess': return <GuessScreen />
        case 'result': return <ResultScreen />
        case 'final': return <FinalScreen />
        default: return <div>Phase: {state.phase}</div>
    }
}

export default function App() {
    return <GameProvider>
        <GameView />
    </GameProvider>
}
