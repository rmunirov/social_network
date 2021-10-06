import React from 'react'
import styles from './Post.module.css'

const Post = (props) => {
    return (
        <div className={styles.item}>
            <img
                src='https://w7.pngwing.com/pngs/723/784/png-transparent-anime-ia-vocaloid-anime-face-cg-artwork-black-hair.png'/>
            {props.message}
            <div>
                <span>Like : {props.likeCount}</span>
            </div>
        </div>
    );
}

export default Post;
