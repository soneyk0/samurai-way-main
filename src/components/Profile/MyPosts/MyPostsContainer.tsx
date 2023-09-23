import React, {useRef} from "react";
import {addPostActionCreator, onPostChangeActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {InitialStateType} from "../../../redux/profile-reducer";
import {AppRootStateType} from "../../../redux/redux-store";
import {Dispatch} from "redux";

type MyPostsType = {
    // posts: Array<PostsType>
    // newPostText: string
    // dispatch: (action: ActionsTypes) => void
    // addPost:()=>void
    // updateNewPostText:(newText: string)=>void

}

type MapStatePropsType = InitialStateType


type MapDispatchPropsType = {
    updateNewPostText: (text: string) => void,
    addPost: () => void
}


const mapStateToProps = (state: AppRootStateType): MapStatePropsType => {
    return {
        posts: state.profileReducer.posts,
        newPostText: state.profileReducer.newPostText,
        profile: state.profileReducer.profile
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