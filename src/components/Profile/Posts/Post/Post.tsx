import React, { FC } from 'react';
import classNames from 'classnames/bind';
import styles from './Post.module.scss';

const cn = classNames.bind(styles);
const CLASS_NAME = 'Post';

type Props = {
    message: string;
    likeCount: number;
};

const Post: FC<Props> = ({ message, likeCount }) => {
    return (
        <div className={cn(CLASS_NAME)}>
            <img
                src="https://w7.pngwing.com/pngs/723/784/png-transparent-anime-ia-vocaloid-anime-face-cg-artwork-black-hair.png"
                alt={'Post image'}
            />
            {message}
            <div>
                <span>Like : {likeCount}</span>
            </div>
        </div>
    );
};

export default Post;
