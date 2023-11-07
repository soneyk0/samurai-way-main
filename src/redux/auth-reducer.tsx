import {authAPI} from "../api/api";
import {ThunkDispatch} from "redux-thunk";
import {AppRootStateType} from "./redux-store";
import {stopSubmit} from "redux-form";
import {FormAction} from "redux-form/lib/actions"

export class UserModel {
    id?: number;
    email?: string;
    login?: string
}

export class AuthModel extends UserModel {
    isAuth: boolean = false
}

const SET_USER_DATA = 'network/auth/SET_USER_DATA'
export let initialState = new AuthModel()

export type setUserDataACType = ReturnType<typeof setAuthUserDataAC>


type ActionType = setUserDataACType

const authReducer = (state: AuthModel = initialState, action: ActionType): AuthModel => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
            }
        default:
            return state
    }
}


export const setAuthUserDataAC = (data: AuthModel) => {
    return {
        type: SET_USER_DATA,
        data
    } as const
}

export const getAuthUserDataTC = () => async (dispatch: ThunkDispatch<any, any, any>) => {
    const {data} = await authAPI.me();
    if (data.resultCode === 0) {
        dispatch(setAuthUserDataAC({...data.data, isAuth: true}));
    }
}

export const loginTC = (email: string, password: string, rememberMe: boolean) => async (dispatch: ThunkDispatch<AppRootStateType, unknown, FormAction>) => {
    let response = await authAPI.login(email, password, rememberMe);
    if (response.data.resultCode === 0) {
        await dispatch(getAuthUserDataTC());
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
        dispatch(stopSubmit('login', {_error: message}) as FormAction)
    }
}

export const logoutTC = () => async (dispatch: ThunkDispatch<AppRootStateType, unknown, ActionType>) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserDataAC({...new UserModel(), isAuth: false}));
    }
}


export default authReducer;