import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import cl from './WatchedItem.module.css'
import { deleteWatchedMovie, updateRating } from "../../http/moviesAPI";
import { Modal, Rating, Button } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Context } from "../../context";
import DeleteIcon from "@mui/icons-material/Delete";
const WatchedItem = observer((props) => {
    const {movie} = useContext(Context)
    const navigate = useNavigate()
    const getId = () => {
        navigate(`/movies/${props.imdbId}`)
    }
    const [rating, setRating] = useState(0)
    const rateMovie = () => {
        updateRating({rating: rating, id: props.id }).then(data => {
            movie.updateRating(data[1][0])
        })
        closeModal()
    }
    const [modal, setModal] = useState(false)
    const openModal = () => {
        setModal(true)
    }
    const closeModal = () => {
        setModal(false)
    }
    const deleteMovie = () => {
        deleteWatchedMovie(props.id).then(data => {
            movie.removeWatched(props.id)
        })
    }
    
    return (
        <div className={cl.item__wrapper}>
            <div className={cl.item__details__wrapper}>
                <div className={cl.item__image__wrapper}>
                <img className={cl.item__image} src={props.postersrc} alt="N/A" />
            </div>
            <div className={cl.item__info}>
            <p>{props.name}</p>
            <p>{props.type}</p>
            <p>{props.rating}</p>
            <Button variant="outlined" onClick={getId}  className={cl.item__button}>Details</Button>
            </div>
            </div>
            <div className={cl.item__buttons__wrapper}>
            <Button variant="outlined" onClick={openModal}>Rate movie</Button>
            <Button variant="outlined" color="error" endIcon={<DeleteIcon />} onClick={deleteMovie}>Delete</Button>
            <Modal open={modal} onClose={closeModal}>
                <div className={cl.modal__container}>
                <div className={cl.rating__wrapper}>
                <Rating
                 name="simple-controlled"
                 max={10}
                 size="large"
                 value={+rating}
                 onChange={(event) => setRating(event.target.value)} />
                </div>
                <button className={cl.modal__button} onClick={rateMovie}>Rate</button>
                </div>
            
            </Modal>
            
            
            </div>
        </div>
    );
});

export default WatchedItem;