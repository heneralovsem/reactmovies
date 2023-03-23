import React, {useContext} from "react";
import { AuthContext } from "../context";
import { Route, Routes, Navigate } from "react-router-dom";
import { publicRoutes, privateRoutes } from "../router";
import Loader from "./Loader/Loader";


const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext)
    if (isLoading) {
        return <Loader/>
    }
    return (
        <div>
            {isAuth ?  <Routes>
    {privateRoutes.map(route => <Route path={route.path} element={route.component} key={route.path}/>)}
    </Routes> : <Routes>
    {publicRoutes.map(route => <Route path={route.path} element={route.component} key={route.path}/>)}
    </Routes>}
        </div>
    )
}
export default AppRouter;