import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import cl from './WatchedItem.module.css'
import { deleteWatchedMovie, updateRating } from "../../http/moviesAPI";
import { Modal, Rating, Button } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Context } from "../../context";
import DeleteIcon from "@mui/icons-material/Delete";
import Icon from "@mdi/react";
import { mdiStar } from "@mdi/js";

const WatchedItem = observer((props) => {
    const {movie} = useContext(Context)
    const navigate = useNavigate()
    const getId = () => {
        navigate(`/movies/${props.imdbId}`)
    }
    const [rating, setRating] = useState(props.rating)
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
                {props.postersrc === 'N/A' ? <img className={cl.item__image} src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png' alt="poster" /> : <img className={cl.item__image} src={props.postersrc} alt="poster" />}
                </div>
            <div className={cl.item__info}>
            <p className={cl.item__title}>{props.name}</p>
            <p>{props.type}</p>
            <div className={cl.item__rating__wrapper}><Button className={cl.item__rating__button} size="small" variant="outlined" onClick={openModal}>Rate movie</Button><Icon size={1} className={cl.item__icon} path={mdiStar}></Icon>{props.rating > 0 ? <span className={cl.item__rating}>{props.rating}</span> : <span className={cl.item__rating}>N/A</span> }</div>
            <div className={cl.item__buttons__wrapper}>
            <Button size="small" variant="outlined" onClick={getId}  className={cl.item__button}>Details</Button>
            <Button size="small" variant="outlined" color="error" endIcon={<DeleteIcon />} className={cl.item__button} onClick={deleteMovie}>Delete</Button>
            </div>
            </div>
            </div>
            <Modal open={modal} onClose={closeModal}>
                <div className={cl.modal__container}>
                <h2 className={cl.modal__movie}>{props.name}</h2>
                <div className={cl.rating__wrapper}>
                <Rating
                 name="simple-controlled"
                 max={10}
                 size="large"
                 value={+rating}
                 onChange={(event) => setRating(event.target.value)} />
                </div>
                <div><Button variant="outlined" className={cl.modal__button} onClick={rateMovie}>Rate</Button></div>
                </div>
            
            </Modal>
            
            
        </div>
    );
});

export default WatchedItem;