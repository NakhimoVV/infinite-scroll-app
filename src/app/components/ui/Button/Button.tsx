import { ReactNode, FC } from 'react'
import style from './Button.module.scss'

interface ButtonProps {
    children?: ReactNode
    onClick?: () => void
}

const Button: FC<ButtonProps> = ({ children, onClick }) => {
    return (
        <button
            className={style.btn}
            type="button"
            onClick={onClick}
            data-testid="testBtn"
        >
            {children}
        </button>
    )
}

export default Button
