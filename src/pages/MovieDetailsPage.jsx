import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MovieDetails from "../components/MovieDetails/MovieDetails";
import { createWatchLaterMovie, createWatchedMovie, fetchWatchLaterMovies, fetchWatchedMovies } from "../http/moviesAPI";
import { Context } from "../context";

const MovieDetailsPage = () => {
  const {user} = useContext(Context)
  const params = useParams();
  console.log(params);
  const [isWatched, setIsWatched] = useState(false)
  const [isWatchLater, setIsWatchLater] = useState(false)
  const [movieData, setMovieData] = useState([]);
  async function fetchMovieData() {
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=e06d9c6d&r=json&i=${params.id}&plot=full`
    );
    setMovieData(response.data);
  }
  const addWatchLater = () => {
    createWatchLaterMovie({name: movieData.Title, postersrc: movieData.Poster, imdbId: movieData.imdbID, userId: user._userId }).then(data => {
      
    })
  }
  const addWatched = () => {
    createWatchedMovie({name: movieData.Title, postersrc: movieData.Poster, imdbId: movieData.imdbID, userId: user._userId }).then(data => {
      
    })
  }
  
  useEffect(() => {
    fetchMovieData();
    fetchWatchedMovies(user._userId).then(data => {
      data.forEach(element => {
        if (params.id === element.imdbId) { 
          setIsWatched(true)
        }
      });
    })
    fetchWatchLaterMovies(user._userId).then(data => {
      data.forEach(element => {
        if (params.id === element.imdbId) { 
          setIsWatchLater(true)
        }
      });
    })
    
  }, []); 
  const myRating = () => {
    
    
  }
  
  console.log(movieData);
  return (
    <div>
      <button onClick={myRating}>testrating</button>
      {!isWatchLater ? <button onClick={addWatchLater}> Add to watch later</button> : <p>You've already added this movie to watch later list</p> }
     {!isWatched ? <button onClick={addWatched}> Mark as watched</button> : <p>You've already marked this movie as watched</p>} 
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
      </div>
  );
};

export default MovieDetailsPage;
