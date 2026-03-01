import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import ColorIO from './color-io/App'
import ReactionTest from './reaction-test/App'
import BillionDollars from './billion-dollars/App'

export default function App() {
    return <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/color-io' element={<ColorIO />} />
        <Route path='/reaction-test' element={<ReactionTest />} />
        <Route path='/billion-dollars' element={<BillionDollars />} />
    </Routes>
}
