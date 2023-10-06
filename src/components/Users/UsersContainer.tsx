import React from "react";
import {connect} from "react-redux";
import {AppRootStateType} from "../../redux/redux-store";
import {
    followTC, getUsersTC,
    setCurrentPageAC,
    setTotalUsersCountAC,
    setUsersAC, toggleIsFetchingAC,
    unfollowTC,
    UsersType
} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";

export type UsersContainerType = {
    users: Array<UsersType>,
    follow: (isFetching: boolean, userId: number) => void,
    unfollow: (isFetching: boolean, userId: number) => void,
    setUsers: (users: Array<UsersType>) => void,
    setPage: (pageNumber: number) => void,
    setTotalUsersCount: (totalUsersCount: number) => void,
    toggleIsFetching: (isFetching: boolean) => void,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean
    isFollowingInProgress: Array<number>
    getUsersThunk: (currentPage: number, pageSize: number) => void
}

class UsersContainer extends React.Component <UsersContainerType> {

    componentDidMount() {
        this.props.getUsersThunk(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (page: number) => {
        this.props.getUsersThunk(page, this.props.pageSize)
    }


    render() {

        return <>
            {this.props.isFetching ? <Preloader/> : null}

            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                isFollowingInProgress={this.props.isFollowingInProgress}
            />
        </>
    }
}

let mapStateToProps = (state: AppRootStateType) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        isFollowingInProgress: state.usersPage.isFollowingInProgress
    }
}

export default compose<React.ComponentType>(
    WithAuthRedirect, connect(mapStateToProps, {
        follow: followTC,
        unfollow: unfollowTC,
        setUsers: setUsersAC,
        setPage: setCurrentPageAC,
        setTotalUsersCount: setTotalUsersCountAC,
        toggleIsFetching: toggleIsFetchingAC,
        getUsersThunk: getUsersTC
    }))(UsersContainer)