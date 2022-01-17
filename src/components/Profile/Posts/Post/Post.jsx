import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Post.module.scss';

const cn = classNames.bind(styles);
const CLASS_NAME = 'Post';

const Post = (props) => {
    return (
        <div className={cn(CLASS_NAME)}>
            <img
                src="https://w7.pngwing.com/pngs/723/784/png-transparent-anime-ia-vocaloid-anime-face-cg-artwork-black-hair.png"
                alt={'Post image'}
            />
            {props.message}
            <div>
                <span>Like : {props.likeCount}</span>
            </div>
        </div>
    );
};

Post.propTypes = {
    message: PropTypes.string,
    likeCount: PropTypes.number,
};

export default Post;
