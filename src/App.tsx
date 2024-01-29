import React, {Suspense} from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, HashRouter, Redirect, Route, Switch, withRouter} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {initializeAppTC} from "./redux/app-reducer";
import store, {AppRootStateType} from "./redux/redux-store";
import Preloader from "./components/common/Preloader/Preloader";
import {compose} from "redux";
import error404 from './assets/images/error404.jpg'


const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"))
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"))

type AppType = {
    initializeApp: () => void
    initialized: boolean
}


class App extends React.Component <AppType> {

    componentDidMount() {
        this.props.initializeApp()

    }

    render() {

        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <div className={'app-wrapper-content'}>
                    <Navbar/>
                    <div className={'page-wrap'}>
                        <Switch>
                            <Redirect exact from="/" to="/profile"/>
                            <Route path='/dialogs' render={() => {
                                return <Suspense fallback={<Preloader/>}>
                                    <DialogsContainer/>
                                </Suspense>
                            }}/>
                            <Route path='/profile/:userId?' render={() => {
                                return <Suspense fallback={<Preloader/>}>
                                    <ProfileContainer/>
                                </Suspense>
                            }}/>
                            <Route path='/news' render={() => <News/>}/>
                            <Route path='/music' render={() => <Music/>}/>
                            <Route path='/settings' render={() => <Settings/>}/>
                            <Route path='/users' render={() => <UsersContainer/>}/>
                            <Route path='/login' render={() => <Login/>}/>
                            <Route path='/*'
                                   render={() => <div><img src={error404} alt={'error 404'} className={'error'}/>
                                   </div>}/>
                        </Switch></div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppRootStateType) => ({
    initialized: state.app.initialized
})

let AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp: initializeAppTC}))(App)

const MainApp = () => {
    return <HashRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </HashRouter>
}

export default MainApp
