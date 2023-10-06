import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {AppRootStateType} from "../../redux/redux-store";
import {getUserProfileTC} from "../../redux/profile-reducer";
import {ProfileType} from "../../redux/store";
import {useLocation, useParams,} from "react-router-dom";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";

type ProfileContainerType = {
    getUserProfile: (userId: string) => void,
    profile: ProfileType
    router: { location: Location, params: { [key: string]: string } }
    isAuth: boolean
}

function withRouter(Component: any) {
    function ComponentWithRouterProp(props: any) {
        let location = useLocation();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{location, params}}
            />
        );
    }

    return ComponentWithRouterProp;
}

class ProfileContainer extends React.Component<ProfileContainerType> {

    componentDidMount() {
        let userId = this.props.router.params.userId
        if (!userId) {
            userId = '30030';
        }
        this.props.getUserProfile(userId)
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}




let mapStateToProps = (state: AppRootStateType) => ({
    profile: state.profileReducer.profile,
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile: getUserProfileTC}),
    withRouter,
    WithAuthRedirect
)(ProfileContainer)
