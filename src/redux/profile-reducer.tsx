import {
    ActionsTypes,
    AddPostActionType,
    PostsType,
    ProfilePageType,
    StateType,
    StoreType,
    UpdateNewPostTextActionType
} from "./State";

const profileReducer = (state:ProfilePageType, action: ActionsTypes):ProfilePageType => {
    switch (action.type) {
        case 'ADD-POST':
            const newPost: PostsType = {
                id: 5,
                message: state.newPostText,
                likesCount: 10
            }
            state.posts.push(newPost);
            state.newPostText = '';
            return state;

        case 'UPDATE-NEW-POST-TEXT':
            state.newPostText = action.newText;
            return state;

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