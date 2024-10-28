import { makeAutoObservable, runInAction } from 'mobx'
import { IMovie, IMoviesResponseData } from '../types'
import axios from 'axios'
import configFile from '../config.json'

class MovieStore {
    movies: IMovie[] = []
    isLoading = false
    currentPage = 1
    errorFetch: unknown | null = null
    hasMore = true

    constructor() {
        makeAutoObservable(this)
    }

    async fetchMovies(): Promise<void> {
        if (this.isLoading || !this.hasMore) return
        this.isLoading = true
        try {
            const { data: resData } = await axios.get<IMoviesResponseData>(
                configFile.apiEndPoint,
                {
                    params: { page: this.currentPage }
                }
            )
            runInAction(() => {
                this.movies = [...this.movies, ...resData.data]
                this.currentPage += 1
                this.hasMore =
                    this.currentPage < resData.last_page ? true : false
            })
        } catch (error) {
            runInAction(() => {
                this.errorFetch = error
            })
        } finally {
            runInAction(() => {
                this.isLoading = false
            })
        }
    }

    removeMovieById(id: number) {
        runInAction(() => {
            this.movies = this.movies.filter((movie) => movie.movie_id !== id)
        })
    }

    editMovie(id: number, updatedData: Partial<IMovie>) {
        runInAction(() => {
            this.movies = this.movies.map((movie) =>
                movie.movie_id === id ? { ...movie, ...updatedData } : movie
            )
        })
    }
}

export const movieStore = new MovieStore()
