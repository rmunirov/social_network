import React from 'react';
import PropTypes from 'prop-types';
import Paginator from '../common/Paginator/Paginator';
import styles from './Users.module.scss';
import UserItem from './UserItem/UserItem';

const Users = ({
    totalCount,
    pageSize,
    currentPage,
    onPageChanged,
    users,
    follow,
    doNotFollow,
    followingProgress,
}) => {
    return (
        <div>
            <Paginator
                totalCount={totalCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChanged={onPageChanged}
            />

            <div className={styles.users}>
                {users.map((user) => (
                    <UserItem
                        key={user.id}
                        user={user}
                        follow={follow}
                        doNotFollow={doNotFollow}
                        followingProgress={followingProgress}
                    />
                ))}
            </div>
        </div>
    );
};

Users.propTypes = {
    totalCount: PropTypes.number,
    pageSize: PropTypes.number,
    currentPage: PropTypes.number,
    onPageChanged: PropTypes.func,
    users: PropTypes.array,
    doNotFollow: PropTypes.func,
    follow: PropTypes.func,
    followingProgress: PropTypes.array,
};

export default Users;
