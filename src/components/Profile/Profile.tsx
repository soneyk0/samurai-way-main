import React from "react";
import s from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {PostsType} from "../../redux/State";


type ProfileType={
    addPost:()=>void
    posts:Array<PostsType>
    newPostText:string
    updateNewPostText:(newText: string)=>void

}

const Profile = ({updateNewPostText,newPostText,posts,addPost}:ProfileType) => {



    return (<div>
            <ProfileInfo/>
            <MyPosts posts={posts}
                     addPost={addPost}
                     newPostText={newPostText}
                     updateNewPostText={updateNewPostText}
            />
        </div>
    )
};

export default Profile;