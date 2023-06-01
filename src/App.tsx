import React from 'react';
import './App.css';


const App = () => {
    return (
        <div className='app-wrapper'>
            <header className='header'>
                <img src="https://api.freelogodesign.org/assets/thumb/logo/5320_400.png" alt=""/>
            </header>
            <nav className='nav'>
                <div><a>Profile</a></div>
                <div><a>Message</a></div>
                <div><a>News</a></div>
                <div><a>Music</a></div>
                <div><a>Settings</a></div>
            </nav>
            <div className='content'>
                <div><img
                    src="https://www.mirf.ru/wp-content/uploads/2022/02/1522977132_128_0_7374_4076_1920x0_80_0_0_04ec5fd1abe7f78c95e028c368cc1e7c.jpg"
                    alt=""/></div>
                <div>ava+descrip</div>
                <div>my post
                    <div>new post</div>
                    <div>post 1</div>
                    <div>post 2</div>
                </div>
            </div>
        </div>
    );
}


export default App;
