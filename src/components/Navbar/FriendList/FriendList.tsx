import React, { FC } from 'react';
import classNames from 'classnames/bind';
import { TFriend } from '../../../types/types';
import styles from './FriendList.module.scss';

const cn = classNames.bind(styles);
const CLASS_NAME = 'FriendList';

type Props = {
    friendList: Array<TFriend>;
};

const FriendList: FC<Props> = ({ friendList }) => {
    return (
        <div className={cn(`${CLASS_NAME}__list`)}>
            <h3>My Friend</h3>
            <div>
                {friendList.map((item) => (
                    <div key={item.id} className={cn(`${CLASS_NAME}__item`)}>
                        <a>{item.name}</a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FriendList;
