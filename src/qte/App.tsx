import { motion } from 'framer-motion'
import { useQTE } from './useQTE'

export default function QTE() {
    const game = useQTE()
    if(game.gameOver) return <motion.div
        animate={ game.result === 'miss' ? { x: [-12, 12, -10, 10, -6, 6, 0] } : { x: 0 }}
        transition={{ duration: 0.5 }}
        style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh'
        }}
    >        
        <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
                fontSize: 48,
                marginBottom: 20
            }}
        >Game Over</motion.h1>
        <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
                fontSize: 24
            }}
        >Score: {game.score}</motion.h2>
        <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => window.location.reload()}
            style={{
                marginTop: 30,
                width: 400,
                fontSize: 20,
                cursor: 'pointer',
                padding: 10,
                backgroundColor: '#bbbbbb',
                border: 'none',
                borderRadius: 5,
                boxShadow: '0 2px 5px rgba(0,0,0,0.3)'
            }}
        >
            Restart
        </motion.button>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            marginTop: 20,
            width: 400,
            fontSize: 18,
        }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    color: '#ffff00'
                }}
            >
                <p>Perfect</p>
                <p>{game.stats.perfect}</p>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    color: '#4aa3ff'
                }}
            >
                <p>Great</p>
                <p>{game.stats.great}</p>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.75 }}
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    color: '#00ff88'
                }}
            >
                <p>Good</p>
                <p>{game.stats.good}</p>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    color: '#ff4444'
                }}
            >
                <p>Miss</p>
                <p>{game.stats.miss}</p>
            </motion.div>
            <hr />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 2 }}
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    color: 'white'
                }}
            >
                <p>Rank</p>
                <p>{game.getRank(game.score)}</p>
            </motion.div>
        </div>
    </motion.div>

    return <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh'
        }}
    >
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
                fontSize: 32,
                marginBottom: 20,
                position: 'fixed',
                top: 25,
                zIndex: 2,
                color: game.roundType === 'suddenDeath' ? '#ff4444' : game.roundType === 'reverse' ? '#4aa3ff' : game.roundType === 'fake' ? '#dddddd' : '#ffffff'
            }}
        >Round {game.round + 1} / 10</motion.div>
        
        {(game.phase === 'result' || game.phase === 'countdown') ? <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 1
            }}
        /> : <motion.div
            key={game.displayKey}
            initial={{ opacity: 0, y: 20, scale: 0.6 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
            style={{
                fontSize: 24,
                marginBottom: 20,
            }}
        >PRESS {game.displayKey.toUpperCase()}</motion.div>}

        {game.phase === 'result' && <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{
                position: 'absolute',
                fontSize: 48,
                fontWeight: 'bold',
                color: game.result === 'perfect' ? '#ffff00' : game.result === 'great' ? '#4aa3ff' : game.result === 'good' ? '#00ff88' : '#ff4444',
                backgroundColor: game.result === 'perfect' ? '#ffff003f' : game.result === 'great' ? '#4aa3ff3f' : game.result === 'good' ? '#00ff883f' : '#ff44443f',
                zIndex: 2,
                height: '100%',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >{game.result?.toUpperCase()}</motion.div>}

        {game.phase === 'countdown' && <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
                fontWeight: 'bold',
                zIndex: 2
            }}
        >
            <h2 style={{ marginBottom: 10 }}>{game.roundLabel(game.roundType)}</h2>
            <h1>{game.countdown > 0 ? game.countdown : 'GO'}</h1>
        </motion.div>}

        <div style={{
            position: 'absolute',
            top: 30,
            right: 40,
            fontSize: 22,
            fontWeight: 600,
            opacity: 0.85
        }}>Score: {game.score}</div>

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
                position: 'relative',
                width: 500,
                height: 30,
                backgroundColor: '#555',
                margin: 30,
            }}
        >
            <div style={{
                left: `${game.greenStart * 100}%`,
                width: `${game.greenWidth * 100}%`,
                height: '100%',
                position: 'absolute',
                backgroundColor: '#00ff88'
            }} />
            <div style={{
                left: `${game.arrowPos * 100}%`,
                width: 10,
                height: 30,
                position: 'absolute',
                backgroundColor: 'white',
                transform: 'translateX(-50%)'
            }} />
        </motion.div>
    </motion.div>
}
