import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ProfileStatus.module.scss';

const cn = classNames.bind(styles);
const CLASS_NAME = 'ProfileStatus';

const ProfileStatus = ({ status, setStatus }) => {
    const [editMode, setEditMode] = useState(false);
    const [localStatus, setLocalStatus] = useState(status);

    useEffect(() => {
        setLocalStatus(status);
    }, [status]);

    const activateEditMode = () => {
        setEditMode(true);
    };

    const deactivateEditMode = () => {
        setEditMode(false);
        setStatus(localStatus);
    };

    const onChangeStatus = (e) => {
        setLocalStatus(e.target.value);
    };

    return (
        <div className={cn(CLASS_NAME)}>
            {!editMode && (
                <div>
                    <span className={cn(`${CLASS_NAME}__text`)} onDoubleClick={activateEditMode}>
                        {status || 'Your status is here...'}
                    </span>
                </div>
            )}
            {editMode && (
                <div>
                    <input
                        className={cn(`${CLASS_NAME}__text`)}
                        autoFocus={true}
                        onBlur={deactivateEditMode}
                        value={localStatus}
                        onChange={onChangeStatus}
                    />
                </div>
            )}
        </div>
    );
};

ProfileStatus.propTypes = {
    status: PropTypes.string,
    setStatus: PropTypes.func,
};

export default ProfileStatus;
