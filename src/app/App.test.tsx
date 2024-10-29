import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'
import Button from './components/ui/Button/Button'

describe('TEST APP', () => {
    test('Has the DOM structure component App', () => {
        render(<App />)
        const mainComponent = screen.getByRole('main')
        expect(mainComponent).toBeInTheDocument()
    })
    test('Button', () => {
        render(<Button />)
        const btn = screen.getByTestId('testBtn')
        fireEvent.click(btn, {})
        expect(screen.queryByTestId('testBtn')).toBeInTheDocument()
    })
})
