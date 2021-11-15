import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { required } from '../../utils/validators/validators';
import { Input } from '../common/FormControls/FormControls';
import { login } from '../../redux/auth-reducer';
import { Redirect } from 'react-router';
import styles from './Login.module.css';

const LoginForm = props => {
    console.log('props LOgin:', props);
    return (
        <form onSubmit={ props.handleSubmit }>
            <div>
                <Field component={Input} validate={[required]} name='email' placeholder='Email' type="text" />
            </div>
            <div>
                <Field component={Input} validate={[required]} name='password' placeholder='Password' type="password" />
            </div>
            <div>
                <Field component={Input} name='rememberMe' type="checkbox" /> remember me
            </div>
            { 
                props.error && 
                <div className={styles.formSummaryError}>
                    {props.error}
                </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

const Login = props => {
    const onSubmit = value => {
        props.login(value.email, value.password, value.rememberMe)
    }

    if (props.isAuth) {
        return <Redirect to='/profile' />
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={ onSubmit } />
        </div>
    )
}

const mapStateToProps = state => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login);