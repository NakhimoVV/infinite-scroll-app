import { FC } from 'react'
import style from './Spinner.module.scss'

const Spinner: FC = () => {
    return <div className={style['lds-dual-ring']}></div>
}

export default Spinner
