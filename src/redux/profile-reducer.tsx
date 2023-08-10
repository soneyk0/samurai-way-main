import {
    ActionsTypes,
    AddPostActionType,
    UpdateNewPostTextActionType
} from "./store";

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
            let stateCopy = {...state}
            stateCopy.posts = [...state.posts]
            stateCopy.posts.push(newPost)
            stateCopy.newPostText = '';
            return stateCopy;
        }
        case 'UPDATE-NEW-POST-TEXT': {
            let stateCopy = {...state}
            stateCopy.newPostText = action.newText;
            return stateCopy;
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

export default profileReducer;