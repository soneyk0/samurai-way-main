import React, {ChangeEvent, useState} from "react";
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import userPhoto from "../../../assets/images/user.png";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import {ProfileModel} from "../../../redux/profile-reducer";
import ProfileDataForm, {ProfileFormDataType} from "./ProfileDataForm";
import AppButton from "../../common/Button/AppButton";

export type ProfileInfoType = {
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
                <div className={s.photoBlock}>
                    <img src={profile.photos.large ? profile.photos.large : userPhoto}
                         className={s.userPhoto} alt={'avatar'}/>
                    {isOwner && <>
                        <label htmlFor="inputFile" className={s.inputFileButton}>
                            <AppButton title={'Add file'}></AppButton>
                            <input
                                name="file"
                                type="file"
                                id="inputFile"
                                style={{display: "none"}}
                                onChange={onMainPhotoSelected}
                            />
                        </label>

                    </>}
                </div>

                <div className={s.profileBlock}>
                    <div className={s.statusBlock}>
                        <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                    </div>
                    {editMode
                        ? <ProfileDataForm initialValues={profile} onSubmit={onSubmit}/>
                        : <ProfileData goToEditMode={() => {
                            setEditMode(true)
                        }} profile={profile} isOwner={isOwner}/>}
                </div>

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
        <div className={s.profileData}>
            <b>Full name</b>: <span>{profile.fullName}</span>
        </div>
        <div className={s.profileData}>
            <b>Looking for a job</b>: <span>{profile.lookingForAJob ? 'Yes' : 'No'}</span>
        </div>
        {profile.lookingForAJob &&
            <div className={s.profileData}>
                <b>My professional skills</b>: <span>{profile.lookingForAJobDescription}</span>
            </div>
        }
        <div className={s.profileData}>
            <b>About me</b>: <span>{profile.aboutMe}</span>
        </div>
        {isOwner && <div className={s.buttonEdit}>
            <AppButton title={'Edit'} clickCallback={goToEditMode}/>
        </div>}
    </div>
}

export default ProfileInfo;