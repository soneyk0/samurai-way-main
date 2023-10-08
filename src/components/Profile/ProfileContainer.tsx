import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {AppRootStateType} from "../../redux/redux-store";
import {getStatusTC, getUserProfileTC, updateStatusTC} from "../../redux/profile-reducer";
import {ProfileType} from "../../redux/store";
import {useLocation, useParams,} from "react-router-dom";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";

type ProfileContainerType = {
    getUserProfile: (userId: string) => void,
    profile: ProfileType
    router: { location: Location, params: { [key: string]: string } }
    isAuth: boolean
    getStatus: (userId: string) => void
    updateStatus: (status: string) => void
    status:string
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
            userId = '29571';
        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile} updateStatus={this.props.updateStatus} status={this.props.status}/>
        )
    }
}


let mapStateToProps = (state: AppRootStateType) => ({
    profile: state.profileReducer.profile,
    status: state.profileReducer.status
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        getUserProfile: getUserProfileTC,
        getStatus: getStatusTC,
        updateStatus: updateStatusTC
    }),
    withRouter,
    WithAuthRedirect
)(ProfileContainer)
