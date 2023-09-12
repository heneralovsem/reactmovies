import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MovieDetails from "../components/MovieDetails/MovieDetails";
import { Context } from "../context";
import { useFetching } from "../hooks/useFetching";
import Loader from "../components/Loader/Loader";
import Comments from "../components/Comments/Comments";

const MovieDetailsPage = () => {
  const { user } = useContext(Context);
  const params = useParams();

  const [movieData, setMovieData] = useState([]);
  const [fetchMovieData, isLoading, error] = useFetching(async () => {
    const response = await axios.get(
      `https://www.omdbapi.com/?apikey=e06d9c6d&r=json&i=${params.id}&plot=full`
    );
    setMovieData(response.data);
  });

  useEffect(() => {
    fetchMovieData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="movie__details__wrapper">
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
        imdbId={movieData.imdbID}
      />
      <Comments movieId={params.id} />
    </div>
  );
};

export default MovieDetailsPage;
