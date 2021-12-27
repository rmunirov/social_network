import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Message.module.scss';

const cn = classNames.bind(styles);
const CLASS_NAME = 'Message';

const Message = ({ profileId, myProfileId, message }) => {
    return (
        <div
            className={cn({
                [`${CLASS_NAME}__messageStart`]: profileId !== myProfileId,
                [`${CLASS_NAME}__messageEnd`]: profileId === myProfileId,
            })}
        >
            {message}
        </div>
    );
};

Message.propTypes = {
    profileId: PropTypes.number,
    myProfileId: PropTypes.number,
    message: PropTypes.string,
};

export default Message;
