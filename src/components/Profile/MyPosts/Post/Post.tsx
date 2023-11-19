import React from "react";
import s from './Post.module.css'
import {PostModel, ProfileModel} from "../../../../redux/profile-reducer";

interface PostProps extends PostModel{
    profile:ProfileModel
}

const Post = ({message, likesCount,profile}:PostProps,) => {
    return (
        <div>
            <div className={s.item}>
                <img src={profile.photos.small} alt={''}/>
                {message}
                <div><span>like {likesCount}</span></div>
            </div>
        </div>
    )
}

export default Post