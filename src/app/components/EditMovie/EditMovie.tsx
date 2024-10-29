import { FC, useState } from 'react'
import { IMovie } from '../../types'
import { movieStore } from '../../store/movieStore'

interface EditMovieProps {
    movie: IMovie
    onClose: () => void
}

const EditMovie: FC<EditMovieProps> = ({ movie, onClose }) => {
    const [data, setData] = useState({
        originalTitle: movie.original_title,
        overview: movie.overview,
        popularity: movie.popularity
    })

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { value, name } = e.target
        console.log('RENDER: !')
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
        <form onSubmit={handleSubmit}>
            <label>
                Original Title:
                <input
                    type="text"
                    name="originalTitle"
                    value={data.originalTitle}
                    onChange={handleChange}
                />
            </label>
            <label>
                Overview:
                <textarea
                    name="overview"
                    value={data.overview}
                    onChange={handleChange}
                />
            </label>
            <label>
                Popularity:
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