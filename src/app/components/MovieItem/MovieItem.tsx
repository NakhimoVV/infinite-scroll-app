import { FC } from 'react'
import Button from '../ui/Button/Button'
import style from './MovieItem.module.scss'
import { IMovie } from '../../types'

type MovieItemProps = {
    data: IMovie
    i?: number
}

const MovieItem: FC<MovieItemProps> = ({ i, data }) => {
    return (
        <li className={style.item}>
            <strong>{i} - </strong>
            {data.original_title}
            <div>
                <Button>edit</Button>
                <Button>X</Button>
            </div>
        </li>
    )
}

export default MovieItem
