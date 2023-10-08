import React from "react";
import {addPostActionCreator, onPostChangeActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {InitialStateType} from "../../../redux/profile-reducer";
import {AppRootStateType} from "../../../redux/redux-store";
import {Dispatch} from "redux";


type MapStatePropsType = InitialStateType


type MapDispatchPropsType = {
    updateNewPostText: (text: string) => void,
    addPost: () => void
}


const mapStateToProps = (state: AppRootStateType): MapStatePropsType => {
    return {
        posts: state.profileReducer.posts,
        newPostText: state.profileReducer.newPostText,
        profile: state.profileReducer.profile,
        status: state.profileReducer.status
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        updateNewPostText: (text: string) => {
            let action = onPostChangeActionCreator(text)
            dispatch(action);
        },
        addPost: () => {
            dispatch(addPostActionCreator());
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer