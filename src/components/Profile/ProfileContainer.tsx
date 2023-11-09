import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {AppRootStateType} from "../../redux/redux-store";
import {
    getStatusTC,
    getUserProfileTC,
    ProfileModel,
    savePhotoTC,
    saveProfileTC,
    updateStatusTC
} from "../../redux/profile-reducer";
import {Redirect, useLocation, useParams,} from "react-router-dom";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";
import {ProfileFormDataType} from "./ProfileInfo/ProfileDataForm";

type ProfileContainerType = {
    getUserProfile: (userId: string) => void,
    profile: ProfileModel
    router: { location: Location, params: { [key: string]: string } }
    isAuth: boolean
    getStatus: (userId: string) => void
    updateStatus: (status: string) => void
    status: string
    authorizedUserId: string
    savePhoto: (photoFile: File) => void
    saveProfile:(profile:ProfileFormDataType)=>void

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

    refreshProfile() {
        let userId = this.props.router.params['userId']
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                <Redirect to={'/login'}/>
            }
        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<ProfileContainerType>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.router.params['userId'] != prevProps.router.params['userId']) {
            this.refreshProfile()
            console.log(this.props.profile)
        }
    }

    render() {
        return (
            <Profile {...this.props}
                     isOwner={!this.props.router.params['userId']}
                     saveProfile={this.props.saveProfile}
                     updateStatus={this.props.updateStatus}
                     status={this.props.status}
                     savePhoto={this.props.savePhoto}/>
        )
    }
}


let mapStateToProps = (state: AppRootStateType) => {
    return {
        profile: state.profileReducer.profile,
        status: state.profileReducer.status,
        authorizedUserId: state.auth.id,
        isAuth: state.auth.isAuth
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        getUserProfile: getUserProfileTC,
        getStatus: getStatusTC,
        updateStatus: updateStatusTC,
        savePhoto: savePhotoTC,
        saveProfile:saveProfileTC
    }),
    withRouter,
    WithAuthRedirect
)(ProfileContainer)
