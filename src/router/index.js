import { Navigate } from "react-router-dom";
import MoviesPage from "../pages/MoviesPage";
import AboutPage from '../pages/AboutPage'
import MovieDetailsPage from '../pages/MovieDetailsPage'
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
export const privateRoutes = [
    {path: '/movies', component: <MoviesPage/>},
    {path: '/about', component: <AboutPage/>},
    {path: '/', component: <Navigate to= "movies" replace/> },
    {path: '/movies/:id', component: <MovieDetailsPage/>},
    {path: '/login', component: <Navigate to="/movies" replace/>},
    {path: '/registration', component: <Navigate to="/movies" replace/>},
    {path: '/profile', component: <ProfilePage/> },

    
]
export const publicRoutes = [
    {path: '/movies', component: <MoviesPage/>},
    {path: '/about', component: <AboutPage/>},
    {path: '/', component: <Navigate to= "movies" replace/> },
    {path: '/movies/:id', component: <MovieDetailsPage/>},
    {path: '/profile', component: <Navigate to ="/login" replace/> },
    {path: '/registration', component: <LoginPage/>},
    {path: '/login', component: <LoginPage/>},
    

    
]
