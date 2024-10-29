import { FC, ReactNode } from 'react'
import style from './Modal.module.scss'

interface ModalProps {
    onClose: () => void
    children: ReactNode
}

const Modal: FC<ModalProps> = ({ onClose, children }) => {
    return (
        <div className={style.modalBackdrop} onClick={onClose}>
            <div
                className={style.modalContent}
                onClick={(e) => e.stopPropagation()}
            >
                <button className={style.closeButton} onClick={onClose}>
                    &times;
                </button>
                {children}
            </div>
        </div>
    )
}

export default Modal
