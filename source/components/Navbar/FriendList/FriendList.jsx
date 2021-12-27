import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './FriendList.module.scss';

const cn = classNames.bind(styles);
const CLASS_NAME = 'FriendList';

const FriendList = ({ friendList }) => {
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

FriendList.propTypes = {
    friendList: PropTypes.array,
};

export default FriendList;
