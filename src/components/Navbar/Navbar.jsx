import React from 'react'
import styles from './Navbar.module.css'
import {NavLink} from "react-router-dom";
import FriendListContainer from "./FriendList/FriendListContainer";

const Navbar = (props) => {
    return (
        <div>
            <nav className={styles.nav}>
                <div className={`${styles.item} ${styles.active}`}>
                    <NavLink to='/profile' activeClassName={styles.active}>Profile</NavLink>
                </div>

                <div className={styles.item}>
                    <NavLink to='/dialogs' activeClassName={styles.active}>Messages</NavLink>
                </div>

                <div className={styles.item}>
                    <NavLink to='/news' activeClassName={styles.active}>News</NavLink>
                </div>

                <div className={styles.item}>
                    <NavLink to='/music' activeClassName={styles.active}>Music</NavLink>
                </div>

                <div className={styles.item}>
                    <NavLink to='/users' activeClassName={styles.active}>Find users</NavLink>
                </div>

                <div className={styles.item}>
                    <NavLink to='/settings' activeClassName={styles.active}>Settings</NavLink>
                </div>
            </nav>

            <FriendListContainer/>
        </div>
    );
}

export default Navbar;
