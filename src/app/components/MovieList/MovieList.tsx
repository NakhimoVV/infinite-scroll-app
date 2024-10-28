import { observer } from 'mobx-react-lite'
import { useEffect, useRef } from 'react'
import { movieStore } from '../../store/movieStore'
import MovieItem from '../MovieItem/MovieItem'
import style from './MovieList.module.scss'

const MovieList: React.FC = observer(() => {
    const observerRef = useRef<IntersectionObserver | null>(null)
    const lastElementRef = useRef<HTMLDivElement | null>(null)

    // Первая загрузка фильмов
    useEffect(() => {
        if (movieStore.movies.length === 0) {
            movieStore.fetchMovies()
        }
    }, [])

    // Настройка IntersectionObserver
    useEffect(() => {
        if (observerRef.current) observerRef.current.disconnect()

        observerRef.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && movieStore.hasMore) {
                    movieStore.fetchMovies()
                }
            },
            { threshold: 0.1 }
        )

        if (lastElementRef.current) {
            observerRef.current.observe(lastElementRef.current)
        }

        return function () {
            if (observerRef.current) observerRef.current.disconnect()
        }
    }, [movieStore.hasMore])

    return (
        <div>
            <ul className={style.list}>
                {movieStore.movies.map((movie, index) => (
                    <MovieItem
                        key={movie.id}
                        i={index + 1}
                        data={movie.original_title}
                    />
                ))}
            </ul>
            {movieStore.isLoading && <p>Loading...</p>}
            <div ref={lastElementRef} className={style.triggerBlock}></div>
        </div>
    )
})

export default MovieList
