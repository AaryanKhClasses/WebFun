import { motion } from "framer-motion"

export default function Home() {
    return <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '24px'
        }}
    >
        <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
                fontSize: '48px',
                letterSpacing: '6px',
                fontWeight: 500
            }}
        >AaryanKh Web Games</motion.h1>
        <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.6 }}
            style={{
                fontSize: '18px',
                letterSpacing: '2px'
            }}
        >A collection of web games built with React and TypeScript</motion.p>
        <hr style={{
            width: '60%',
            border: '1px solid rgba(255, 255, 255, 0.2)'
        }} />
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'auto auto auto',
            gap: '24px',
            justifyContent: 'center'
        }}>
            <motion.img
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                style={{
                    borderRadius: '8px',
                    cursor: 'pointer',
                    userSelect: 'none',
                    border: '2px solid rgba(255, 255, 255, 0.1)'
                }}
                src='/color-io.png'
                alt='Color.IO Logo'
                width={360}
                height={150}
                onClick={() => window.location.href = '/color-io'}
            />
            <motion.img
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                style={{
                    borderRadius: '8px',
                    cursor: 'pointer',
                    userSelect: 'none',
                    border: '2px solid rgba(255, 255, 255, 0.1)'
                }}
                src='/reaction-test.png'
                alt='Reaction Test Logo'
                width={360}
                height={150}
                onClick={() => window.location.href = '/reaction-test'}
            />
            <motion.img
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                style={{
                    borderRadius: '8px',
                    cursor: 'pointer',
                    userSelect: 'none',
                    border: '2px solid rgba(255, 255, 255, 0.1)'
                }}
                src='/billion-dollars.png'
                alt='Billion Dollars Logo'
                width={360}
                height={150}
                onClick={() => window.location.href = '/billion-dollars'}
            />
            <motion.img
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                style={{
                    borderRadius: '8px',
                    cursor: 'pointer',
                    userSelect: 'none',
                    border: '2px solid rgba(255, 255, 255, 0.1)'
                }}
                src='/illusion.png'
                alt='Illusion Logo'
                width={360}
                height={150}
                onClick={() => window.location.href = '/illusion'}
            />
            <motion.img
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                style={{
                    borderRadius: '8px',
                    cursor: 'pointer',
                    userSelect: 'none',
                    border: '2px solid rgba(255, 255, 255, 0.1)'
                }}
                src='/pachinko.png'
                alt='Pachinko Logo'
                width={360}
                height={150}
                onClick={() => window.location.href = '/pachinko'}
            />
        </div>
    </motion.div>
}
