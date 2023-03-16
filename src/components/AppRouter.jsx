import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { routes } from "../router";


const AppRouter = () => {
    return (
        <div>
            <Routes>
                {routes.map(route => <Route path={route.path} element={route.component} key={route.path}/>)}
            </Routes>
        </div>
    )
}
export default AppRouter;