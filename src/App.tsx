import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import {Route} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import {setUserProfileAC} from "./redux/profile-reducer";
import ProfileContainer from "./components/Profile/ProfileContainer";

// export type AppPropsType = {
//     store: typeof store
//     // dispatch: (action: ActionsTypes) => void
//     // addPost:()=>void
//     // updateNewPostText:(newText: string)=>void
//
// }

const App = () => {
    return (

        <div className='app-wrapper'>
            <Header/>
            <Navbar/>
            <div className={'app-wrapper-content'}>
                <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                <Route path='/profile/:userId?' render={() => <ProfileContainer setUserProfile={setUserProfileAC} />}
                />
                <Route path='/news' render={() => <News/>}/>
                <Route path='/music' render={() => <Music/>}/>
                <Route path='/settings' render={() => <Settings/>}/>
                <Route path='/users' render={() => <UsersContainer/>}
                />

            </div>
        </div>
    );
}

export default App;
