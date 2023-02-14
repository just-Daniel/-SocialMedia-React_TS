import { ResultCodesEnum } from './../api/api';
import { Dispatch } from "react";
import { FormAction, stopSubmit } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { profileAPI, usersAPI } from "../api/api";
import { PhotosType, PostType, ProfileType } from "../Types/types";
import { AppStateType } from "./redux-store";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';



type InitialStateType = typeof initialState

const initialState = {
    postData: [
        {id: 0, message: 'Hi, everybody', totalLike: 13},
        {id: 1, message: 'I glad to see you again', totalLike: 20},
        {id: 2, message: 'Already done!', totalLike: 5}
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    newPostText: ''
}

const profileReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch(action.type){
        case ADD_POST: {
            let newPost = {
                id: 3,
                message: action.newPostText,
                totalLike: 0
            };

            return {
                ...state,
                postData: [...state.postData, newPost],
                newPostText: ''
            }
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: {
                    ...state.profile,
                    photos: action.payload
                } as ProfileType
            }
        }

        default: 
            return state;
    }
}

type ActionTypes = AddPostActionCreatorActionCreator | SetUserProfileActionType | 
    SetStatusActionType | SavePhotoSuccessActionType;

type AddPostActionCreatorActionCreator = {
    type: typeof ADD_POST
    newPostText: string
}
export const addPostActionCreator = (newPostText: string): AddPostActionCreatorActionCreator => ({ type: ADD_POST, newPostText }); 

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE,
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({type: SET_USER_PROFILE, profile})

type SetStatusActionType = {
    type: typeof SET_STATUS,
    status: string
}
export const setStatus = (status: string): SetStatusActionType => ({type: SET_STATUS, status});

type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS
    payload: PhotosType
}
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({type: SAVE_PHOTO_SUCCESS, payload: photos})


/*  Thunk  */

type ThunkDispatchType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>;

export const getUserProfile = (userId: number):  ThunkDispatchType => async (dispatch) => {
    const res = await usersAPI.getUserProfile(userId);
    dispatch(setUserProfile(res.data));
}

export const getUserStatus = (userId: number):  ThunkDispatchType => async (dispatch) => {
    const res = await profileAPI.getUserStatus(userId);
    dispatch(setStatus(res.data));
}

export const updateUserStatus = (status: string):  ThunkDispatchType => async (dispatch) => {
    const res = await profileAPI.updateUserStatus(status);

    if (res.data.resultCode === ResultCodesEnum.Success) {
        dispatch(setStatus(status))
    }
}

export const savePhoto = (file: any):  ThunkDispatchType => async (dispatch) => {
    const res = await profileAPI.savePhoto(file);
    
    if (res.data.resultCode === 0) {
        
        dispatch(savePhotoSuccess(res.data.data.photos))
    }
}

export const saveProfile = (profile: ProfileType) => async (dispatch: Dispatch<ThunkDispatchType | FormAction> , getState: () => AppStateType) => {
    const userId = getState().auth.userId as number;
    const res = await profileAPI.saveProfile(profile);
    
    if (res.data.resultCode === ResultCodesEnum.Success) {
        dispatch(getUserProfile(userId));        
    } else {
        dispatch(stopSubmit('edit-profile', {_error: res.data.messages[0] || 'Error'}));
        return Promise.reject((res.data.messages[0]))
    }
}

export default profileReducer;