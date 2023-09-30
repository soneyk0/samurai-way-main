import React from "react";
import {
    sendMessageActionCreator,
    updateNewMessageTextActionCreator
} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {AppRootStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";
import {DialogPageType} from "../../redux/store";

type MapStatePropsType = {
    dialogsPage: DialogPageType
    isAuth:boolean

}

type MapDispatchPropsType = {
    updateNewMessageText: (body: string) => void,
    sendMessage: () => void
}

let mapStateToProps = (state: AppRootStateType): MapStatePropsType => {
    return {
        dialogsPage: state.dialogsReducer,
        isAuth: state.auth.isAuth

    }
}

let mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        updateNewMessageText: (body: string) => {
            dispatch(updateNewMessageTextActionCreator(body))
        },
        sendMessage: () => {
            dispatch(sendMessageActionCreator())
        }

    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;

