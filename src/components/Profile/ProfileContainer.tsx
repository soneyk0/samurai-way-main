import React from "react";
import Profile from "./Profile";
import axios from "axios";
import {UsersType} from "../../redux/users-reducer";
import {connect} from "react-redux";
import {AppRootStateType} from "../../redux/redux-store";
import {setUserProfileAC} from "../../redux/profile-reducer";
import {ProfileType} from "../../redux/store";
import {useLocation, useParams,} from "react-router-dom";
import PropTypes from "prop-types";

type ProfileContainerType = {
    setUserProfile: (profile: ProfileType) => void,
    profile: ProfileType
    router:{location:Location,params:{[key:string]:string}}
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
        console.log(this.props)

        let userId = this.props.router.params.userId
        if (!userId) {
            userId = '30030';
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
            .then(response => {
                this.props.setUserProfile(response.data);
                console.log(response.data)
            });
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

let mapStateToProps = (state: AppRootStateType) => ({
    profile: state.profileReducer.profile
})


let withUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, {setUserProfile:setUserProfileAC})(withUrlDataContainerComponent)

;