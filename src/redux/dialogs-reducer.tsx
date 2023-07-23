import {ActionsTypes, DialogPageType, PostsType, SendMessageActionType, UpdateNewMessageTextActionType} from "./State";

const dialogsReducer = (state: DialogPageType, action: ActionsTypes): DialogPageType => {

    switch (action.type) {
        case 'UPDATE-NEW-MESSAGE-TEXT':
            state.newMessageText = action.body;
            return state;

        case 'SEND-MESSAGE':
            let body = state.newMessageText;
            state.newMessageText = ''
            state.messages.push({id: 7, message: body})
            return state;

        default:
            return state;
    }
}

export const sendMessageActionCreator = (): SendMessageActionType => {
    return {
        type: 'SEND-MESSAGE',
    } as const
}

export const updateNewMessageTextActionCreator = (body: string): UpdateNewMessageTextActionType => {
    return {
        type: 'UPDATE-NEW-MESSAGE-TEXT',
        body: body
    } as const
}

export default dialogsReducer;