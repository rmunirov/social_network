import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './DialogItem.module.scss';

const cn = classNames.bind(styles);
const CLASS_NAME = 'DialogItem';

const DialogItem = (props) => {
    const path = '/dialogs/' + props.id;
    return (
        <div className={cn(CLASS_NAME, `${CLASS_NAME}__active`)}>
            <img
                className={cn(`${CLASS_NAME}__img`)}
                src="https://w7.pngwing.com/pngs/723/784/png-transparent-anime-ia-vocaloid-anime-face-cg-artwork-black-hair.png"
                alt={'default image'}
            />
            <NavLink to={path} activeClassName={cn(`${CLASS_NAME}__active`)}>
                {props.name}
            </NavLink>
        </div>
    );
};

DialogItem.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
};

export default DialogItem;
