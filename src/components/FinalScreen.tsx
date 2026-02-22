import { motion, animate } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { useGame } from '../game/GameProvider'
import { getGrade } from '../game/scoring'
import GradeCircle from '../ui/GradeCircle'
import Button from '../ui/Button'

export default function FinalScreen() {
    const { state, restart } = useGame()

    const totalScore = useMemo(() => {
        return state.rounds.reduce((acc: number, round: any) => acc + (round.score || 0), 0)
    }, [state.rounds])

    const maxScore = 50
    const progress = totalScore / maxScore
    const grade = getGrade(progress)

    const [displayScore, setDisplayScore] = useState(0)
    const [displayProgress, setDisplayProgress] = useState(0)

    useEffect(() => {
        const scoreAnim = animate(0, totalScore, {
            duration: 1.2,
            ease: 'easeOut',
            onUpdate(value) {
                setDisplayScore(Math.round(value.toFixed(2)))
            }
        })

        const progressAnim = animate(0, progress, {
            duration: 1.4,
            ease: 'easeOut',
            delay: 0.2,
            onUpdate(value) {
                setDisplayProgress(value)
            }
        })

        return () => {
            scoreAnim.stop()
            progressAnim.stop()
        }
    }, [])

    return <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '40px'
        }}
    >
        <GradeCircle grade={grade} progress={displayProgress} />
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{
                fontSize: '24px',
                letterSpacing: '2px'
            }}
        >{displayScore.toFixed(2)} / 50</motion.div>
        <Button onClick={restart}>PLAY AGAIN</Button>
    </motion.div>
}
