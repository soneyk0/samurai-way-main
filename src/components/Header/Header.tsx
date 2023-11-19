import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import logo from "../../assets/images/logo.png";

type HeaderTypePage = {
    isAuth: boolean
    login?: string
    logout: () => void
}

const Header = (props: HeaderTypePage) => {
    return (
        <header className={s.header}>
            <img src={logo} alt=""/> <div className={s.name}>{'Social Network'}</div>
            <div className={s.loginBlock}>
                {props.isAuth
                    ? <span className={s.login }>{props.login}  <button className={s.buttonLoginOut} onClick={props.logout}>Log out</button></span>
                    : <NavLink to={'/login'} className={s.buttonLogin}>Login</NavLink>}
            </div>
        </header>
    )
}


export default Header;