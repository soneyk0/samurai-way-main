import {
    ActionsTypes,
    AddPostActionType, deletePostType,
    ProfileType, setStatusType,
    setUserProfileType,
} from "./store";
import {Dispatch} from "redux";
import {profileAPI, usersAPI} from "../api/api";


export type PostsType = {
    id: number,
    message: string,
    likesCount: number
}

let initialState = {
    posts: [
        {id: 1, message: 'hi how are you', likesCount: 0},
        {id: 2, message: 'Its my first post', likesCount: 23},
    ] as Array<PostsType>,
    profile: {
        photos: {small: '', large: ''},
    },
    status: ''
}

export type InitialStateType = typeof initialState

const profileReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'ADD-POST': {
            const newPost: PostsType = {
                id: 5,
                message: action.newPostText,
                likesCount: 10
            }
            return {
                ...state,
                posts: [...state.posts, newPost]

            }
        }

        case 'SET_USER_PROFILE': {
            return {
                ...state,
                profile: action.profile
            }
        }
        case 'SET_STATUS': {
            return {
                ...state, status: action.status
            }
        }
        case 'DELETE_POST': {
            return {
                ...state, posts: state.posts.filter(p => p.id != action.postId)
            }
        }
        default:
            return state;
    }

}

export const addPostActionCreator = (newPostText: string): AddPostActionType => {
    return {
        type: 'ADD-POST',
        newPostText
    } as const
}


export const setUserProfileAC = (profile: ProfileType): setUserProfileType => {
    return {
        type: 'SET_USER_PROFILE',
        profile
    } as const
}

export const setStatusAC = (status: string): setStatusType => {
    return {
        type: 'SET_STATUS',
        status
    } as const
}
export const deletePostAC = (postId: number): deletePostType => {
    return {
        type: 'DELETE_POST',
        postId
    } as const
}

export const getUserProfileTC = (userId: string) => async (dispatch: Dispatch) => {
    let response = await usersAPI.getProfile(userId)
    dispatch(setUserProfileAC(response.data));
}

export const getStatusTC = (userId: string) => async (dispatch: Dispatch) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatusAC(response.data));
}

export const updateStatusTC = (status: string) => async (dispatch: Dispatch) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatusAC(status));
    }
}


export default profileReducer;