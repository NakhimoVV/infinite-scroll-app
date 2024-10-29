import { movieStore } from './movieStore'
import axios from 'axios'
import { IMovie } from '../types'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('MovieStore', () => {
    beforeEach(() => {
        movieStore.movies = []
        movieStore.currentPage = 1
        movieStore.isLoading = false
        movieStore.errorFetch = null
        movieStore.hasMore = true
    })

    test('FetchMovies - success', async () => {
        const mockMovies: Partial<IMovie>[] = [
            {
                movie_id: 1,
                original_title: 'Test Movie',
                overview: 'lorem',
                popularity: 5
            }
        ]
        mockedAxios.get.mockResolvedValueOnce({
            data: { data: mockMovies, last_page: 3 }
        })

        await movieStore.fetchMovies()

        expect(movieStore.movies).toEqual(mockMovies)
        expect(movieStore.currentPage).toBe(2)
        expect(movieStore.hasMore).toBe(true)
        expect(movieStore.isLoading).toBe(false)
        expect(movieStore.errorFetch).toBeNull()
    })

    test('FetchMovies - failure', async () => {
        const mockError = new Error('Fetch error')
        mockedAxios.get.mockRejectedValueOnce(mockError)

        await movieStore.fetchMovies()

        expect(movieStore.movies).toEqual([])
        expect(movieStore.isLoading).toBe(false)
        expect(movieStore.errorFetch).toEqual(mockError)
    })

    test('RemoveMovieById', () => {
        movieStore.movies = [
            {
                movie_id: 1,
                original_title: 'Test Movie',
                overview: 'lorem',
                popularity: 5,
                poster_path: 'path/to/poster.jpg',
                release_date: '2024-01-01'
            },
            {
                movie_id: 2,
                original_title: 'Test Movie2',
                overview: 'lorem2',
                popularity: 10,
                poster_path: 'path/to/poster2.jpg',
                release_date: '2024-01-02'
            }
        ]

        movieStore.removeMovieById(1)

        expect(movieStore.movies).toHaveLength(1)
        expect(movieStore.movies[0].movie_id).toBe(2)
    })

    test('EditMovie', () => {
        movieStore.movies = [
            {
                movie_id: 1,
                original_title: 'Test Movie',
                overview: 'lorem',
                popularity: 5,
                poster_path: 'path/to/poster.jpg',
                release_date: '2024-01-01'
            }
        ]
        const updatedData = { original_title: 'New Title' }

        movieStore.editMovie(1, updatedData)

        expect(movieStore.movies[0].original_title).toBe('New Title')
    })
})
