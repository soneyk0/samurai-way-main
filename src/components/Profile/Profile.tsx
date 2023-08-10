import React from "react";
import s from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";


type ProfileType = {
    // posts:Array<PostsType>
    // newPostText:string
    // dispatch: (action:ActionsTypes)=>void
    // addPost:()=>void
    // updateNewPostText:(newText: string)=>void

}

const Profile = (props: ProfileType) => {


    return (<div>
            <ProfileInfo/>
            <MyPostsContainer/>
        </div>
    )
};

export default Profile;