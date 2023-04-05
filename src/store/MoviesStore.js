import {makeAutoObservable} from "mobx"
export default class MoviesStore {
    constructor() {
        this._watchLaterMovies = []
        this._watchedMovies = []
        makeAutoObservable(this)
    }

    setWatchLater(watchLaterMovies) {
        this._watchLaterMovies = watchLaterMovies
    }
    setWatched(watchedMovies) {
        this._watchedMovies = watchedMovies
    }
    get watchLaterMovies() {
        return this._watchLaterMovies
    }
    get watchedMovies() {
        return this._watchedMovies
    }
    
}