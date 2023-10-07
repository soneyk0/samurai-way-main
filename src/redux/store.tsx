import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";

export type ProfileType = {
    photos: { small: string, large: string }
    status:string
}

export type PostsType = {
    id: number,
    message: string,
    likesCount: number
}
export type DialogsType = {
    id: number,
    name: string
}

export type PostsMessages = {
    id: number,
    message: string
}

export type ProfilePageType = {
    posts: Array<PostsType>
    newPostText: string
    profile: ProfileType


}
export type DialogPageType = {
    dialogs: Array<DialogsType>
    messages: Array<PostsMessages>
    newMessageText: string
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
    | UpdateNewPostTextActionType
    | UpdateNewMessageTextActionType
    | SendMessageActionType
    | setUserProfileType;

export type AddPostActionType = {
    type: 'ADD-POST'
}

export type UpdateNewPostTextActionType = {
    type: 'UPDATE-NEW-POST-TEXT'
    newText: string
}

export type UpdateNewMessageTextActionType = {
    type: 'UPDATE-NEW-MESSAGE-TEXT'
    body: string
}

export type SendMessageActionType = {
    type: 'SEND-MESSAGE'
}
export type setUserProfileType = {
    type: 'SET_USER_PROFILE',
    profile: ProfileType
}

let store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'hi how are you', likesCount: 0},
                {id: 2, message: 'Its my first post', likesCount: 23},
            ],
            newPostText: '',
            profile: {
                photos: {small: '', large: ''},
                status:''
            },
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
            ],
            newMessageText: ''

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


// let state: StateType = {
//     profilePage: {
//         posts: [
//             {id: 1, message: 'hi how are you', likesCount: 0},
//             {id: 2, message: 'Its my first post', likesCount: 23},
//         ],
//         newPostText: '',
//     },
//     dialogPage: {
//         dialogs: [
//             {id: 1, name: 'Yana'},
//             {id: 2, name: 'Dimych'},
//             {id: 3, name: 'Alina'},
//             {id: 4, name: 'Anna'},
//             {id: 5, name: 'Nikita'},
//             {id: 6, name: 'Sveta'}
//         ],
//         messages: [
//             {id: 1, message: 'Hi'},
//             {id: 2, message: 'How is your it-kamasutra?'},
//             {id: 3, message: 'Yo'},
//             {id: 4, message: 'Yo'},
//             {id: 5, message: 'Yo'},
//             {id: 6, message: 'Yo'}
//         ]
//     }
//
// }


// let rerenderEntireTree=()=>{
//     console.log('state changed')
//
// }

// export const addPost = () => {
//     const newPost: PostsType = {
//         id: 5,
//         message: state.profilePage.newPostText,
//         likesCount: 10
//     }
//     state.profilePage.posts.push(newPost);
//     state.profilePage.newPostText = ''
//     rerenderEntireTree();
// }


// export const updateNewPostText = (newText: string) => {
//     state.profilePage.newPostText = newText;
//     rerenderEntireTree();
// }

// export const subscribe=(callback:()=>void)=>{
//     rerenderEntireTree=callback;
//
// }

export default store;