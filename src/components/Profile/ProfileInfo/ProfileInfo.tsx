import React, {ChangeEvent, useState} from "react";
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import userPhoto from "../../../assets/images/user.png";
import styles from "../../Profile/ProfileInfo/ProfileInfo.module.css"
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import {ProfileModel} from "../../../redux/profile-reducer";
import ProfileDataForm, {ProfileFormDataType} from "./ProfileDataForm";

type ProfileInfoType = {
    profile: ProfileModel
    updateStatus: (status: string) => void
    status: string
    isOwner: boolean
    savePhoto: (photoFile: File) => void
    saveProfile: (profile: ProfileFormDataType) => void

}

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}: ProfileInfoType) => {

    const [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length !== 0) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData: ProfileFormDataType) => {
        saveProfile(formData)
        setEditMode(false)
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.small ? profile.photos.small : userPhoto}
                     className={styles.userPhoto} alt={'avatar'}/>
                {isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}

                {editMode
                    ? <ProfileDataForm initialValues={profile} onSubmit={onSubmit}/>
                    : <ProfileData goToEditMode={() => {
                        setEditMode(true)
                    }} profile={profile} isOwner={isOwner}/>}

                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
            </div>
        </div>
    )
};

export type ProfileDataType = {
    profile: ProfileModel
    isOwner?: boolean
    goToEditMode?: () => void
}

const ProfileData = ({profile, isOwner, goToEditMode}: ProfileDataType) => {
    return <div>
        {isOwner && <div>
            <button onClick={goToEditMode}>Edit</button>
        </div>}
        <div>
            <b>Full name</b>:{profile.fullName}
        </div>
        <div>
            <b>Looking for a job</b>:{profile.lookingForAJob ? 'Yes' : 'No'}
        </div>
        {profile.lookingForAJob &&
            <div>
                <b>My professional skills</b>:{profile.lookingForAJobDescription}
            </div>
        }
        <div>
            <b>About me</b>:{profile.aboutMe}
        </div>
    </div>
}

export default ProfileInfo;