import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

type Props = {
    children: ReactNode
    onClick?: () => void
}

export default function Button({ children, onClick }: Props) {
    return <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        style={{
            padding: '14px 28px',
            background: 'transparent',
            color: 'white',
            border: '1px solid #222',
            borderRadius: '10px',
            fontSize: '16px',
            cursor: 'pointer'
        }}
    >{children}</motion.button>
}
