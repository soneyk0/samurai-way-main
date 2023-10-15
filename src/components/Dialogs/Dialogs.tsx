import React from "react";
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogsItem";
import Message from "./Message/Message";
import {DialogPageType} from "../../redux/store";
import {Field, InjectedFormProps, reduxForm} from "redux-form";

export type DialogType = {
    sendMessage: (newMessageBody:string) => void
    dialogsPage: DialogPageType
    isAuth: boolean
}
type FormDataType={
    newMessageBody:string,
}


const Dialogs = (props: DialogType) => {

    let state = props.dialogsPage


    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)
    let messagesElements = state.messages.map(m => <Message message={m.message} id={m.id}/>)


    let addNewMessageChange = (values:FormDataType) => {
        props.sendMessage(values.newMessageBody)
    }


    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
            </div>
            <div>
                <AddMessageFormRedux onSubmit={addNewMessageChange}/>
            </div>
        </div>

    )
}


const AddMessageForm:React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={'textarea'} name={'newMessageBody'} placeholder={'Enter your message'}/>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}


const AddMessageFormRedux = reduxForm<FormDataType>({form: 'dialogAddMessageForm'})(AddMessageForm)

export default Dialogs;