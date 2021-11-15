import { profileAPI, usersAPI } from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

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
        default: 
            return state;
    }
}


export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText }); 
export const setUserProfile = profile => ({type: SET_USER_PROFILE, profile})
export const setStatus = status => ({type: SET_STATUS, status})




export const getUserProfile = (userId) => (dispatch) => {
    usersAPI.getUserProfile(userId)
    .then(res => dispatch(setUserProfile(res.data))); 
}
export const getUserStatus = (userId) => (dispatch) => {
    profileAPI.getUserStatus(userId)
        .then(res => dispatch(setStatus(res.data)))
}
export const updateUserStatus = (status) => (dispatch) => {
    profileAPI.updateUserStatus(status).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    })
}


export default profileReducer;