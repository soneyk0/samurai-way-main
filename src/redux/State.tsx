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
    // addPost: () => void,
    // updateNewPostText: (newText: string) => void,
    subscribe: (callback: () => void) => void,
    dispatch: (action:ActionsTypes)=>void
}

export type ActionsTypes   = AddPostActionType | UpdateNewPostTextActionType;

type AddPostActionType={
    type:'ADD-POST'
}

type UpdateNewPostTextActionType={
    type:'UPDATE-NEW-POST-TEXT'
    newText:string
}

let store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'hi how are you', likesCount: 0},
                {id: 2, message: 'Its my first post', likesCount: 23},
            ],
            newPostText: '',
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
    // addPost() {
    //
    // },
    // updateNewPostText(newText: string) {
    //
    // },
    subscribe(callback) {
        this._callSubscriber = callback;

    },
    dispatch(action) { // {type: 'название действия'}
        if (action.type === 'ADD-POST') {
            const newPost: PostsType = {
                id: 5,
                message: this._state.profilePage.newPostText,
                likesCount: 10
            }
            this._state.profilePage.posts.push(newPost);
            this._state.profilePage.newPostText = ''
            this._callSubscriber();
        }
        else if (action.type === 'UPDATE-NEW-POST-TEXT') {
            this._state.profilePage.newPostText = action.newText;
            this._callSubscriber();
        }

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