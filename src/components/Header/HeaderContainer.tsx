import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {AppRootStateType} from "../../redux/redux-store";
import {logoutTC} from "../../redux/auth-reducer";

type HeaderContainerType = {
    login: null
    isAuth: boolean
    logout:()=>void
}

class HeaderContainer extends React.Component<HeaderContainerType> {

    render() {
        return <Header {...this.props} login={this.props.login}/>
    }
}

const mapStateToProps = (state: AppRootStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login

})
export default connect(mapStateToProps, {logout:logoutTC})(HeaderContainer);