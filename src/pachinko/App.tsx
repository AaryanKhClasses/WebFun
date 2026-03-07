import GameCanvas from './components/GameCanvas'

export default function Pachinko() {
    return <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#0a0a0a'
    }}><GameCanvas /></div>
}
