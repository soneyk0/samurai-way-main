import React from "react";
import s from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ActionsTypes, PostsType} from "../../redux/State";


type ProfileType={
    posts:Array<PostsType>
    newPostText:string
    dispatch: (action:ActionsTypes)=>void
    // addPost:()=>void
    // updateNewPostText:(newText: string)=>void

}

const Profile = ({newPostText,posts,dispatch}:ProfileType) => {



    return (<div>
            <ProfileInfo/>
            <MyPosts posts={posts}
                     newPostText={newPostText}
                     dispatch={dispatch}
            />
        </div>
    )
};

export default Profile;