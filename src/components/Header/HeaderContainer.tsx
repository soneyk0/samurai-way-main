import React from 'react';
import Header from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {AppRootStateType} from "../../redux/redux-store";
import {setAuthUserDataAC} from "../../redux/auth-reducer";

type HeaderContainerType = {
    setAuthUserData: (userId: null, email: null, login: null) => void,
    login: null
    isAuth: boolean
}

class HeaderContainer extends React.Component<HeaderContainerType> {
    componentDidMount() {
        console.log(this.props)
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        })
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {userId, email, login} = response.data.data
                    this.props.setAuthUserData(userId, email, login);
                }
            });
    }

    render() {
        return <Header {...this.props} login={this.props.login}/>
    }
}

const mapStateToProps = (state: AppRootStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login

})
export default connect(mapStateToProps, {setAuthUserData: setAuthUserDataAC})(HeaderContainer);