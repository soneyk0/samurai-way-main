import React from "react";
import {addPostActionCreator, PostModel, ProfileReducerState} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {AppRootStateType} from "../../../redux/redux-store";
import {Dispatch} from "redux";


type MapStatePropsType = ProfileReducerState


type MapDispatchPropsType = {
    addPost: (newPostText:string) => void
}


const mapStateToProps = (state: AppRootStateType): MapStatePropsType => {
    return {
        posts: state.profileReducer.posts,
        profile: state.profileReducer.profile,
        status: state.profileReducer.status
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        addPost: (newPostText:string) => {
            dispatch(addPostActionCreator(newPostText));
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer