import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MovieDetails from "../components/MovieDetails/MovieDetails";
import { createComment, createWatchLaterMovie, createWatchedMovie, fetchComments, fetchWatchLaterMovies, fetchWatchedMovies, updateComment } from "../http/moviesAPI";
import { Context } from "../context";
import { useFetching } from "../hooks/useFetching";
import CommentItem from "../components/CommentItem/CommentItem";
import Loader from "../components/Loader/Loader";

const MovieDetailsPage = () => {
  const {user} = useContext(Context)
  const params = useParams();
  console.log(params);
  const [isWatched, setIsWatched] = useState(false)
  const [myRating, setMyRating] = useState(0)
  const [commentText, setCommentText] = useState('')
  const [commentData, setCommentData] = useState([])
  const [isWatchLater, setIsWatchLater] = useState(false)
  const [movieData, setMovieData] = useState([]);
  const [fetchMovieData, isLoading, error] = useFetching(async () => {
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=e06d9c6d&r=json&i=${params.id}&plot=full`
    );
    setMovieData(response.data);
  })
  const addWatchLater = () => {
    createWatchLaterMovie({name: movieData.Title, postersrc: movieData.Poster, imdbId: movieData.imdbID, userId: user._userId }).then(data => {
      
    })
  }
  const addWatched = () => {
    createWatchedMovie({name: movieData.Title, postersrc: movieData.Poster, imdbId: movieData.imdbID, userId: user._userId }).then(data => {
      
    })
  }
  const addComment = () => {
    createComment({text: commentText, author: user._userName, imdbId: params.id, userId: user._userId }).then(data => {
    fetchComments(params.id).then(data => {
      setCommentData(data)
    })
    })
  }
  
  useEffect(() => {
    fetchMovieData();
    fetchWatchedMovies(user._userId).then(data => {
      data.forEach(element => {
        if (params.id === element.imdbId) { 
          setIsWatched(true)
          setMyRating(element.rating)
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
     fetchComments(params.id).then(data => {
       setCommentData(data)
     })
    
  }, []); 
  
  
  console.log(movieData);
  console.log(user._userName)
  console.log(user._userId)
  if (isLoading) {
    return <Loader/>
  }
  return (
    <div>
      
      {!isWatchLater ? <button onClick={addWatchLater}> Add to watch later</button> : <p>You've already added this movie to watch later list</p> }
     {!isWatched ? <button onClick={addWatched}> Mark as watched</button> : <p>You've already marked this movie as watched</p>} 
     {myRating > 0 ? <p>{myRating}</p> : <p>You didn't rate this movie</p>}
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
      <div><input type="text" value={commentText} onChange={(event) => setCommentText(event.target.value)}
          placeholder="Comment..." />
      <button onClick={addComment}> Comment</button>
      {commentData.map(comment => (<CommentItem key={comment.id} text={comment.text} imdbId={comment.imdbId} userId={comment.userId} author={comment.author} id={comment.id}/>))}</div>
      
      </div>
  );
};

export default MovieDetailsPage;
