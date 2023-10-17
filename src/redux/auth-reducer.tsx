import {authAPI} from "../api/api";
import {ThunkDispatch} from "redux-thunk";
import {AppRootStateType} from "./redux-store";
import {stopSubmit} from "redux-form";
import {FormAction} from "redux-form/lib/actions"


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
            }
        default:
            return state
    }
}


export const setAuthUserDataAC = (userId: null, email: null, login: null, isAuth: boolean) => {
    return {
        type: 'SET_USER_DATA',
        data: {userId, email, login, isAuth}
    } as const
}

export const getAuthUserDataTC = () => async (dispatch: ThunkDispatch<any, any, any>) => {
    return authAPI.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                let {userId, email, login, isAuth} = response.data.data
                dispatch(setAuthUserDataAC(userId, email, login, true));
            }
        });
}

export const loginTC = (email: string, password: string, rememberMe: boolean) => (dispatch: ThunkDispatch<AppRootStateType, unknown, FormAction>) => {
    authAPI.login(email, password, rememberMe)
        .then((response) => {
            if (response.data.resultCode === 0) {
                dispatch(getAuthUserDataTC());
            } else {
                let message = response.data.messages.length > 0 ? response.data.messages[0]:'Some error';
                dispatch(stopSubmit('login', {_error: message}) as FormAction)
            }
        });
}

export const logoutTC = () => (dispatch: ThunkDispatch<AppRootStateType, unknown, ActionType>) => {
    authAPI.logout()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(getAuthUserDataTC());
            }
        });
}


export default authReducer;