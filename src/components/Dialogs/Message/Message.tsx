import React, { FC } from 'react';
import classNames from 'classnames/bind';
import styles from './Message.module.scss';

const cn = classNames.bind(styles);
const CLASS_NAME = 'Message';

type TMessageProps = {
    profileId: number;
    myProfileId: number;
    message: string;
};

const Message: FC<TMessageProps> = ({ profileId, myProfileId, message }) => {
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

export default Message;
