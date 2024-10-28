import Button from '../ui/Button/Button'
import style from './MovieItem.module.scss'

type MovieItemProps = {
    data: string
    i: number
}

const MovieItem: React.FC<MovieItemProps> = ({ i, data }) => {
    return (
        <li className={style.item}>
            <strong>{i} - </strong>
            {data}
            <div>
                <Button>edit</Button>
                <Button>X</Button>
            </div>
        </li>
    )
}

export default MovieItem
