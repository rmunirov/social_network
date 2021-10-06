import React from 'react'
import styles from './Header.module.css'
import {NavLink} from "react-router-dom";

const Header = ({isAuth, login, logout}) => {
    return (
        <header className={styles.header}>
            <div className={styles.header_photo}>
                <img src='https://i.pinimg.com/originals/26/a2/0a/26a20a99d83cf280fe907a14674c1ad6.png'
                     alt={"Header icon"}/>
            </div>
            <div className={styles.header_login}>
                {isAuth ?
                    <div>{login} -
                        <button onClick={logout}>Logout</button>
                    </div> :
                    <NavLink to='/Login'>Login</NavLink>}
            </div>
        </header>
    );
}

export default Header;
