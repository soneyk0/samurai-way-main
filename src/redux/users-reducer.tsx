import {Dispatch} from "redux";
import {usersAPI} from "../api/api";

export type UsersType = {
    id: number,
    photos: { small: null | string, large: null | string },
    followed: boolean,
    name: string,
    status: string,
    location: { city: string, country: string }
}

let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 10,
    totalUsersCount: 54,
    currentPage: 1,
    isFetching: false,
    isFollowingInProgress: [] as Array<number>
}

export type InitialStateType = typeof initialState
export type followACType = ReturnType<typeof followAC>
export type unfollowACType = ReturnType<typeof unfollowAC>
export type setUsersACType = ReturnType<typeof setUsersAC>
export type setCurrentPageType = ReturnType<typeof setCurrentPageAC>
export type setTotalUsersCountType = ReturnType<typeof setTotalUsersCountAC>
export type toggleIsFetchingType = ReturnType<typeof toggleIsFetchingAC>
export type toggleIsFollowingProgressType = ReturnType<typeof toggleIsFollowingProgressAC>

type ActionType =
    followACType
    | unfollowACType
    | setUsersACType
    | setCurrentPageType
    | setTotalUsersCountType
    | toggleIsFetchingType
    | toggleIsFollowingProgressType

const usersReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: state.users.map(u =>
                    u.id === action.userId ? {...u, followed: true} : u
                )
            }

        case 'UNFOLLOW':
            return {
                ...state,
                users: state.users.map(u =>
                    u.id === action.userId ? {...u, followed: false} : u
                )
            }

        case'SET_USERS':
            return {...state, users: action.users}
        case'SET_CURRENT_PAGE':
            return {...state, currentPage: action.currentPage}
        case'SET_TOTAL_USERS_COUNT':
            return {...state, totalUsersCount: action.count}
        case 'TOGGLE_IS_FETCHING':
            return {...state, isFetching: action.isFetching}
        case 'TOGGLE_IS_FOLLOWING_PROGRESS':
            return {
                ...state, isFollowingInProgress: action.isFetching
                    ? [...state.isFollowingInProgress, action.userId]
                    : state.isFollowingInProgress.filter(id => id != action.userId)
            }
        default:
            return state;
    }

}

export const followAC = (userId: number) => {
    return {
        type: 'FOLLOW',
        userId
    } as const
}

export const unfollowAC = (userId: number) => {
    return {
        type: 'UNFOLLOW',
        userId
    } as const
}
export const setUsersAC = (users: Array<UsersType>) => {
    return {
        type: 'SET_USERS',
        users
    } as const
}

export const setCurrentPageAC = (currentPage: number) => {
    return {
        type: 'SET_CURRENT_PAGE',
        currentPage
    } as const
}
export const setTotalUsersCountAC = (totalUsersCount: number) => {
    return {
        type: 'SET_TOTAL_USERS_COUNT',
        count: totalUsersCount
    } as const
}

export const toggleIsFetchingAC = (isFetching: boolean) => {
    return {
        type: 'TOGGLE_IS_FETCHING',
        isFetching
    } as const
}

export const toggleIsFollowingProgressAC = (isFetching: boolean, userId: number) => {
    return {
        type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
        isFetching,
        userId
    } as const
}


export const getUsersTC = (currentPage:number,pageSize:number) => (dispatch: Dispatch) => {
    dispatch(toggleIsFetchingAC(true))
    dispatch(setCurrentPageAC(currentPage))

    usersAPI.getUsers(currentPage, pageSize)
        .then(data => {
            dispatch(toggleIsFetchingAC(false))
            dispatch(setUsersAC(data.items))
            dispatch(setTotalUsersCountAC(data.totalCount))
        });
}


export const followTC = (isFetching: boolean, userId: number) => (dispatch: Dispatch) => {
    dispatch(toggleIsFollowingProgressAC(true, userId))
    usersAPI.follow(userId).then(response => {
        if (response.data.resultCode === 0) {
            dispatch(followAC(userId))
        }
        dispatch(toggleIsFollowingProgressAC(false, userId))
    });
}


export const unfollowTC = (isFetching: boolean, userId: number) => (dispatch: Dispatch) => {
    dispatch(toggleIsFollowingProgressAC(true, userId))
    usersAPI.unfollow(userId).then(response => {
        if (response.data.resultCode === 0) {
            dispatch(unfollowAC(userId))
        }
        dispatch(toggleIsFollowingProgressAC(false, userId))
    });
}

export default usersReducer;