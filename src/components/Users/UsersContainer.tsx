import React from "react";
import {connect} from "react-redux";
import {AppRootStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";
import {
    followAC,
    setCurrentPageAC,
    setTotalUsersCountAC,
    setUsersAC, toggleIsFetchingAC,
    unfollowAC,
    UsersType
} from "../../redux/users-reducer";
import axios from "axios";
import Users from "./Users";
import preloader from './../../assets/images/preloader.png';
import Preloader from "../common/Preloader/Preloader";

export type UsersContainerType = {
    users: Array<UsersType>,
    follow: (userId: number) => void,
    unfollow: (userId: number) => void,
    setUsers: (users: Array<UsersType>) => void,
    setPage: (pageNumber: number) => void,
    setTotalUsersCount: (totalUsersCount: number) => void,
    toggleIsFetching:(isFetching: boolean)=>void,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean
}

class UsersContainer extends React.Component <UsersContainerType> {

    componentDidMount() {
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
            });
    }

    onPageChanged = (page: number) => {
        this.props.setPage(page)
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(response.data.items)
            });
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
        isFetching: state.usersPage.isFetching
    }
}
// let mapDispatchToProps = (dispatch: Dispatch) => {
//     return {
//         follow: (userId: number) => {
//             dispatch(followAC(userId))
//         },
//         unfollow: (userId: number) => {
//             dispatch(unfollowAC(userId))
//         },
//         setUsers: (users: Array<UsersType>) => {
//             dispatch(setUsersAC(users))
//         },
//         setPage: (pageNumber: number) => {
//             dispatch(setCurrentPageAC(pageNumber))
//         },
//         setTotalUsersCount: (totalUsersCount: number) => {
//             dispatch(setTotalUsersCountAC(totalUsersCount))
//         },
//         toggleIsFetching:(isFetching: boolean)=>{
//             dispatch(toggleIsFetchingAC(isFetching))
//         }
//     }
// }
export default connect(mapStateToProps, {
    follow: followAC,
    unfollow: unfollowAC,
    setUsers: setUsersAC,
    setPage: setCurrentPageAC,
    setTotalUsersCount: setTotalUsersCountAC,
    toggleIsFetching:toggleIsFetchingAC
})(UsersContainer)