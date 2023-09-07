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
    currentPage: 1
}

export type InitialStateType = typeof initialState
export type followACType = ReturnType<typeof followAC>
export type unfollowACType = ReturnType<typeof unfollowAC>
export type setUsersACType = ReturnType<typeof setUsersAC>
export type setCurrentPageType = ReturnType<typeof setCurrentPageAC>
export type setTotalUsersCountType = ReturnType<typeof setTotalUsersCountAC>

type ActionType = followACType | unfollowACType | setUsersACType | setCurrentPageType | setTotalUsersCountType

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

export default usersReducer;