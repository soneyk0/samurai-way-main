import {ActionsTypes, DialogPageType, SendMessageActionType} from "./store";

export type DialogsType = {
    id: number,
    name: string
}

export type PostsMessages = {
    id: number,
    message: string
}


let initialState = {
    dialogs: [
        {id: 1, name: 'Yana'},
        {id: 2, name: 'Dimych'},
        {id: 3, name: 'Alina'},
        {id: 4, name: 'Anna'},
        {id: 5, name: 'Nikita'},
        {id: 6, name: 'Sveta'}
    ] as Array<DialogsType>,
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How is your it-kamasutra?'},
        {id: 3, message: 'Yo'},
        {id: 4, message: 'Yo'},
        {id: 5, message: 'Yo'},
        {id: 6, message: 'Yo'}
    ] as Array<PostsMessages>

}

export type InitialStateType = typeof initialState


const dialogsReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {

        case 'SEND-MESSAGE':
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages,{id: 7, message: body}]
            };
        default:
            return state;
    }
}

export const sendMessageActionCreator = (newMessageBody:string): SendMessageActionType => {
    return {
        type: 'SEND-MESSAGE',
        newMessageBody
    } as const
}

export default dialogsReducer;