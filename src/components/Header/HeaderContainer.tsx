import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {AppRootStateType} from "../../redux/redux-store";
import {getAuthUserDataTC, logoutTC} from "../../redux/auth-reducer";

type HeaderContainerType = {
    getAuthUserData: () => void,
    login: null
    isAuth: boolean
    logout:()=>void
}

class HeaderContainer extends React.Component<HeaderContainerType> {
    componentDidMount() {
       this.props.getAuthUserData()
    }

    render() {
        return <Header {...this.props} login={this.props.login}/>
    }
}

const mapStateToProps = (state: AppRootStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login

})
export default connect(mapStateToProps, {getAuthUserData: getAuthUserDataTC, logout:logoutTC})(HeaderContainer);