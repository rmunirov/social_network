import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './DialogItem.module.scss';

const cn = classNames.bind(styles);
const CLASS_NAME = 'DialogItem';

type DialogItemProps = {
    id: number;
    name: string;
};

const DialogItem: FC<DialogItemProps> = ({ id, name }) => {
    const path = '/dialogs/' + id;
    return (
        <div className={cn(CLASS_NAME, `${CLASS_NAME}__active`)}>
            <img
                className={cn(`${CLASS_NAME}__img`)}
                src="https://w7.pngwing.com/pngs/723/784/png-transparent-anime-ia-vocaloid-anime-face-cg-artwork-black-hair.png"
                alt={'default image'}
            />
            <NavLink to={path} activeClassName={cn(`${CLASS_NAME}__active`)}>
                {name}
            </NavLink>
        </div>
    );
};

export default DialogItem;
