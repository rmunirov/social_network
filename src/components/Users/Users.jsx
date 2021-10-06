import React from "react";
import styles from './Users.module.css'
import UserItem from "./UserItem/UserItem";
import Paginator from "../common/Paginator/Paginator";

const Users = ({totalCount, pageSize, currentPage, onPageChanged, users, follow, doNotFollow, followingProgress}) => {
    return (
        <div>
            <Paginator totalCount={totalCount}
                       pageSize={pageSize}
                       currentPage={currentPage}
                       onPageChanged={onPageChanged}/>

            <div className={styles.users}>
                {users.map(user => <UserItem key={user.id}
                                             user={user}
                                             follow={follow}
                                             doNotFollow={doNotFollow}
                                             followingProgress={followingProgress}
                />)}
            </div>
        </div>
    )
}

export default Users;
