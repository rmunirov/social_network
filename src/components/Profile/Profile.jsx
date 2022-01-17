import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import PostsContainer from './Posts/PostsContainer';
import styles from './ProfileStatus/ProfileStatus.module.scss';

const cn = classNames.bind(styles);
const CLASS_NAME = 'Profile';

const Profile = ({ profile, status, setStatus, updatePhoto, isOwner, updateProfile }) => {
    return (
        <div className={cn(CLASS_NAME)}>
            <ProfileInfo
                profile={profile}
                updatePhoto={updatePhoto}
                isOwner={isOwner}
                status={status}
                setStatus={setStatus}
                updateProfile={updateProfile}
            />
            <PostsContainer />
        </div>
    );
};

Profile.propTypes = {
    profile: PropTypes.object,
    status: PropTypes.string,
    setStatus: PropTypes.func,
    updatePhoto: PropTypes.func,
    isOwner: PropTypes.bool,
    updateProfile: PropTypes.func,
};

export default Profile;
