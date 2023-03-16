import React, { useState } from "react";
import axios from "axios";
import './styles/app.css'
import MoviesList from "./components/MoviesList";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
function App() {
  
  return (
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
  );
}

export default App;
