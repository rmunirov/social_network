import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';
import FriendListContainer from './FriendList/FriendListContainer';

const cn = classNames.bind(styles);
const CLASS_NAME = 'Navbar';

const Navbar: FC = () => {
    return (
        <div>
            <nav className={cn(CLASS_NAME)}>
                <div className={cn(`${CLASS_NAME}__item`)}>
                    <NavLink to="/profile" activeClassName={cn(`${CLASS_NAME}__active`)}>
                        Profile
                    </NavLink>
                </div>

                <div className={cn(`${CLASS_NAME}__item`)}>
                    <NavLink to="/dialogs" activeClassName={cn(`${CLASS_NAME}__active`)}>
                        Messages
                    </NavLink>
                </div>

                <div className={cn(`${CLASS_NAME}__item`)}>
                    <NavLink to="/news" activeClassName={cn(`${CLASS_NAME}__active`)}>
                        News
                    </NavLink>
                </div>

                <div className={cn(`${CLASS_NAME}__item`)}>
                    <NavLink to="/music" activeClassName={cn(`${CLASS_NAME}__active`)}>
                        Music
                    </NavLink>
                </div>

                <div className={cn(`${CLASS_NAME}__item`)}>
                    <NavLink to="/users" activeClassName={cn(`${CLASS_NAME}__active`)}>
                        Find users
                    </NavLink>
                </div>

                <div className={cn(`${CLASS_NAME}__item`)}>
                    <NavLink to="/settings" activeClassName={cn(`${CLASS_NAME}__active`)}>
                        Settings
                    </NavLink>
                </div>
            </nav>

            <FriendListContainer />
        </div>
    );
};

export default Navbar;
