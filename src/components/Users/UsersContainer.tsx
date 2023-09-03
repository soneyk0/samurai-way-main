import React from "react";
import {connect} from "react-redux";
import {AppRootStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";
import {followAC, setUsersAC, unfollowAC, UsersType} from "../../redux/users-reducer";
import Users from "./Users";

let mapStateToProps = (state: AppRootStateType) => {
    return {
        users: state.usersPage.users
    }
}

let mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        follow: (userId:number) => {
            dispatch(followAC(userId))
        },
        unfollow: (userId:number) => {
            dispatch(unfollowAC(userId))
        },
        setUsers: (users:Array<UsersType>) => {
            dispatch(setUsersAC(users))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Users)