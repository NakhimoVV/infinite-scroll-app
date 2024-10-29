import { FC } from 'react'
import Button from '../ui/Button/Button'
import style from './MovieItem.module.scss'
import { IMovie } from '../../types'
import Image from '../ui/Image'

type MovieItemProps = {
    data: IMovie
    onRemove: () => void
    onEdit: () => void
}

const MovieItem: FC<MovieItemProps> = ({ data, onRemove, onEdit }) => {
    return (
        <li className={style.item}>
            <Image
                style={style.item__image}
                src={data.poster_path}
                width={200}
                height={300}
                alt={data.original_title}
            />
            <h2 className={style.item__title}>{data.original_title}</h2>
            <p className={style.item__overview}>{data.overview}</p>
            <div className={style.item__stats}>
                <span>{data.release_date}</span>
                <span>{data.popularity}</span>
            </div>
            <div className={style.item__actions}>
                <Button onClick={onEdit}>edit</Button>
                <Button onClick={onRemove}>X</Button>
            </div>
        </li>
    )
}

export default MovieItem
