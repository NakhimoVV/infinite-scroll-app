export interface IMovie {
    id: string
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
