import { observer } from 'mobx-react-lite'
import { useCallback, useEffect, useState } from 'react'
import { movieStore } from '../../store/movieStore'
import MovieItem from '../MovieItem/MovieItem'
import style from './MovieList.module.scss'
import useInfinitieScroll from '../../hooks/useInfinitieScroll'
import { IMovie } from '../../types'
import Modal from '../ui/Modal/Modal'
import EditMovie from '../EditMovie/EditMovie'

const MovieList: React.FC = observer(() => {
    const fetchingMovies = useCallback(() => movieStore.fetchMovies(), [])
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [selectedMovie, setSelectedMovie] = useState<IMovie | null>(null)

    const { lastElementRef } = useInfinitieScroll({
        action: fetchingMovies,
        dependency: movieStore.hasMore
    })
    // Первая загрузка фильмов
    useEffect(() => {
        if (movieStore.movies.length === 0) {
            movieStore.fetchMovies()
        }
    }, [])

    const handleRemoveItem = (id: number) => {
        movieStore.removeMovieById(id)
    }

    const handleEditItem = (movie: IMovie) => {
        setSelectedMovie(movie)
        setIsModalOpen(true)
    }

    return (
        <>
            <ul className={style.list}>
                {movieStore.movies.map((movie: IMovie) => (
                    <MovieItem
                        key={movie.movie_id}
                        onRemove={() => handleRemoveItem(movie.movie_id)}
                        data={movie}
                        onEdit={() => handleEditItem(movie)}
                    />
                ))}
            </ul>
            {movieStore.isLoading && <p>Loading...</p>}
            <div ref={lastElementRef} className={style.triggerBlock}></div>

            {isModalOpen && selectedMovie && (
                <Modal onClose={() => setIsModalOpen(false)}>
                    <EditMovie
                        movie={selectedMovie}
                        onClose={() => setIsModalOpen(false)}
                    />
                </Modal>
            )}
        </>
    )
})

export default MovieList
