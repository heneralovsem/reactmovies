import React, { useState } from "react";
import axios from "axios";
import MoviesList from "../components/MoviesList/MoviesList";
function MoviesPage() {
  
  return (
    <div className="movies__wrapper">
      <MoviesList/>
    </div>
  );
}

export default MoviesPage;