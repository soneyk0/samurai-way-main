

export let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

export type InitialStateType = typeof initialState
export type setUserDataACType = ReturnType<typeof setAuthUserDataAC>


type ActionType = setUserDataACType

const authReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        default:
            return state
    }
}


export const setAuthUserDataAC = (userId: null, email:null, login: null) => {
    return {
        type: 'SET_USER_DATA',
        data:{userId,email,login}
    } as const
}

export default authReducer;