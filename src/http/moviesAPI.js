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
export const createWatchedMovie =  async (watchedMovie) => {
    const {data} = await $host.post('api/user/watched', watchedMovie)
    return data
}
export const fetchWatchedMovies =  async (userId) => {
    const {data} = await $host.get(`api/user/watched?userId=${userId}`) 
    return data
}
