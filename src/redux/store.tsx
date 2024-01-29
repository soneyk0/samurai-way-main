import profileReducer, {PostModel, ProfileModel} from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";

export type DialogsType = {
    id: number,
    name: string
}

export type PostsMessages = {
    id: number,
    message: string
}

export type DialogPageType = {
    dialogs: Array<DialogsType>
    messages: Array<PostsMessages>
}



export type ActionsTypes =
    AddPostActionType
    | SendMessageActionType
    | setUserProfileType
    | setStatusType
    | deletePostType
    | savePhotoType
    | SetPostActionType

export type AddPostActionType = {
    type: 'ADD-POST'
    newPostText: string
}
export type SetPostActionType = {
    type: 'SET-POSTS'
    posts: PostModel[]
}

export type SendMessageActionType = {
    type: 'SEND-MESSAGE',
    newMessageBody: string
}
export type setUserProfileType = {
    type: 'SET_USER_PROFILE',
    profile: ProfileModel
}

export type setStatusType = {
    type: 'SET_STATUS',
    status: string
}

export type deletePostType = {
    type: 'DELETE_POST',
    postId: string
}

export type savePhotoType = {
    type: 'SAVE_PHOTO_SUCCESS',
    photos: { small: '', large: '' }
}

