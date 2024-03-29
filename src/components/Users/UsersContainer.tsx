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
import {
    getCurrentPage,
    getIsFetching,
    getIsFollowingInProgress,
    getPageSize,
    getTotalUsersCount, getUsers,
} from "../../redux/users-selector";

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
        let{currentPage, pageSize}= this.props
        this.props.getUsersThunk(currentPage, pageSize)
    }

    onPageChanged = (page: number) => {
        let{pageSize}= this.props
        this.props.getUsersThunk(page, pageSize)
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
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        isFollowingInProgress: getIsFollowingInProgress(state)
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        follow: followTC,
        unfollow: unfollowTC,
        setUsers: setUsersAC,
        setPage: setCurrentPageAC,
        setTotalUsersCount: setTotalUsersCountAC,
        toggleIsFetching: toggleIsFetchingAC,
        getUsersThunk: getUsersTC
    }))(UsersContainer)