import { motion } from 'framer-motion'

type Props = {
    label: string
    value: number
    min: number
    max: number
    onChange: (value: number) => void
}

export default function Slider({ label, value, min, max, onChange }: Props) {
    return <div style={{ width: '320px' }}>
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '8px',
            opacity: 0.6,
            fontSize: '14px',
        }}>
            <span>{label}</span>
            <span>{value}</span>
        </div>
        <motion.input
            type='range'
            min={min}
            max={max}
            value={value}
            onChange={e => onChange(Number(e.target.value))}
            whileTap={{ scale: 1.02 }}
            style={{
                width: '100%',
                accentColor: 'white',
                cursor: 'pointer'
            }}
        />
    </div>
}
