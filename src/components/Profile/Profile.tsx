import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../redux/store";


type ProfileTypePage = {
    profile: ProfileType
    updateStatus:(status: string)=>void
    status:string
    
}

const Profile = (props: ProfileTypePage) => {

    return (<div>
            <ProfileInfo profile={props.profile} updateStatus={props.updateStatus} status={props.status}/>
            <MyPostsContainer/>
        </div>
    )
};

export default Profile;