import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { required } from '../../utils/validators/validators';
import { createField, Input } from '../common/FormControls/FormControls';
import { login } from '../../redux/auth-reducer';
import { Redirect } from 'react-router';
import styles from './Login.module.css';

const LoginForm = ({handleSubmit, error}) => {
    
    return (
        <form onSubmit={ handleSubmit }>
            { createField(Input, [required], 'email', 'Email', {type: 'email'}) }
            { createField(Input, [required], 'password', 'Password', {type: 'password'}) }
            { createField(Input, [], 'rememberMe', '', {type: 'checkbox'}, 'remember me') }
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