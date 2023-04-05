import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import './styles/app.css'
import MoviesList from "./components/MoviesList";
import { BrowserRouter } from "react-router-dom";
import { Context } from "./context";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/Navbar/Navbar";
import { observer } from "mobx-react-lite";
import UserStore from "./store/UserStore";
import Loader from "./components/Loader/Loader";
import { check } from "./http/userAPI";
const App = observer (() => {
  
  const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        check().then(data => {
            user.setUser(true)
            user.setIsAuth(true)
            user.setUserId(data.id)
        }).finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <Loader/>
    }

  
  return (
    
    <BrowserRouter>
      <Navbar/>
      <AppRouter/>
    </BrowserRouter>
    
  );
})

export default App;
