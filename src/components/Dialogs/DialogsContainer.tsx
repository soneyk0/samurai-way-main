import React from "react";
import {
    sendMessageActionCreator,
} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {AppRootStateType} from "../../redux/redux-store";
import {compose, Dispatch} from "redux";
import {DialogPageType} from "../../redux/store";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {withRouter} from "react-router-dom";

type MapStatePropsType = {
    dialogsPage: DialogPageType
}


let mapStateToProps = (state: AppRootStateType): MapStatePropsType => {
    return {
        dialogsPage: state.dialogsReducer
    }
}

let mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        sendMessage: (newMessageBody: string) => {
            dispatch(sendMessageActionCreator(newMessageBody))
        }
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    WithAuthRedirect
)(Dialogs);

