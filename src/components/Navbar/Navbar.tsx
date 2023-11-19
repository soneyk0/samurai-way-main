import React from "react";
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";
import iconUser from '../../assets/images/iconuser.png';
import message from '../../assets/images/message.png';
import news from '../../assets/images/news.png';
import music from '../../assets/images/music.png';
import settings from '../../assets/images/settings.png';
import friends from '../../assets/images/friends.png';

const Navbar = () => {
    return (
        <nav className={s.nav}>
            <div className={s.icon}>
                <NavLink to={'/profile'} activeClassName={s.activeLink}><img src={iconUser} alt={''} className={s.icons}/> Profile</NavLink>
            </div>
            <div className={s.icon}>
                <NavLink to={'/dialogs'} activeClassName={s.activeLink}><img src={message} alt={''} className={s.icons}/> Message</NavLink>
            </div>
            <div className={s.icon}>
                <NavLink to={'/news'} activeClassName={s.activeLink}><img src={news} alt={''} className={s.icons}/> News</NavLink>
            </div>
            <div className={s.icon}>
                <NavLink to={'/music'} activeClassName={s.activeLink}><img src={music} alt={''} className={s.icons}/> Music</NavLink>
            </div>
            <div className={s.icon}>
                <NavLink to={'/settings'} activeClassName={s.activeLink}><img src={settings} alt={''} className={s.icons}/> Settings</NavLink>
            </div>
            <div className={s.icon}>
                <NavLink to={'/users'} activeClassName={s.activeLink}><img src={friends} alt={''} className={s.icons}/> Users</NavLink>
            </div>
        </nav>
    )
}
export default Navbar;