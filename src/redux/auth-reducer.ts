import { ResultCodesEnum, ResultCodesForCaptchaEnum } from './../api/api';
import { FormAction, stopSubmit } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { securityAPI, authAPI } from "../api/api";
import { AppStateType } from "./redux-store";

const SET_USER_DATA = 'SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';

type InitialStateType = {
    userId: null | number,
    email: null | string,
    login: null | string,
    isAuth: false | boolean,
    captchaUrl: null | string
}

let initialState: InitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
};

const authReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA: 
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload as InitialStateType
            }
        default: 
            return state
    }
}

type ActionTypes = SetAuthUserDataActionType | GetCaptchaUrlSuccessActionType;

type SetAuthUserDataActionPayloadType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
export type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA
    payload: SetAuthUserDataActionPayloadType
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
    type: SET_USER_DATA, 
    payload: {userId, email, login, isAuth}
});

type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: string 
}

export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType => ({type: GET_CAPTCHA_URL_SUCCESS, payload: captchaUrl});

/*  Thunk */

type ThunkActionType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes | FormAction >

export const authUser = (): ThunkActionType => async (dispatch) => {
    const res = await authAPI.auth();
    
    if (res.resultCode === ResultCodesEnum.Success) {
        let {id, login, email} = res.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null): ThunkActionType => async (dispatch) => {
    const res = await authAPI.login(email, password, rememberMe, captcha)
    
    if (res.resultCode === ResultCodesEnum.Success) {
        dispatch(authUser());
    } else  {
        if (res.resultCode === ResultCodesForCaptchaEnum.CaptchaIsRequired) {
            dispatch(getCaptchaUrl());
        } 

        let message = res.messages.length > 0 ? res.messages : 'Email or password incorrect';
        dispatch(stopSubmit('login', {_error: message}))
    }
}

export const getCaptchaUrl = (): ThunkActionType => async (dispatch) => {
    const res = await securityAPI.getCaptchaUrl();
    const captchaUrl = res.data.url;
    
    dispatch(getCaptchaUrlSuccess(captchaUrl));   
}

export const logout = (): ThunkActionType => async (dispatch) => {
    const res = await authAPI.logout()
    
    if (res.data.resultCode === ResultCodesEnum.Success) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export default authReducer;