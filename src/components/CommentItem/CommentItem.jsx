import React, { useContext, useState } from "react";
import cl from "./CommentItem.module.css";
import { Context } from "../../context";
import { deleteComment, updateComment } from "../../http/moviesAPI";
import { Modal } from "@mui/material";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import { observer } from "mobx-react-lite";
const CommentItem = observer((props) => {
  const [edit, setEdit] = useState(false);
  const [editedValue, setEditedValue] = useState(props.text);
  const { movie } = useContext(Context);
  const { user } = useContext(Context);
  const editComment = () => {
    setEdit(true);
  };
  const updateEditedComment = () => {
    updateComment({ text: editedValue, id: props.id }).then((data) => {
      movie.updateComment(data[1][0]);
    });
    closeModal();
  };
  const closeModal = () => {
    setEdit(false);
  };
  const deleteMovieComment = () => {
    deleteComment(props.id).then((data) => {
      movie.removeComment(props.id);
    });
  };
  return (
    <div className={cl.comment__wrapper}>
      <div className={cl.comment__img__wrapper}>
        <div>
          <img
            className={cl.comment__img}
            src="https://www.milton.edu/wp-content/uploads/2019/11/avatar-placeholder.jpg"
            alt=""
          />
        </div>
        <h2 className={cl.comment__author}>{props.author}</h2>
      </div>
      <div className={cl.comment__info}>
        <p className={cl.comment__text}>{props.text}</p>
        {user._userId === props.userId ? (
          <div className={cl.comment__buttons}>
            <Button
              variant="outlined"
              color="success"
              size="small"
              endIcon={<EditIcon />}
              className={cl.comment__button}
              onClick={editComment}
            >
              Edit
            </Button>{" "}
            <Button
              className={cl.comment__button}
              variant="outlined"
              color="error"
              size="small"
              endIcon={<DeleteIcon />}
              onClick={deleteMovieComment}
            >
              Delete
            </Button>
          </div>
        ) : null}
        <Modal open={edit} onClose={closeModal}>
          <div className={cl.comment__modal}>
            <div>
              {" "}
              <TextField
                multiline
                maxRows={4}
                value={editedValue}
                className={cl.modal__text}
                onChange={(event) => setEditedValue(event.target.value)}
              ></TextField>{" "}
            </div>
            <div>
              <Button
                className={cl.modal__btn}
                variant="outlined"
                endIcon={<CheckIcon />}
                onClick={updateEditedComment}
              >
                {" "}
                Save
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
});

export default CommentItem;
