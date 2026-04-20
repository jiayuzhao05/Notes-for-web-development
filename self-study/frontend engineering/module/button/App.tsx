import { useRef } from 'react'
import Button from './Button'

function App() {
    const btnRef = useRef<HTMLButtonElement>(null)

    const handleFocus = () => {
        btnRef.current?.focus()
        console.log('button width:', btnRef.current?.offsetWidth)
    }

    return (
        <div style={{ padding: 20 }}>
            <h2>Button component</h2>

            <Button ref={btnRef} type="primary" size="medium">
                click me
            </Button>

            <Button type="success" size="small">
                success
            </Button>

            <Button type="danger" size="large" onClick={() => alert('clicked')}>
                delete
            </Button>

            <hr />

            <Button type="primary" onClick={handleFocus}>
                focus on first button
            </Button>
        </div>
    )
}

export default App
