import React from "react";
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import {ProfileType} from "../../../redux/store";
import userPhoto from "../../../assets/images/user.png";
import styles from "../../Profile/ProfileInfo/ProfileInfo.module.css"
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

type ProfileInfoType = {
    profile: ProfileType
    updateStatus: (status: string) => void
    status: string

}

const ProfileInfo = ({profile, status, updateStatus}: ProfileInfoType) => {
    if (!profile) {
        return <Preloader/>
    }

    console.log(profile.photos)
    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.small ? profile.photos.small : userPhoto}
                     className={styles.userPhoto} alt={'avatar'}/>
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
            </div>
        </div>
    )
};

export default ProfileInfo;