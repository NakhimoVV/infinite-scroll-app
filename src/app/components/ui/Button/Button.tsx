import { ReactNode, FC } from 'react'

interface Button {
    children?: ReactNode
}

const Button: FC<Button> = ({ children }) => {
    return <button type="button">{children}</button>
}

export default Button
