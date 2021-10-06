import React from 'react'
import styles from './FriendList.module.css'

const FriendList = ({friendList}) => {
    return (
        <div className={styles.list}>
            <h3>
                My Friend
            </h3>
            <div>
                {friendList.map(item => <div key={item.id}>{item.name}</div>)}
            </div>
        </div>
    );
}


export default FriendList;
