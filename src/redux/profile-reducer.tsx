import {
    ActionsTypes,
    AddPostActionType, deletePostType, savePhotoType, setStatusType,
    setUserProfileType, StateType,
} from "./store";
import {Dispatch} from "redux";
import {profileAPI, usersAPI} from "../api/api";
import {v1} from "uuid";
import {ProfileFormDataType} from "../components/Profile/ProfileInfo/ProfileDataForm";
import {ThunkDispatch} from "redux-thunk";
import {AppRootStateType} from "./redux-store";
import {FormAction} from "redux-form/lib/actions";
import {stopSubmit} from "redux-form";


export class PostModel {
    id: string = v1()
    message: string
    likesCount: number

    constructor(message: string, likesCount: number) {
        this.message = message
        this.likesCount = likesCount
    }
}

export class PhotoType {
    small: string = ''
    large: string = ''
}

export class ContactType {
    github: string = ''
    vk: string = ''
    facebook: string = ''
    instagram: string = ''
}

export class ProfileModel {
    photos = new PhotoType()
    fullName: string = ''
    lookingForAJob: boolean = false
    lookingForAJobDescription: string = ''
    aboutMe: string = ''
    contacts = [new ContactType()]
}

export class ProfileReducerState {
    posts = [
        new PostModel('hi how are you', 0),
        new PostModel('Its my first post', 10)
    ]
    profile = new ProfileModel()
    status = ''
}

const initialState = new ProfileReducerState();

const profileReducer = (state: ProfileReducerState = initialState, action: ActionsTypes): ProfileReducerState => {
    switch (action.type) {
        case 'ADD-POST': {
            return {
                ...state,
                posts: [...state.posts, new PostModel(action.newPostText, 10)]

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
        case 'SAVE_PHOTO_SUCCESS': {
            return {
                ...state, profile: {...state.profile, photos: action.photos}
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


export const setUserProfileAC = (profile: ProfileModel): setUserProfileType => {
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
export const deletePostAC = (postId: string): deletePostType => {
    return {
        type: 'DELETE_POST',
        postId
    } as const
}

export const savePhotoAC = (photos: { small: '', large: '' }): savePhotoType => {
    return {
        type: 'SAVE_PHOTO_SUCCESS',
        photos
    } as const
}

export const getUserProfileTC = (userId: string) => async (dispatch: Dispatch) => {
    let {data} = await usersAPI.getProfile(userId)
    dispatch(setUserProfileAC(data));
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

export const savePhotoTC = (file: File) => async (dispatch: Dispatch) => {
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoAC(response.data.data.photos));
    }
}

export const saveProfileTC = (profile: ProfileFormDataType) => async (dispatch: ThunkDispatch<AppRootStateType, unknown, FormAction>, getState: () => any) => {
    const userId = getState().auth.id
    console.log(userId)
    let response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0) {
        await dispatch(getUserProfileTC(userId))
    } else {
        dispatch(stopSubmit('edit-profile', {_error: response.data.message[0]}) as FormAction)
    }
}


export default profileReducer;