import { stopSubmit } from "redux-form";
import { authAPI } from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA: 
            return {
                ...state,
                ...action.payload
            }
        default: 
            return state
    }
}

export const setAuthUserData = (userId, email, login, isAuth) => ({type: SET_USER_DATA, payload: {userId, email, login, isAuth}})

export const authUser = () => async dispatch => {
    const res = await authAPI.auth();

    if (res.data.resultCode === 0) {
        let {id, login, email} = res.data.data
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const login = (email, password, rememberMe) => async dispatch => {
    const res = await authAPI.login(email, password, rememberMe)
    
    if (res.data.resultCode === 0) {
        dispatch(authUser());
    } else  {
        let message = res.data.messages.length > 0 ? res.data.messages : 'Email or password incorrect';
        dispatch(stopSubmit('login', {_error: message}))
    }
}

export const logout = () => async dispatch => {
    const res = await authAPI.logout()
    
    if (res.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export default authReducer;