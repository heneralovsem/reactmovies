import React from "react";
import cl from './EmptyListItem.module.css'
const EmptyListItem = (props) => {
    
    return (
            <p className={cl.item__text}>This list is empty</p>
    );
};

export default EmptyListItem;