import {authAPI, securityAPI} from "../api/api";
import {ThunkDispatch} from "redux-thunk";
import {AppRootStateType} from "./redux-store";
import {stopSubmit} from "redux-form";
import {FormAction} from "redux-form/lib/actions"
import {Dispatch} from "redux";
import {LoginFormData} from "../components/Login/Login";

export class UserModel {
    id?: number;
    email?: string;
    login?: string
}

export class AuthModel extends UserModel {
    isAuth: boolean = false
    captchaUrl: string = ''
}



const SET_USER_DATA = 'network/auth/SET_USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'network/auth/GET_CAPTCHA_URL_SUCCESS'
export let initialState = new AuthModel()


export type setUserDataACType = ReturnType<typeof setAuthUserDataAC>
export type getCaptchaUrlACType = ReturnType<typeof getCaptchaUrlAC>


type ActionType = setUserDataACType | getCaptchaUrlACType

const authReducer = (state: AuthModel = initialState, action: ActionType): AuthModel => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
            }
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state, captchaUrl: action.captchaUrl,
            }
        default:
            return state
    }
}


export const setAuthUserDataAC = (data: Partial<AuthModel>) => {
    return {
        type: SET_USER_DATA,
        data
    } as const
}
export const getCaptchaUrlAC = (captchaUrl: string) => {
    return {
        type: GET_CAPTCHA_URL_SUCCESS,
        captchaUrl
    } as const
}

export const getAuthUserDataTC = () => async (dispatch: ThunkDispatch<any, any, any>) => {
    const {data} = await authAPI.me();
    if (data.resultCode === 0) {
        dispatch(setAuthUserDataAC({...data.data, isAuth: true}));
    }
}

export const loginTC = (payload:LoginFormData) => async (dispatch: ThunkDispatch<AppRootStateType, unknown, FormAction>) => {
    let response = await authAPI.login(payload);
    if (response.data.resultCode === 0) {
        await dispatch(getAuthUserDataTC());
    } else {
        if(response.data.resultCode===10){
            dispatch(getCaptchaUrlTC());
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
        dispatch(stopSubmit('login', {_error: message}) as FormAction)
    }
}

export const getCaptchaUrlTC = () => async (dispatch: Dispatch) => {
    let response = await securityAPI.getCaptchaURL();
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlAC(captchaUrl))
}


export const logoutTC = () => async (dispatch: ThunkDispatch<AppRootStateType, unknown, ActionType>) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserDataAC({...new UserModel(), isAuth: false}));
    }
}


export default authReducer;