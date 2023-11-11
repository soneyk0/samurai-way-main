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

export type ProfilePageType = {
    posts: PostModel[]
    profile: ProfileModel
    status: string


}
export type DialogPageType = {
    dialogs: Array<DialogsType>
    messages: Array<PostsMessages>
}

export type StateType = {
    profilePage: ProfilePageType,
    dialogPage: DialogPageType
}

export type StoreType = {
    _state: StateType,
    _callSubscriber: () => void,
    getState: () => StateType,
    subscribe: (callback: () => void) => void,
    dispatch: (action: ActionsTypes) => void
}

export type ActionsTypes =
    AddPostActionType
    | SendMessageActionType
    | setUserProfileType
    | setStatusType
    | deletePostType
    | savePhotoType

export type AddPostActionType = {
    type: 'ADD-POST'
    newPostText: string
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

let store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: '1', message: 'hi how are you', likesCount: 0},
                {id: '2', message: 'Its my first post', likesCount: 23},
            ],
            profile: {
                photos: {small: '', large: ''},
                fullName: '',
                lookingForAJob: false,
                lookingForAJobDescription: '',
                aboutMe: '',
                contacts: [{github: '', vk: '', facebook: '', instagram: ''}]
            },
            status: ''
        },
        dialogPage: {
            dialogs: [
                {id: 1, name: 'Yana'},
                {id: 2, name: 'Dimych'},
                {id: 3, name: 'Alina'},
                {id: 4, name: 'Anna'},
                {id: 5, name: 'Nikita'},
                {id: 6, name: 'Sveta'}
            ],
            messages: [
                {id: 1, message: 'Hi'},
                {id: 2, message: 'How is your it-kamasutra?'},
                {id: 3, message: 'Yo'},
                {id: 4, message: 'Yo'},
                {id: 5, message: 'Yo'},
                {id: 6, message: 'Yo'}
            ]

        }

    },
    getState() {
        return this._state
    },
    _callSubscriber() {
        console.log('state changed')
    },
    subscribe(callback) {
        this._callSubscriber = callback;

    },
    dispatch(action) { // {type: 'название действия'}

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogPage = dialogsReducer(this._state.dialogPage, action);

        this._callSubscriber();

    }
}

export default store;