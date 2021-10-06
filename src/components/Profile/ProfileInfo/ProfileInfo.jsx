import React from 'react'
import styles from './ProfileInfo.module.css'
import jobIcon from '../../../assets/image/job_search.svg'
import userPhoto from '../../../assets/image/user.png'

const ProfileInfo = ({profile}) => {
    if (!profile) {
        return <div/>
    }
    return (
        <div className={styles.profile}>
            <div className={`${styles.profile_photo} imageUrl`}>
                <style jsx>{`
                  .imageUrl {
                    background-image: url(${profile.photos.large === null ? userPhoto : profile.photos.large});
                  }
                `}</style>
            </div>
            <div className={styles.description}>
                <div>
                    <div className={styles.description_name}>
                        {profile.fullName}
                    </div>

                    <div className={styles.description_about}>
                        {profile.aboutMe}
                    </div>

                    <div className={styles.description_looking_job}>
                        {profile.lookingForAJob ? <img src={jobIcon} alt={"job icon"}/> : null}
                    </div>

                    <div className={styles.description_looking_job_desc}>
                        {
                            profile.lookingForAJobDescription === null ? null : "I want to job in -" + profile.lookingForAJobDescription
                        }
                    </div>
                </div>
                <div className={styles.description_contacts}>

                </div>
            </div>
        </div>
    );
}

export default ProfileInfo;
