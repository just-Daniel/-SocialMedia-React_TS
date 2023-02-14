import React from 'react';
import { connect } from 'react-redux';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { required } from '../../utils/validators/validators';
import { createField, Input } from '../common/FormControls/FormControls';
import { login } from '../../redux/auth-reducer';
import { Redirect } from 'react-router';
import styles from './Login.module.css';
import { AppStateType } from '../../redux/redux-store';

type LoginFormOwnProps = {
    captchaUrl: string | null 
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, error, captchaUrl}) => {
    
    return (
        <form onSubmit={ handleSubmit }>
            { createField(Input, [required], 'email', 'Email', {type: 'email'}) }
            { createField(Input, [required], 'password', 'Password', {type: 'password'}) }
            { createField(Input, [], 'rememberMe', '', {type: 'checkbox'}, 'remember me') }
            { captchaUrl && <img src={captchaUrl} alt='captcha' /> }
            { captchaUrl && createField(Input, [required], 'captcha', 'Symbols for image') }
            { 
                error && 
                <div className={styles.formSummaryError}>
                    { error }
                </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<LoginFormValuesType | LoginFormOwnProps>({ form: 'login' })(LoginForm)

type MapStateToPropsType = {
    isAuth: boolean
    captchaUrl: string | null
}

type MapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string | null) => void
}

type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

const Login: React.FC<MapStateToPropsType & MapDispatchToPropsType> = props => {
    const onSubmit = (value: LoginFormValuesType) => {
        props.login(value.email, value.password, value.rememberMe, value.captcha)
    }

    if (props.isAuth) {
        return <Redirect to='/profile' />
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={ onSubmit } captchaUrl={props.captchaUrl} />
        </div>
    )
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, {login})(Login);