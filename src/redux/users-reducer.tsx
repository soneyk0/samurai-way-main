import {
    ActionsTypes,
    AddPostActionType,
    UpdateNewPostTextActionType
} from "./store";

export type UsersType = {
    id: number,
    photoUrl:string,
    followed: boolean,
    fullName: string,
    status: string,
    location: { city: string, country: string }
}

let initialState = {
    users: [
        // {
        //     id: 1,
        //     photoUrl: 'https://img01.rl0.ru/afisha/e375x210p0x32f5760x3291q85i/s3.afisha.ru/mediastorage/87/27/5fd2432fb42640fd99f0e9fb2787.jpg',
        //     followed: false,
        //     fullName: 'Dmitry',
        //     status: 'Im a boss',
        //     location: {city: 'Minsk', country: 'Belarus'}
        // },
        // {
        //     id: 2,
        //     photoUrl: 'https://img01.rl0.ru/afisha/e375x210p0x32f5760x3291q85i/s3.afisha.ru/mediastorage/87/27/5fd2432fb42640fd99f0e9fb2787.jpg',
        //     followed: true,
        //     fullName: 'Alina',
        //     status: 'Im a boss too',
        //     location: {city: 'Warsaw', country: 'Poland'}
        // },
        // {
        //     id: 3,
        //     photoUrl: 'https://img01.rl0.ru/afisha/e375x210p0x32f5760x3291q85i/s3.afisha.ru/mediastorage/87/27/5fd2432fb42640fd99f0e9fb2787.jpg',
        //     followed: false,
        //     fullName: 'Andrew',
        //     status: 'I love beer',
        //     location: {city: 'Berlin', country: 'Germany'}
        // },
    ] as Array<UsersType>
}

export type InitialStateType = typeof initialState
export type followACType = ReturnType<typeof followAC>
export type unfollowACType = ReturnType<typeof unfollowAC>
export type setUsersACType = ReturnType<typeof setUsersAC>

type ActionType = followACType | unfollowACType | setUsersACType

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
            return {...state, users: [...state.users, ...action.users]}

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

export default usersReducer;