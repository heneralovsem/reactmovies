import {makeAutoObservable} from "mobx"


export default class MoviesStore {
    constructor() {
        this._watchLaterMovies = []
        this._watchedMovies = []
        this._comments = []
        makeAutoObservable(this)
    }

    setWatchLater(watchLaterMovies) {
        this._watchLaterMovies = watchLaterMovies
    }
    addWatchLater(watchLaterMovie) {
        this._watchLaterMovies.push(watchLaterMovie)
    }
    removeWatchLater(id) {
        this._watchLaterMovies = this._watchLaterMovies.filter(watchLaterMovie => watchLaterMovie.id !==id)
    }
    setWatched(watchedMovies) {
        this._watchedMovies = watchedMovies
    }
    addWatched(watchedMovie) {
        this._watchedMovies.push(watchedMovie)
    }
    removeWatched(id) {
        this._watchedMovies = this._watchedMovies.filter(watchedMovie => watchedMovie.id !==id)
    }
    updateRating(watchedMovie) {
       const updatedMovie = watchedMovie
       this._watchedMovies = this._watchedMovies.map(watchedMovie => watchedMovie.id === updatedMovie.id ? updatedMovie : watchedMovie )
    }
    setComments(comments) {
        this._comments = comments
    }
    addComment(comment) {
        this._comments.push(comment)
    }
    updateComment(comment) {
        const newComment = comment
        this._comments = this._comments.map(comment => comment.id === newComment.id ? newComment : comment ) 
    }
    removeComment(id) {
        this._comments = this._comments.filter(comment => comment.id !==id)
    }
    get comments() {
        return this._comments
    } 
    get watchLaterMovies() {
        return this._watchLaterMovies
    }
    get watchedMovies() {
        return this._watchedMovies
    }
    
}