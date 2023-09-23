
import {
    ActionsTypes,
    AddPostActionType,
    ProfilePageType,
    ProfileType,
    setUserProfileType,
    UpdateNewPostTextActionType
} from "./store";
import {log} from "util";

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
    newPostText: '',
    profile: {
        photos: { small: '', large: '' },
    }
}

export type InitialStateType = typeof initialState

const profileReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'ADD-POST': {
            const newPost: PostsType = {
                id: 5,
                message: state.newPostText,
                likesCount: 10
            }
            return {
                ...state,
                newPostText: '',
                posts: [...state.posts, newPost]

            }
        }
        case 'UPDATE-NEW-POST-TEXT': {
            return {
                ...state,
                newPostText: action.newText
            }
        }

        case 'SET_USER_PROFILE': {
            console.log(action.profile)
            return {
                ...state,
                profile:action.profile
            }
        }
        default:
            return state;
    }

}

export const addPostActionCreator = (): AddPostActionType => {
    return {
        type: 'ADD-POST'
    } as const
}

export const onPostChangeActionCreator = (text: string): UpdateNewPostTextActionType => {
    return {
        type: 'UPDATE-NEW-POST-TEXT',
        newText: text
    } as const
}

export const setUserProfileAC = (profile: ProfileType): setUserProfileType => {
    return {
        type: 'SET_USER_PROFILE',
        profile
    } as const
}

export default profileReducer;