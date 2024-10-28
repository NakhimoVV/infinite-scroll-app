import { ReactNode, FC } from 'react'

interface ButtonProps {
    children?: ReactNode
    onClick?: () => void
}

const Button: FC<ButtonProps> = ({ children, onClick }) => {
    return (
        <button type="button" onClick={onClick}>
            {children}
        </button>
    )
}

export default Button
