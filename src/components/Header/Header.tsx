import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import logo from "../../assets/images/logo.png";
import AppButton from "../common/Button/AppButton";

type HeaderTypePage = {
    isAuth: boolean
    login?: string
    logout: () => void
}

const Header = (props: HeaderTypePage) => {
    return (
        <header className={s.header}>
            <img src={logo} alt=""/>
            <div className={s.name}>{'Social Network'}</div>
            <div className={s.loginBlock}>
                {props.isAuth
                    ? <> <p className={s.login}>{props.login}</p> <AppButton title={'Log out'} clickCallback={props.logout}/></>
                    : <NavLink to={'/login'}><AppButton title={'Login'}/></NavLink>}
            </div>
        </header>
    )
}


export default Header;