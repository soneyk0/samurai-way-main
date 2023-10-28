import React, {FC} from "react";
import {WrappedFieldProps} from "redux-form/lib/Field";
import s from './FormsControls.module.css'
import {Field} from "redux-form";


export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const {input} = props
    return <FormControl {...props}><textarea {...input} {...props}/></FormControl>
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input} = props
    return <FormControl  {...props}><input {...input} {...props}/></FormControl>
}
const FormControl: React.FC<WrappedFieldProps> = (
    {
        input,
        children,
        meta,
        ...props
    }) => {
    const hasError = meta.touched && meta.error
    return <div className={s.formControl + ' ' + (hasError ? s.error : "")}>
        <div>{children}</div>
        {hasError && <span>{meta.error}</span>}
    </div>
}

export const createField = (placeholder: string | null, name: string, validators: ((value: string) => undefined | string)[], component: FC<WrappedFieldProps>, props = {}, text = '') => (
    <div>
        <Field placeholder={placeholder}
               component={component}
               name={name}
               validate={validators}
               {...props}
        />{text}
    </div>
)