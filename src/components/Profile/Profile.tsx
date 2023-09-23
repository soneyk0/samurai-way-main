import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../redux/store";


type ProfileTypePage = {
    profile: ProfileType
    
}

const Profile = (props: ProfileTypePage) => {

    return (<div>
            <ProfileInfo profile={props.profile}/>
            <MyPostsContainer/>
        </div>
    )
};

export default Profile;