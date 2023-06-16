import React from "react";
import  s from './Navbar.module.css';

const Navbar = () => {
    return (
        <nav className={s.nav}>
            <div className={s.icon}><a>Profile</a></div>
            <div className={s.icon}><a>Message</a></div>
            <div className={s.icon}><a>News</a></div>
            <div className={s.icon}><a>Music</a></div>
            <div className={s.icon}><a>Settings</a></div>
        </nav>
    )
}
export default Navbar;