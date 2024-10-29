import { FC, useState } from 'react'
import { IMovie } from '../../types'
import { movieStore } from '../../store/movieStore'
import style from './EditMovie.module.scss'

interface EditMovieProps {
    movie: IMovie
    onClose: () => void
}

const EditMovie: FC<EditMovieProps> = ({ movie, onClose }) => {
    const [data, setData] = useState({
        original_title: movie.original_title,
        overview: movie.overview,
        popularity: movie.popularity
    })

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { value, name } = e.target
        setData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        movieStore.editMovie(movie.movie_id, data)

        onClose()
    }

    return (
        <form onSubmit={handleSubmit} className={style.form}>
            <label>
                <p>Original Title:</p>
                <input
                    type="text"
                    name="original_title"
                    value={data.original_title}
                    onChange={handleChange}
                />
            </label>
            <label>
                <p>Overview:</p>
                <textarea
                    name="overview"
                    value={data.overview}
                    onChange={handleChange}
                />
            </label>
            <label>
                <p>Popularity:</p>
                <input
                    name="popularity"
                    type="number"
                    value={data.popularity}
                    onChange={handleChange}
                />
            </label>
            <button type="submit">Save</button>
        </form>
    )
}

export default EditMovie
