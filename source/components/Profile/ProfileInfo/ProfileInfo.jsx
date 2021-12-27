import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import userPhoto from '../../../assets/image/user.png';
import ProfileStatus from '../ProfileStatus/ProfileStatus';
import { required } from '../../../utils/validators/validators';
import { Input, TextArea } from '../../common/FormControls/FormControls';
import styles from './ProfileInfo.module.scss';

const cn = classNames.bind(styles);
const CLASS_NAME = 'ProfileInfo';

const ProfileInfo = ({ profile, updatePhoto, isOwner, status, setStatus, updateProfile }) => {
    const [editMode, setEditMode] = useState(false);

    const activateEditMode = () => {
        setEditMode(true);
    };

    const deactivateEditMode = async (formData) => {
        const message = await updateProfile(formData);
        if (message === undefined) {
            setEditMode(false);
        }
        return { [FORM_ERROR]: message };
    };

    return (
        <div>
            {!editMode && (
                <div>
                    <ProfileInfoData
                        profile={profile}
                        status={status}
                        setStatus={setStatus}
                        isOwner={isOwner}
                        updatePhoto={updatePhoto}
                        activateEditMode={activateEditMode}
                    />
                </div>
            )}
            {editMode && (
                <div>
                    <ProfileReduxForm
                        onSubmit={deactivateEditMode}
                        initialData={profile}
                        profile={profile}
                    />
                </div>
            )}
        </div>
    );
};

ProfileInfo.propTypes = {
    profile: PropTypes.object,
    updatePhoto: PropTypes.func,
    isOwner: PropTypes.bool,
    status: PropTypes.string,
    setStatus: PropTypes.func,
    updateProfile: PropTypes.func,
};

const ProfileReduxForm = ({ onSubmit, initialData, profile }) => {
    return (
        <Form
            onSubmit={onSubmit}
            initialValues={initialData}
            render={({ submitError, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <div>
                        <Field
                            name="fullName"
                            validate={required}
                            component={Input}
                            placeholder="My name is..."
                        />
                    </div>
                    {submitError && <div>{submitError}</div>}
                    <div>
                        <b>About me</b>{' '}
                        <Field name="aboutMe" component={TextArea} placeholder="Info about me..." />
                    </div>
                    <div>
                        <b>Looking for a job</b>
                        <Field name="lookingForAJob" component={Input} type="checkbox" />
                    </div>
                    <div>
                        <b>My professional skills</b>
                        <Field
                            name="lookingForAJobDescription"
                            component={TextArea}
                            placeholder="Enter a your skills..."
                        />
                    </div>
                    <b>Contacts:</b>
                    <div>
                        {Object.keys(profile.contacts).map((key) => {
                            const name = 'contacts.' + key;
                            return (
                                <div key={key}>
                                    <b>{key}:</b>
                                    <Field key={key} name={name} component={Input} />
                                </div>
                            );
                        })}
                    </div>
                    <div>
                        <button type="submit">Save</button>
                    </div>
                </form>
            )}
        />
    );
};

ProfileReduxForm.propTypes = {
    onSubmit: PropTypes.func,
    initialData: PropTypes.object,
    profile: PropTypes.object,
};

const ProfileInfoData = ({
    profile,
    updatePhoto,
    isOwner,
    status,
    setStatus,
    activateEditMode,
}) => {
    if (!profile) {
        return <div />;
    }

    return (
        <div className={cn(CLASS_NAME)}>
            <ProfilePhoto profile={profile} updatePhoto={updatePhoto} isOwner={isOwner} />
            <div className={cn(`${CLASS_NAME}__description`)}>
                <ProfileFullName profile={profile} />
                <ProfileStatus status={status} setStatus={setStatus} />
                <hr />
                <ProfileDescription profile={profile} status={status} setStatus={setStatus} />
                <hr />
                <ProfileContacts profile={profile} />
                {isOwner && <button onClick={activateEditMode}>Edit</button>}
            </div>
        </div>
    );
};

ProfileInfoData.propTypes = {
    profile: PropTypes.object,
    updatePhoto: PropTypes.func,
    isOwner: PropTypes.bool,
    status: PropTypes.string,
    setStatus: PropTypes.func,
    activateEditMode: PropTypes.func,
};

const ProfilePhoto = ({ profile, updatePhoto, isOwner }) => {
    const onChangePhoto = (event) => {
        if (event.target.files.length) {
            updatePhoto(event.target.files[0]);
        }
    };
    const imageUrl = profile.photos.large === null ? userPhoto : profile.photos.large;

    return (
        <div className={cn(`${CLASS_NAME}__photo`)}>
            <div
                className={cn(`${CLASS_NAME}__photo__image`)}
                style={{ backgroundImage: `url(${imageUrl})` }}
            />
            <div className={cn(`${CLASS_NAME}__photo__button`)}>
                {isOwner && <input type={'file'} onChange={onChangePhoto} />}
            </div>
        </div>
    );
};

ProfilePhoto.propTypes = {
    profile: PropTypes.object,
    updatePhoto: PropTypes.func,
    isOwner: PropTypes.bool,
};

const ProfileFullName = ({ profile }) => {
    return <div className={cn(`${CLASS_NAME}__description__name`)}>{profile.fullName}</div>;
};

ProfileFullName.propTypes = {
    profile: PropTypes.object,
};

const ProfileContact = ({ title, value }) => {
    return (
        <div>
            <b>{title}: </b>
            <span>{value}</span>
        </div>
    );
};

ProfileContact.propTypes = {
    title: PropTypes.string,
    value: PropTypes.string,
};

const ProfileContacts = ({ profile }) => {
    return (
        <div className={cn(`${CLASS_NAME}__description__contacts`)}>
            {Object.keys(profile.contacts).map((key) => {
                return <ProfileContact key={key} title={key} value={profile.contacts[key]} />;
            })}
        </div>
    );
};

ProfileContacts.propTypes = {
    profile: PropTypes.object,
};

const ProfileDescription = ({ profile }) => {
    return (
        <div>
            <div className={cn(`${CLASS_NAME}__description__about`)}>
                <b>About me: </b> {profile.aboutMe === null ? 'Info about me...' : profile.aboutMe}
            </div>

            <div className={cn(`${CLASS_NAME}__description__lookingJob`)}>
                <b>Looking for a job: </b> {profile.lookingForAJob ? 'yes' : 'no'}
            </div>

            <div className={cn(`${CLASS_NAME}__description__lookingJobDescription`)}>
                {profile.lookingForAJobDescription === null ? null : (
                    <div>
                        <b>My professional skills: </b>
                        {profile.lookingForAJobDescription}
                    </div>
                )}
            </div>
        </div>
    );
};

ProfileDescription.propTypes = {
    profile: PropTypes.object,
};

export default ProfileInfo;
