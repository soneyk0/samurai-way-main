import React from "react";
import {AppRootStateType} from "./redux-store";
import {createSelector} from "reselect";

const getUsersSelector = (state: AppRootStateType) => {
    return state.usersPage.users;
}

export const getUsers = createSelector(getUsersSelector,(users) => {
    return users.filter(u => true);
})


export const getIsFetching = (state: AppRootStateType) => {
    return state.usersPage.isFetching;
}

export const getPageSize = (state: AppRootStateType) => {
    return state.usersPage.pageSize;
}

export const getTotalUsersCount = (state: AppRootStateType) => {
    return state.usersPage.totalUsersCount;
}

export const getCurrentPage = (state: AppRootStateType) => {
    return state.usersPage.currentPage;
}

export const getIsFollowingInProgress = (state: AppRootStateType) => {
    return state.usersPage.isFollowingInProgress;
}