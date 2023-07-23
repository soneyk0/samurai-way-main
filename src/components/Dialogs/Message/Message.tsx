import React, {useRef} from "react";
import s from './../Dialogs.module.css'
import {NavLink} from "react-router-dom";
import {message} from "antd";
import {PostsMessages} from "../../../redux/State";



const Message = (props: PostsMessages) => {

    const newMessageElement=useRef<HTMLTextAreaElement>(null);
    const newMessage=()=>{
        alert(newMessageElement.current?.value)
    }

    return (
    <div>
        <div className={s.message}>{props.message}</div>
        {/*<div>*/}
        {/*    <textarea ref={newMessageElement}></textarea>*/}
        {/*</div>*/}
        {/*<div>*/}
        {/*    <button onClick={newMessage}>Add</button>*/}
        {/*</div>*/}
    </div>
    )
}

export default Message;