import React, { useState, useEffect } from "react";
import axios from "axios";
import './styles/app.css'
import MoviesList from "./components/MoviesList";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "./context";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/Navbar/Navbar";
function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (localStorage.getItem("auth")) {
      setIsAuth(true);
    }
    setIsLoading(false);
  }, []);
  
  return (
    <AuthContext.Provider
    value={{
      isAuth,
      setIsAuth,
      isLoading,
    }}>
    <BrowserRouter>
      <Navbar/>
      <AppRouter/>
    </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
