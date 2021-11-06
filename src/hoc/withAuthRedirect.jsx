import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

const mapStateToProps = state => ({
    isAuth: state.auth.isAuth
})

export const withAuthRedirect = Component => {
    const RedirectComponent = props => {
        if (!props.isAuth) return <Redirect to='login' />

        return <Component {...props} />
    }

    const ConnectRedirectAuthComponent = connect(mapStateToProps)(RedirectComponent);

    return ConnectRedirectAuthComponent
}