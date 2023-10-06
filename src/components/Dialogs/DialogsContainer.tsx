import React from "react";
import {
    sendMessageActionCreator,
    updateNewMessageTextActionCreator
} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {AppRootStateType} from "../../redux/redux-store";
import {compose} from "redux";
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

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        updateNewMessageText: updateNewMessageTextActionCreator,
        sendMessage: sendMessageActionCreator
    }),
    withRouter,
    WithAuthRedirect
)(Dialogs);

