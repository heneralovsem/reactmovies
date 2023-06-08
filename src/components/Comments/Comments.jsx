import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { createComment, fetchComments } from "../../http/moviesAPI";
import { Context } from "../../context";
import CommentItem from "../CommentItem/CommentItem";
import cl from './Comments.module.css'
import { observer } from "mobx-react-lite";
import { get } from "mobx";
import { TextField, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";


const Comments = observer((props) => {
  const {user} = useContext(Context)
  const {movie} = useContext(Context)
  const [commentText, setCommentText] = useState('')
  const [commentData, setCommentData] = useState([])
  
  const addComment = () => {
    if (commentText.length > 0 && commentText.trim() != '') {
    createComment({text: commentText, author: user._userName, imdbId: props.movieId, userId: user._userId }).then(data => {
      console.log(data)
      movie.addComment(data)
      setCommentText('')
    })
  }
  else {
    alert('Comment must contain at least 1 character')
  }
}
  
  useEffect(() => {
    
      fetchComments(props.movieId).then(data => {
           movie.setComments(data)
      })
    
    
  }, []); 
  
  
  return (
    
      <div className={cl.comments__wrapper}><TextField variant="standard" fullWidth value={commentText} onChange={(event) => setCommentText(event.target.value)}
          placeholder="Comment..." />
         <div className={cl.comments__button}>
          <Button disabled = {!user._isAuth} variant="outlined" endIcon={<SendIcon />} onClick={addComment}>Send</Button>
          </div> 
      {movie._comments.slice().sort((a,b) => b.id - a.id).map(comment => (<CommentItem key={comment.id} text={comment.text} imdbId={comment.imdbId} userId={comment.userId} author={comment.author} id={comment.id}/>))}</div>
      
     
  );
});

export default Comments;