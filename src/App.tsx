import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {ActionsTypes, StateType, StoreType,} from "./redux/State";

export type AppPropsType = {
    state: StateType
    dispatch: (action:ActionsTypes)=>void
    // addPost:()=>void
    // updateNewPostText:(newText: string)=>void

}


const App = ({state,dispatch}: AppPropsType) => {
    return (

        <div className='app-wrapper'>
            <Header/>
            <Navbar/>
            <div className={'app-wrapper-content'}>
                {/*<Route path='/dialogs' component={Dialogs}/>*/}
                {/*<Route path='/profile' component={Profile}/>*/}
                <Route path='/dialogs' render={() => <Dialogs dialogs={state.dialogPage.dialogs}
                                                              messages={state.dialogPage.messages}/>}/>
                <Route path='/profile' render={() => <Profile
                    posts={state.profilePage.posts}
                    dispatch={dispatch}
                    newPostText={state.profilePage.newPostText}

                />}
                />
                <Route path='/news' render={() => <News/>}/>
                <Route path='/music' render={() => <Music/>}/>
                <Route path='/settings' render={() => <Settings/>}/>


            </div>
        </div>
    );
}

export default App;
