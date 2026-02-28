import { motion } from 'framer-motion'

export default function TimerCircle({ duration }: { duration: number }) {
    const circumference = 2 * Math.PI * 54

    return <svg
        width='140'
        height='140'
        style={{
            position: 'absolute',
            opacity: 0.7
        }}
    >
        <circle
            cx='70'
            cy='70'
            r='54'
            stroke='white'
            strokeWidth='2'
            fill='transparent'
            opacity='0.2'
        />
        <motion.circle
            cx='70'
            cy='70'
            r='54'
            stroke='white'
            strokeWidth='3'
            fill='transparent'
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: circumference }}
            transition={{ duration, ease: 'linear' }}
            style={{
                rotate: '-90deg',
                transformOrigin: 'center'
            }}
        />
    </svg>
}
