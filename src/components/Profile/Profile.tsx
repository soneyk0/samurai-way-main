import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileModel} from "../../redux/profile-reducer";



type ProfileTypePage = {
    profile: ProfileModel
    updateStatus: (status: string) => void
    status: string
    isOwner: boolean
    savePhoto: (photoFile: File) => void

}

const Profile = (props: ProfileTypePage) => {

    return (<div>
            <ProfileInfo
                profile={props.profile}
                updateStatus={props.updateStatus}
                status={props.status}
                isOwner={props.isOwner}
                savePhoto={props.savePhoto}/>
            <MyPostsContainer/>
        </div>
    )
};

export default Profile;