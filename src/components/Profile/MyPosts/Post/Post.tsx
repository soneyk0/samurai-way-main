import React from "react";
import s from './Post.module.css'
import {PostModel, ProfileModel} from "../../../../redux/profile-reducer";
import userPhoto from "../../../../assets/images/user.png";

interface PostProps extends PostModel{
    profile:ProfileModel
}

const Post = ({message,profile}:PostProps,) => {
    return (
        <div>
            <div className={s.item}>
                <img src={profile.photos.small ? profile.photos.small : userPhoto} alt={''}/>
                {message}
            </div>
        </div>
    )
}

export default Post