import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";

type HeaderTypePage = {
    isAuth: boolean
    login: null
}

const Header = (props: HeaderTypePage) => {
    return (
        <header className={s.header}>
            <img src='https://nettox.net/upload/CAllcorp3/312/hf0t8t1e29hr26hkqxmscb57emme8k46.svg' alt=""/>

            <div className={s.loginBlock}>
                {props.isAuth ? <span className={s.login}>{props.login}</span>

                    : <NavLink to={'/login'} activeClassName={s.activeLink}>Login</NavLink>}
            </div>
        </header>
    )
}

export default Header;