import React, { useContext, useState } from "react";
import cl from './CommentItem.module.css'
import { Context } from "../../context";
import { updateComment } from "../../http/moviesAPI";

const CommentItem = (props) => {
    const [edit, setEdit] = useState(false)
    const [editedValue, setEditedValue] = useState(props.text)
    const {user} = useContext(Context)
    const editComment = () => {
        setEdit(true)
}   
    const updateEditedComment = () => {
        updateComment({text: editedValue, id: props.id})
    }
    
    return (
        <div className={cl.comment_wrapper}>
            <h1>{props.author}</h1>
            <p>{props.text}</p>
            <p>{props.imdbId}</p>
            <p>{props.id}</p>
            <p>{props.userId}</p>
            {user._userId === props.userId? <button onClick={editComment}>Edit</button> : null}
            {edit? <div> <input type="text" value={editedValue} onChange={(event) => setEditedValue(event.target.value)} /> <button onClick={updateEditedComment}> Save</button> </div> : null}
        </div>
    );
};

export default CommentItem;