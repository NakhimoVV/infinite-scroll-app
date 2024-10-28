export interface IMovie {
    movie_id: number
    poster_path: string
    original_title: string
    overview: string
    release_date: string
    popularity: number
}
export interface IMoviesResponseData {
    data: IMovie[]
    last_page: number
}
