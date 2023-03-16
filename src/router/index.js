import { Navigate } from "react-router-dom";
import MoviesPage from "../pages/MoviesPage";
import AboutPage from '../pages/AboutPage'
import MovieDetailsPage from '../pages/MovieDetailsPage'
export const routes = [
    {path: '/movies', component: <MoviesPage/>},
    {path: '/', component: <Navigate to= "movies" replace/> },
    {path: '/movies/:id', component: <MovieDetailsPage/>},
    
]
