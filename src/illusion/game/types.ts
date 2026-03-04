export type IllusionComponentProps = {
    onAnswer: (fooled: boolean) => void
}

export type Illusion = {
    id: string
    title: string
    Component: React.FC<IllusionComponentProps>
    explanation: string
}

export type Screen = 'landing' | 'game' | 'result'

export type GameState = {
    current: number
    fooledCount: number
    answers: boolean[]
    next: (fooled: boolean) => void
    reset: () => void
}

export type PageProps = {
    onStart?: () => void
    onFinish?: () => void
    onRestart?: () => void
}
