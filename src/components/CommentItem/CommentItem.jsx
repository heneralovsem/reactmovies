import React, { useContext, useState } from "react";
import cl from './CommentItem.module.css'
import { Context } from "../../context";
import { deleteComment, updateComment } from "../../http/moviesAPI";
import { Modal } from "@mui/material";
import { observer } from "mobx-react-lite";
const CommentItem = observer((props) => {
    const [edit, setEdit] = useState(false)
    const [editedValue, setEditedValue] = useState(props.text)
    const {movie} = useContext(Context)
    const {user} = useContext(Context)
    const editComment = () => {
        setEdit(true)
}   
    const updateEditedComment = () => {
        updateComment({text: editedValue, id: props.id}).then(data => {
            console.log(data[1][0])
            movie.updateComment(data[1][0])
            
        })
        closeModal()
    }
    const closeModal = () => {
        setEdit(false)
    }
    const deleteMovieComment = () => {
        deleteComment(props.id).then(data => {
           movie.removeComment(props.id)
        })
    }
    return (
        <div className={cl.comment__wrapper}>
            <div className={cl.comment__img__wrapper}>
            <img className={cl.comment__img} src="https://www.milton.edu/wp-content/uploads/2019/11/avatar-placeholder.jpg" alt="" />
            </div>
            <div className={cl.comment__info}>
            <h2 className={cl.comment__author}>{props.author}</h2>
            <p>{props.text}</p>
            {user._userId === props.userId? <div><button className={cl.comment__button} onClick={editComment}>Edit</button> <button onClick={deleteMovieComment}>Delete</button></div> : null}
            <Modal open={edit} onClose={closeModal}>
                <div className={cl.comment__modal}>
                <div> <input type="text" value={editedValue} onChange={(event) => setEditedValue(event.target.value)} /> <button onClick={updateEditedComment}> Save</button> </div>
                </div>
            </Modal>
            
            </div>
        </div>
    );
});

export default CommentItem;