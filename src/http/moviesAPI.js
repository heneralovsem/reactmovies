import { $authHost, $host } from "."
import jwt_decode from "jwt-decode"

export const createWatchLaterMovie =  async (watchLaterMovie) => {
    const {data} = await $host.post('api/user/watchlater', watchLaterMovie)
    return data
}
 export const fetchWatchLaterMovies =  async (userId) => {
    const {data} = await $host.get(`api/user/watchlater?userId=${userId}`)
     return data
 }
 export const deleteWatchLaterMovie = async (id) => {
    const {data} = await $host.delete('api/user/watchlater/' + id)
    return data;
}
export const createWatchedMovie =  async (watchedMovie) => {
    const {data} = await $host.post('api/user/watched', watchedMovie)
    return data
}
export const fetchWatchedMovies =  async (userId) => {
    const {data} = await $host.get(`api/user/watched?userId=${userId}`) 
    return data
}
export const deleteWatchedMovie = async (id) => {
    const {data} = await $host.delete('api/user/watched/' + id)
    return data;
}
export const updateRating = async (watchedMovie) => {
    const {data} = await $host.put('api/user/rating/' + watchedMovie.id, watchedMovie)
    return data
}
export const createComment = async (comment) => {
    const {data} = await $host.post('api/comments', comment)
    return data
}
export const fetchComments = async (imdbId) => {
    const {data} = await $host.get(`api/comments?imdbId=${imdbId}`)
    return data
}
export const updateComment = async (comment) => {
    const {data} = await $host.put('api/comments/' + comment.id, comment)
    return data
}
export const deleteComment = async (id) => {
    const {data} = await $host.delete('api/comments/' + id)
    return data;
}
