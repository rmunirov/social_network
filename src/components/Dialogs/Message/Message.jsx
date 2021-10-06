import React from 'react'
import styles from './Message.module.css'

const Message = ({profileId, myProfileId, message}) => {
    return (
        <div className={profileId === myProfileId? styles.message_end : styles.message_start}>
            {message}
        </div>
    );
}

export default Message;
