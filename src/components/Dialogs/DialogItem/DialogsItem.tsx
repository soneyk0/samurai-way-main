import React from "react";
import s from './../Dialogs.module.css'
import {NavLink} from "react-router-dom";
import {message} from "antd";
import {DialogsType} from "../../../redux/store";

const DialogItem = (props: DialogsType) => {
    let path = '/dialogs/' + props.id;

    return <div className={s.dialog + ' ' + s.active}>
        <NavLink to={path}>{props.name}</NavLink>
    </div>

}

export default DialogItem;