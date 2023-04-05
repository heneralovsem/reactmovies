import React, {useContext} from "react";
import {Context } from "../context";
import { Route, Routes, Navigate } from "react-router-dom";
import { publicRoutes, privateRoutes } from "../router";
import Loader from "./Loader/Loader";
import { observer } from "mobx-react-lite";


const AppRouter = observer (() => {
    const {user} = useContext(Context)
    
    return (
        <div>
            {user.isAuth ?  <Routes>
    {privateRoutes.map(route => <Route path={route.path} element={route.component} key={route.path}/>)}
    </Routes> : <Routes>
    {publicRoutes.map(route => <Route path={route.path} element={route.component} key={route.path}/>)}
    </Routes>}
        </div>
    )
})
export default AppRouter;