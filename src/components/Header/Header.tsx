import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const cn = classNames.bind(styles);
const CLASS_NAME = 'Header';

type HeaderProps = {
    isAuth: boolean;
    login: string;
    logout: () => void;
};

const Header: FC<HeaderProps> = ({ isAuth, login, logout }) => {
    return (
        <header className={cn(CLASS_NAME)}>
            <div className={cn(`${CLASS_NAME}__photo`)}>
                <img
                    src="https://i.pinimg.com/originals/26/a2/0a/26a20a99d83cf280fe907a14674c1ad6.png"
                    alt={'Header icon'}
                />
            </div>
            <div className={cn(`${CLASS_NAME}__login`)}>
                {isAuth ? (
                    <div>
                        {login} -<button onClick={logout}>Logout</button>
                    </div>
                ) : (
                    <NavLink to="/Login">Login</NavLink>
                )}
            </div>
        </header>
    );
};

export default Header;
