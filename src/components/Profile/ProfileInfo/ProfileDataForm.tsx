import React from "react";
import {createField, Input, Textarea} from "../../common/FormsControls/FormsControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import style from "../../common/FormsControls/FormsControls.module.css";

export type ProfileFormDataType = {
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    aboutMe: string
}

const ProfileDataForm: React.FC<InjectedFormProps<ProfileFormDataType>> = ({handleSubmit,error}) => {
    return <form onSubmit={handleSubmit}>
        <div>
            <button>Save</button>
            {error && <div className={style.formSummaryError}>
                {error}
            </div>}
        </div>
        <div>
            <b>Full name</b>:{createField("Full name", 'fullName', [], Input)}
        </div>
        <div>
            <b>Looking for a job</b>:{createField("", 'lookingForAJob', [], Input, {type: 'checkbox'})}
        </div>
        <div>
            <b>My professional
                skills</b>:{createField("My professional skills", 'lookingForAJobDescription', [], Textarea)}
        </div>
        <div>
            <b>About me</b>:{createField("About me", 'aboutMe', [], Textarea)}
        </div>
    </form>
}

const ProfileDataFormReduxForm = reduxForm<ProfileFormDataType>({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataFormReduxForm