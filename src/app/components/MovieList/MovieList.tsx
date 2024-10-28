import { observer } from 'mobx-react-lite'
import { useCallback, useEffect } from 'react'
import { movieStore } from '../../store/movieStore'
import MovieItem from '../MovieItem/MovieItem'
import style from './MovieList.module.scss'
import useInfinitieScroll from '../../hooks/useInfinitieScroll'
import { IMovie } from '../../types'

const MovieList: React.FC = observer(() => {
    const fetchingMovies = useCallback(() => movieStore.fetchMovies(), [])

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

    return (
        <>
            <ul className={style.list}>
                {movieStore.movies.map((movie: IMovie) => (
                    <MovieItem
                        key={movie.movie_id}
                        onRemove={() => handleRemoveItem(movie.movie_id)}
                        data={movie}
                    />
                ))}
            </ul>
            {movieStore.isLoading && <p>Loading...</p>}
            <div ref={lastElementRef} className={style.triggerBlock}></div>
        </>
    )
})

export default MovieList
