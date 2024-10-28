export interface IMovie {
    movie_id: number
    original_title: string
    overview: string
    poster_path: string
    release_date: string
    popularity: number
}
export interface IMoviesResponseData {
    data: IMovie[]
    last_page: number
}
