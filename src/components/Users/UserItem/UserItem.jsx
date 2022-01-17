import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import userPhoto from '../../../assets/image/user.png';
import styles from './UserItem.module.scss';

const cn = classNames.bind(styles);
const CLASS_NAME = 'UserItem';

const UserItem = ({ user, doNotFollow, follow, followingProgress }) => {
    const imgUrl = user.photos.small === null ? userPhoto : user.photos.small;
    return (
        <div className={cn(CLASS_NAME)}>
            <div className={cn(`${CLASS_NAME}__avatar`)}>
                <NavLink to={'/profile/' + user.id}>
                    <img src={imgUrl} alt={'user photo'} />
                </NavLink>
                <div>
                    {user.followed ? (
                        <button
                            disabled={followingProgress.some((id) => id === user.id)}
                            onClick={() => {
                                doNotFollow(user.id);
                            }}
                        >
                            Not follow
                        </button>
                    ) : (
                        <button
                            disabled={followingProgress.some((id) => id === user.id)}
                            onClick={() => {
                                follow(user.id);
                            }}
                        >
                            Follow
                        </button>
                    )}
                </div>
            </div>
            <div className={cn(`${CLASS_NAME}__info`)}>
                <div className={cn(`${CLASS_NAME}__info__left`)}>
                    <div className={cn(`${CLASS_NAME}__info__left__name`)}>{user.name}</div>
                    <div className={cn(`${CLASS_NAME}__info__left__status`)}>{user.status}</div>
                </div>
                <div className={cn(`${CLASS_NAME}__info__right`)}>
                    <div className={cn(`${CLASS_NAME}__info__right__country`)}>
                        {'props.user.location.country'},
                    </div>
                    <div className={cn(`${CLASS_NAME}__info__right__city`)}>
                        {'props.user.location.city'}
                    </div>
                </div>
            </div>
        </div>
    );
};

UserItem.propTypes = {
    user: PropTypes.object,
    doNotFollow: PropTypes.func,
    follow: PropTypes.func,
    followingProgress: PropTypes.array,
};

export default UserItem;
