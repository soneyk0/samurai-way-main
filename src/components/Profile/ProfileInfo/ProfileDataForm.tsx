import React from "react";
import {createField, Input, Textarea} from "../../common/FormsControls/FormsControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import style from "../../common/FormsControls/FormsControls.module.css";
import s from "./ProfileDataForm.module.css";
import {Abc} from "@mui/icons-material";
import AppButton from "../../common/Button/AppButton";

export type ProfileFormDataType = {
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    aboutMe: string
}

const ProfileDataForm: React.FC<InjectedFormProps<ProfileFormDataType>> = ({handleSubmit,error}) => {
    return <form onSubmit={handleSubmit}>
        <div>
            {error && <div className={style.formSummaryError}>
                {error}
            </div>}
        </div>
        <div className={s.profileEditData}>
            <b className={s.filterName}>Full name</b>: <>{createField("Full name", 'fullName', [], Input)}</>
        </div>
        <div className={s.profileEditData}>
            <b>Looking for a job</b>:<span className={s.checkboxItem}>{createField("", 'lookingForAJob', [], Input, {type: 'checkbox'})}</span>
        </div>
        <div className={s.profileEditData}>
            <b>My professional
                skills</b>:{createField("My professional skills", 'lookingForAJobDescription', [], Textarea)}
        </div>
        <div className={s.profileEditData}>
            <b>About me</b>:{createField("About me", 'aboutMe', [], Textarea)}
        </div>
        <div className={s.buttonSave}></div>
        <AppButton title={'Save'}/>
    </form>
}

const ProfileDataFormReduxForm = reduxForm<ProfileFormDataType>({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataFormReduxForm