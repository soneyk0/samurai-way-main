import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from 'redux-thunk'
import {reducer as formReducer} from "redux-form";
import appReducer from "./app-reducer";


let rootReducers = combineReducers({
    profileReducer: profileReducer,
    dialogsReducer: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer

})


let store = legacy_createStore(rootReducers, applyMiddleware(thunkMiddleware));
export type AppRootStateType = ReturnType<typeof rootReducers>

export type ReduxStoreType = typeof store
export default store;



