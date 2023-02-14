import { ResultCodesEnum } from './../api/api';
import { UserType } from './../Types/types';
import { usersAPI } from "../api/api";
import { updateObjectInArray } from "../utils/object-helpers";
import { AppStateType } from './redux-store';
import { Dispatch } from 'react';
import { ThunkAction } from 'redux-thunk';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';


const initialState = {
    users : [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 1,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number> // arrays of users ids
}

type InitialState = typeof initialState;

const usersReducer = (state: InitialState = initialState, action: ActionTypes): InitialState => {
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

type ActionTypes = FollowActionType | UnfollowActionType | SetUsersActionType |
 SetCurrentPagedActionType | SetTotalUsersCountActionType | ToggleIsFetchingActionType | 
 ToggleIsFollowingProgressActionType;

type FollowActionType = {
    type: typeof FOLLOW
    userId: number
}
export const followAC = (userId: number): FollowActionType => ( {type: FOLLOW, userId} );
type UnfollowActionType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unfollowAC = (userId: number): UnfollowActionType => ( { type: UNFOLLOW, userId } );
type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
export const setUsersAC = (users: Array<UserType>): SetUsersActionType => ({ type: SET_USERS, users});
type SetCurrentPagedActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPageAC = (currentPage: number): SetCurrentPagedActionType => ({type: SET_CURRENT_PAGE, currentPage});
type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    totalUsersCount: number
}
export const setTotalUsersCountAC = (totalUsersCount: number): SetTotalUsersCountActionType => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount})
type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const toggleIsFetchingAC = (isFetching: boolean): ToggleIsFetchingActionType => ({type: TOGGLE_IS_FETCHING, isFetching});
type ToggleIsFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}
export const toggleIsFollowingProgressAC = (isFetching: boolean, userId: number): ToggleIsFollowingProgressActionType => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId});

//  Thunk

//  First variant 
type GetStateType = () => AppStateType;
type DispatchType = Dispatch<ActionTypes>;
//  Or second variant
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>;

export const getUsersThunkCreator = (currentPage: number, pageSize: number) => async (dispatch: DispatchType, getState: GetStateType) => {
    dispatch(toggleIsFetchingAC(true));
    dispatch(setCurrentPageAC(currentPage));

    const data = await usersAPI.getUsers(currentPage, pageSize);

    dispatch(toggleIsFetchingAC(false));
    dispatch(setUsersAC(data.items));
    dispatch(setTotalUsersCountAC(data.totalCount));
}

type ActionCreatorTypes = (userId: number) => FollowActionType | UnfollowActionType;

const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: any, actionCreator: ActionCreatorTypes) => {
    dispatch(toggleIsFollowingProgressAC(true, userId))

    const data = await apiMethod(userId);

    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleIsFollowingProgressAC(false, userId));
}

export const followUsers = (userId: number): ThunkType => async (dispatch) => {
    const apiMethod = usersAPI.follow.bind(usersAPI);
    
    _followUnfollowFlow(dispatch, userId, apiMethod, followAC)
}

export const unfollowUsers = (userId: number): ThunkType => async (dispatch: any) => {
    const apiMethod = usersAPI.unfollow.bind(usersAPI);

    _followUnfollowFlow(dispatch, userId, apiMethod, unfollowAC)
}


export default usersReducer;