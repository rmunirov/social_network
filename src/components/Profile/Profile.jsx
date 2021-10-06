import React from 'react'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import PostsContainer from "./Posts/PostsContainer";
import ProfileStatus from "./ProfileStatus/ProfileStatus";

const Profile = ({profile, status, setStatus, getStatus}) => {
    return (
        <div>
            <ProfileInfo profile={profile}/>
            <ProfileStatus status={status} setStatus={setStatus} getStatus={getStatus}/>
            <PostsContainer/>
        </div>
    );
}

export default Profile;
