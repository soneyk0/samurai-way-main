import React from "react";
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import {ProfileType} from "../../../redux/store";
import userPhoto from "../../../assets/images/user.png";
import styles from "../../Profile/ProfileInfo/ProfileInfo.module.css"
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

type ProfileInfoType = {
    profile: ProfileType
    updateStatus:(status: string)=>void
    status:string

}

const ProfileInfo = (props: ProfileInfoType) => {
    if (!props.profile) {
        return <Preloader/>
    }

    console.log(props.profile.photos)
    return (
        <div>
            {/*<div>*/}
            {/*    <img*/}
            {/*        src="https://www.mirf.ru/wp-content/uploads/2022/02/1522977132_128_0_7374_4076_1920x0_80_0_0_04ec5fd1abe7f78c95e028c368cc1e7c.jpg"*/}
            {/*        alt="" className={s.content}/>*/}
            {/*</div>*/}
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.small ? props.profile.photos.small : userPhoto}
                     className={styles.userPhoto} alt={'avatar'}/>
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
            </div>
        </div>
    )
};

export default ProfileInfo;