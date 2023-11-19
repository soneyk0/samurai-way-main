import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {loginTC, logoutTC} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {AppRootStateType} from "../../redux/redux-store";
import style from './../common/FormsControls/FormsControls.module.css'
import s from './Login.module.css'
import {Alert} from "@mui/material";


export type LoginFormData = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
}

type LoginType = {
    login: (payload:LoginFormData) => void
    logout: () => void
    isAuth: boolean
    captchaUrl: string
}

const LoginForm: React.FC<InjectedFormProps<LoginFormData, {captchaUrl: string}> & {captchaUrl: string}> = ({handleSubmit, error,captchaUrl}) => {
    return (
        <div>
        <form onSubmit={handleSubmit} className={s.formBox}>
            <div className={s.inputItem}>
                <div>Email</div>
                {createField('Please enter your email', 'email', [required], Input)}
            </div>
            <div className={s.inputItem}>
                <div>Password</div>
                {createField('Please enter your password', 'password', [required], Input, {type: 'password'})}
            </div>
            <div className={s.textRemember}>Remember me</div>
            <div className={s.checkboxItem}>
                {createField(null, 'rememberMe', [],Input , {type: 'checkbox'})}
            </div>
            <div className={s.captchaItem}>
                {captchaUrl && <img src={captchaUrl}/>}
                {captchaUrl && createField('Symbols from image', 'captcha', [required], Input, {})}
            </div>

            <div className={s.buttonLogin}>
                <button>Login</button>
            </div>
        </form>
            {error && <Alert variant="filled" severity="error" className={style.formSummaryError}>
                {error}
            </Alert>}
        </div>
    )
}

const LoginReduxForm = reduxForm<LoginFormData,{captchaUrl: string}>({form: 'login'})(LoginForm)
const Login = (props: LoginType) => {
    const onSubmit = (formData: LoginFormData) => {

        props.login(formData)
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
}

const mapStateToProps = (state: AppRootStateType) => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})
export default connect(mapStateToProps, {login: loginTC, logout: logoutTC})(Login)