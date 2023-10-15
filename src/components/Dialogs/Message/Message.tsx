import React, {useRef} from "react";
import s from './../Dialogs.module.css'
import {PostsMessages} from "../../../redux/store";



const Message = (props: PostsMessages) => {

    const newMessageElement=useRef<HTMLTextAreaElement>(null);

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