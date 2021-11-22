import { usersAPI } from "../api/api";
import { updateObjectInArray } from "../utils/object-helpers";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

const initialState = {
    users : [
        // {id: 0, userPhoto: 'https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2013/7/17/1374074739277/Elon-Musk-001.jpg?width=700&quality=85&auto=format&fit=max&s=79f4f7b8c688b57c8082eb4cc45d653a', followed: false, fullName: 'Daniel', status: 'I am a boss', location: {city: 'Minsk', country: 'Belarus'} },
        // {id: 1, userPhoto: 'https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2013/7/17/1374074739277/Elon-Musk-001.jpg?width=700&quality=85&auto=format&fit=max&s=79f4f7b8c688b57c8082eb4cc45d653a', followed: true, fullName: 'Sasha', status: 'I am a boss too', location: {city: 'Moscow', country: 'Russia'} },
        // {id: 2, userPhoto: 'https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2013/7/17/1374074739277/Elon-Musk-001.jpg?width=700&quality=85&auto=format&fit=max&s=79f4f7b8c688b57c8082eb4cc45d653a', followed: false, fullName: 'Andrew', status: 'I am a boss too', location: {city: 'Kiev', country: 'Ukraine'} },
    ],
    pageSize: 5,
    totalUsersCount: 1,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}

const usersReducer = (state = initialState, action) => {
    switch(action.type){
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            };
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
            };
        case SET_USERS: 
            return {
                ...state,
                users: action.users
            };
        case SET_CURRENT_PAGE: 
            return {
                ...state, currentPage: action.currentPage
            };
        case SET_TOTAL_USERS_COUNT: 
            return {
                ...state, totalUsersCount: action.totalUsersCount
            };
        case TOGGLE_IS_FETCHING: 
            return {
                ...state, isFetching: action.isFetching
        };    
        case TOGGLE_IS_FOLLOWING_PROGRESS: 
            return {
                ...state, 
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            };    
        default: 
            return state;
    }
}


export const followAC = (userId) => ( {type: FOLLOW, userId} );
export const unfollowAC = (userId) => ( { type: UNFOLLOW, userId } );
export const setUsersAC = (users) => ({ type: SET_USERS, users});
export const setCurrentPageAC = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalUsersCountAC = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount})
export const toggleIsFetchingAC = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const toggleIsFollowingProgressAC = (isFetching, userId) => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId});

export const getUsersThunkCreator = (currentPage, pageSize) => async (dispatch) => {
    dispatch(toggleIsFetchingAC(true));
    dispatch(setCurrentPageAC(currentPage));

    const data = await usersAPI.getUsers(currentPage, pageSize);

    dispatch(toggleIsFetchingAC(false));
    dispatch(setUsersAC(data.items));
    dispatch(setTotalUsersCountAC(data.totalCount));
}

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleIsFollowingProgressAC(true, userId))

    const data = await apiMethod(userId);

    if (data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleIsFollowingProgressAC(false, userId));
}

export const followUsers = (userId) => async (dispatch) => {
    const apiMethod = usersAPI.follow.bind(usersAPI);
    
    followUnfollowFlow(dispatch, userId, apiMethod, followAC)
}

export const unfollowUsers = (userId) => async (dispatch) => {
    const apiMethod = usersAPI.unfollow.bind(usersAPI);

    followUnfollowFlow(dispatch, userId, apiMethod, unfollowAC)
}


export default usersReducer;