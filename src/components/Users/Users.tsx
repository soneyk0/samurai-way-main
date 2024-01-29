import React from "react";
import {UsersType} from "../../redux/users-reducer";
import User from "./User";
import {Pagination, Stack} from "@mui/material";
import s from './users.module.css'

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
    let pagesCount = Math.ceil(totalUsersCount / pageSize)
    return <div>
        <div className={s.listOfUsers}>
            {
                users.map(u => <User  key={u.id} user={u}
                                     isFollowingInProgress={props.isFollowingInProgress}
                                     unfollow={props.unfollow}
                                     follow={props.follow}
                />)
            }
        </div>
        <Stack spacing={2} className={s.paginator}>
            <Pagination color={"secondary"}
                        count={pagesCount}
                        page={currentPage}
                        boundaryCount={2}

                        onChange={(event, page)=>onPageChanged(page)}
                        showFirstButton showLastButton />
        </Stack>
    </div>
}

export default Users