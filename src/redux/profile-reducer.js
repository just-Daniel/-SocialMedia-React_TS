import { stopSubmit } from "redux-form";
import { profileAPI, usersAPI } from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

const initialState = {
    postData : [
        {id: 0, message: 'Hi, everybody', totalLike: 13},
        {id: 1, message: 'I glad to see you again', totalLike: 20},
        {id: 2, message: 'Already done!', totalLike: 5}
    ],
    profile: null,
    status: ''
}

const profileReducer = (state = initialState, action) => {
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
                }
            }
        }

        default: 
            return state;
    }
}


export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText }); 
export const setUserProfile = profile => ({type: SET_USER_PROFILE, profile})
export const setStatus = status => ({type: SET_STATUS, status})
export const savePhotoSuccess = photos => ({type: SAVE_PHOTO_SUCCESS, payload: photos})



export const getUserProfile = (userId) => async (dispatch) => {
    const res = await usersAPI.getUserProfile(userId);
    dispatch(setUserProfile(res.data));
}

export const getUserStatus = (userId) => async (dispatch) => {
    const res = await profileAPI.getUserStatus(userId);
    dispatch(setStatus(res.data));
}

export const updateUserStatus = (status) => async (dispatch) => {
    const res = await profileAPI.updateUserStatus(status);

    if (res.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}

export const savePhoto = file => async dispatch => {
    const res = await profileAPI.savePhoto(file);
    
    if (res.data.resultCode === 0) {
        
        dispatch(savePhotoSuccess(res.data.data.photos))
    }
}

export const saveProfile = profile => async (dispatch, getState) => {
    const userId = getState().auth.userId; 
    const res = await profileAPI.saveProfile(profile);
    
    if (res.data.resultCode === 0) {
        dispatch(getUserProfile(userId));        
    } else {
        dispatch(stopSubmit('edit-profile', {_error: res.data.messages[0] || 'Error'}));
        return Promise.reject((res.data.messages[0]))
    }
}

export default profileReducer;