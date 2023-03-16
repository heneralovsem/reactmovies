import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MovieDetails from "../components/MovieDetails/MovieDetails";

const MovieDetailsPage = () => {
  const params = useParams();
  console.log(params);
  const [movieData, setMovieData] = useState([]);

  async function fetchMovieData() {
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=e06d9c6d&r=json&i=${params.id}&plot=full`
    );
    setMovieData(response.data);
  }
  useEffect(() => {
    fetchMovieData();
  }, []);
  console.log(movieData);
  return (
      <MovieDetails
        postersrc={movieData.Poster}
        plot={movieData.Plot}
        actors={movieData.Actors}
        genres={movieData.Genre}
        type={movieData.Type}
        title={movieData.Title}
        totalSeasons={movieData.totalSeasons}
        released={movieData.Released}
        runtime={movieData.Runtime}
        year={movieData.Year}
        imdbRating={movieData.imdbRating}
      />
  );
};

export default MovieDetailsPage;
