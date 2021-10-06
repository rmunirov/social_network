import React from "react";
import styles from './UserItem.module.css'
import userPhoto from '../../../assets/image/user.png'
import {NavLink} from "react-router-dom";

const UserItem = ({user, doNotFollow, follow, followingProgress}) => {
    return (
        <div className={styles.item}>
            <div className={styles.item_avatar}>
                <NavLink to={'/profile/' + user.id}>
                    <div className={`${styles.item_avatar_img} imageUrl`}>
                        <style jsx>{`
                          .imageUrl {
                            background-image: url(${user.photos.small === null ? userPhoto : user.photos.small});
                          }
                        `}</style>
                    </div>
                </NavLink>
                <div className={styles.item_avatar_button}>
                    {
                        user.followed ?
                            <button disabled={followingProgress.some(id => id === user.id)}
                                    onClick={() => {
                                        doNotFollow(user.id);
                                    }}>
                                Not follow
                            </button> :
                            <button disabled={followingProgress.some(id => id === user.id)}
                                    onClick={() => {
                                        follow(user.id);
                                    }}>
                                Follow
                            </button>
                    }
                </div>
            </div>
            <div className={styles.item_info}>
                <div className={styles.item_info_left}>
                    <div className={styles.item_info_left_name}>
                        {user.name}
                    </div>
                    <div className={styles.item_info_left_status}>
                        {user.status}
                    </div>
                </div>
                <div className={styles.item_info_right}>
                    <div className={styles.item_info_right_country}>
                        {"props.user.location.country"},
                    </div>
                    <div className={styles.item_info_right_city}>
                        {"props.user.location.city"}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserItem;
