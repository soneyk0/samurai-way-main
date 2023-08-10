import {combineReducers, legacy_createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";

let rootReducers = combineReducers({
    profileReducer: profileReducer,
    dialogsReducer: dialogsReducer
})


let store= legacy_createStore(rootReducers);
export type AppRootStateType = ReturnType<typeof rootReducers>

export type ReduxStoreType = typeof store
export default store;



