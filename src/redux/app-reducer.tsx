import {ThunkDispatch} from "redux-thunk";
import {getAuthUserDataTC} from "./auth-reducer";
import {AppRootStateType} from "./redux-store";


export let initialState = {
    initialized: false
}

export type InitialStateType = typeof initialState
export type initializedSuccessACType = ReturnType<typeof initializedSuccessAC>


type ActionType = initializedSuccessACType

const appReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}


export const initializedSuccessAC = () => {
    return {
        type: 'INITIALIZED_SUCCESS',
    } as const
}

export const initializeAppTC = () => (dispatch: ThunkDispatch<AppRootStateType, unknown, ActionType>) => {
    let promise = dispatch(getAuthUserDataTC())
    promise.then(()=>{
        dispatch(initializedSuccessAC())
    })
}


export default appReducer;