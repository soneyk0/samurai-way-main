import React, {ReactChildren, ReactPropTypes} from "react";
import s from './AppButton.module.css'

export interface ButtonProps{
    title:string
    clickCallback?: () => void;
    children?:any
}
const AppButton=({title, clickCallback, children}:ButtonProps)=>{
    return(
        <button className={s.appButton} onClick={clickCallback}>{children? children: title}</button>
    )
}

export default AppButton