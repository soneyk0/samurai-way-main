import React from "react";
import s from './Dialogs.module.css'
import {NavLink} from "react-router-dom";
import {message} from "antd";

const DialogItem = (props: any) => {
    let path = '/dialogs/' + props.id;

    return <div className={s.dialog + ' ' + s.active}>
        <NavLink to={path}>{props.name}</NavLink>
    </div>

}

const Message = (props: any) => {
    return <div className={s.message}>{props.message}</div>
}

const Dialogs = (props: any) => {

    let dialogs = [
        {id: 1, name: 'Yana'},
        {id: 2, name: 'Dimych'},
        {id: 3, name: 'Alina'},
        {id: 4, name: 'Anna'},
        {id: 5, name: 'Nikita'},
        {id: 6, name: 'Sveta'}
    ]

    let dialogsElements = dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)


    let messages = [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How is your it-kamasutra?'},
        {id: 3, message: 'Yo'},
        {id: 4, message: 'Yo'},
        {id: 5, message: 'Yo'},
        {id: 6, message: 'Yo'}
    ]

    let messagesElements =messages.map(m=><Message message={m.message}/>)



    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
        </div>

    )
}

export default Dialogs;