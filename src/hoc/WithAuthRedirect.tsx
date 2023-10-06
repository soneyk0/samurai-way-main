import React, {ComponentType} from "react";
import {Redirect} from "react-router-dom";
import {AppRootStateType} from "../redux/redux-store";
import {connect} from "react-redux";

type MapStatePropsType = {
    isAuth: boolean

}
let mapStateToPropsForRedirect = (state: AppRootStateType): MapStatePropsType => {
    return {
        isAuth: state.auth.isAuth
    }
}

export function WithAuthRedirect<T>(Component: ComponentType<T>) {
    const RedirectComponent = (props: MapStatePropsType) => {

        let {isAuth,...resProps}=props

        if (!props.isAuth) return <Redirect to={'/login'}/>
        return <Component {...resProps as T}/>
    }


    let ConnectedRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)
    return ConnectedRedirectComponent
}