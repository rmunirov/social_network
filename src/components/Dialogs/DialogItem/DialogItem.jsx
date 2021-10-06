import React from 'react'
import styles from './DialogItem.module.css'
import {NavLink} from "react-router-dom";

const DialogItem = (props) => {
    const path = '/dialogs/' + props.id;
    return (
        <div className={`${styles.item} ${styles.active}`}>
            <img
                src='https://w7.pngwing.com/pngs/723/784/png-transparent-anime-ia-vocaloid-anime-face-cg-artwork-black-hair.png'/>
            <NavLink to={path} activeClassName={styles.active}>
                {props.name}
            </NavLink>
        </div>
    );
}

export default DialogItem;
