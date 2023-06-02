import React from "react";
import cl from './EmptyItem.module.css'
const EmptyItem = (props) => {
    
    return (
            <p className={cl.item__text}>Start searching!</p>
    );
};

export default EmptyItem;