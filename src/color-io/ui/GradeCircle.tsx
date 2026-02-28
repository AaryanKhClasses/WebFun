import { motion } from 'framer-motion'

export default function GradeCircle({ grade, progress }: { grade: string, progress: number }) {
    const radius = 90
    const circumference = 2 * Math.PI * radius
    const offset = circumference * (1 - progress)

    return <div style={{
        position: 'relative',
        width: 220,
        height: 200
    }}>
        <svg width='220' height='200'>
            <circle
                cx='110'
                cy='100'
                r={radius}
                fill='transparent'
                stroke='#222'
                strokeWidth='8'
            />
            <motion.circle
                cx='110'
                cy='100'
                r={radius}
                fill='transparent'
                stroke='white'
                strokeWidth='8'
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap='round'
                style={{
                    rotate: '-90deg',
                    transformOrigin: 'center'
                }}
            />
        </svg>
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.8 }}
            style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '72px',
                fontWeight: 600,
                letterSpacing: '4px'
            }}
        >{grade}</motion.div>
    </div>
}
