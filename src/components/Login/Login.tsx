import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {loginTC, logoutTC} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {AppRootStateType} from "../../redux/redux-store";
import style from './../common/FormsControls/FormsControls.module.css'


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
        <form onSubmit={handleSubmit}>
            {createField('Email', 'email', [required], Input)}
            {createField('Password', 'password', [required], Input, {type: 'password'})}
            {createField(null, 'rememberMe', [], Input, {type: 'checkbox'}, 'remember me')}

            {captchaUrl && <img src={captchaUrl}/>}
            {captchaUrl && createField('Symbols from image', 'captcha', [required], Input, {})}

            {error && <div className={style.formSummaryError}>
                {error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
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