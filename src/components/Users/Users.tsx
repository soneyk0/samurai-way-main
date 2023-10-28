import React from "react";
import {UsersType} from "../../redux/users-reducer";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

export type UsersPageType = {
    users: Array<UsersType>,
    follow: (isFetching: boolean, userId: number) => void,
    unfollow: (isFetching: boolean, userId: number) => void,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number
    onPageChanged: (page: number) => void
    isFollowingInProgress: Array<number>
}

let Users = ({currentPage, onPageChanged, totalUsersCount, pageSize, users, ...props}: UsersPageType) => {
    return <div>
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged} totalUsersCount={totalUsersCount}
                   pageSize={pageSize}/>
        <div>
            {
                users.map(u => <User key={u.id} user={u}
                                     isFollowingInProgress={props.isFollowingInProgress}
                                     unfollow={props.unfollow}
                                     follow={props.follow}
                />)
            }
        </div>
    </div>
}

export default Users