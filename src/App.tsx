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
import {StateType, StoreType} from "./redux/State";

export type AppPropsType = {
    state: StateType
    addPost: () => void
    updateNewPostText: (newText: string) => void

}


const App = ({state,addPost,updateNewPostText}: AppPropsType) => {
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
                    addPost={addPost}
                    newPostText={state.profilePage.newPostText}
                    updateNewPostText={updateNewPostText}

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
