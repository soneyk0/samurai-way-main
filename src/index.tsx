import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from "./redux/State";
import {BrowserRouter} from "react-router-dom";

// export type RerenderType={
//     state:StateType
//     updateNewPostText:(newText: string)=>void
// }

let rerenderEntireTree=()=>{
    ReactDOM.render(
        <BrowserRouter>
            <App state={store.getState()}
                 addPost={store.addPost.bind(store)}
                 updateNewPostText={store.updateNewPostText.bind(store)}/>
        </BrowserRouter>,

        document.getElementById('root')
    );
}
rerenderEntireTree();
store.subscribe(rerenderEntireTree);

