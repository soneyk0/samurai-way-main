import React from "react";
import s from './Dialogs.module.css'
import {NavLink} from "react-router-dom";


const Dialogs = () => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <div className={s.dialog + ' ' + s.active}>
                   <NavLink to='/dialogs/1'>Yana</NavLink>
                </div>
                <div className={s.dialog}>
                    <NavLink to='/dialogs/2'>Dimych</NavLink>
                </div>
                <div className={s.dialog}>
                    <NavLink to='/dialogs/3'>Alina</NavLink>
                </div>
                <div className={s.dialog}>
                    <NavLink to='/dialogs/4'>Anna</NavLink>
                </div>
                <div className={s.dialog}>
                    <NavLink to='/dialogs/5'>Nikita</NavLink>
                </div>
                <div className={s.dialog}>
                    <NavLink to='/dialogs/6'>Sveta</NavLink>
                </div>
            </div>
            <div className={s.messages}>
                <div className={s.message}>Hi</div>
                <div className={s.message}>How is your it-kamasutra?</div>
                <div className={s.message}>Yo</div>
            </div>
        </div>

    )
}

export default Dialogs;