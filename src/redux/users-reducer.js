import { usersAPI } from "../api/api";

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
                users: state.users.map(u => {
                    if(u.id === action.userId){
                        return {...u, followed: true};
                    };
                    return u;
                })
            };
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if(u.id === action.userId){
                        return {
                            ...u, 
                            followed: false
                        }
                    };
                    return u;
                })
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

export const getUsersThunkCreator = (currentPage, pageSize) => {
    return (dispatch) => {
        dispatch(toggleIsFetchingAC(true));
        dispatch(setCurrentPageAC(currentPage));
    
        usersAPI.getUsers(currentPage, pageSize).then(data => {
            dispatch(toggleIsFetchingAC(false));
            dispatch(setUsersAC(data.items));
            dispatch(setTotalUsersCountAC(data.totalCount));
        }); 
    }
}

export const followUsers = (userId) => {
    return (dispatch) => {
        dispatch(toggleIsFollowingProgressAC(true, userId))
                             
        usersAPI.follow(userId).then(data => {
            if (data.resultCode === 0) {
                dispatch(followAC(userId))
            }
            dispatch(toggleIsFollowingProgressAC(false, userId));
        })
    }
}
export const unfollowUsers = (userId) => {
    return (dispatch) => {
        dispatch(toggleIsFollowingProgressAC(true, userId))
                             
        usersAPI.unfollow(userId).then(data => {
            if (data.resultCode === 0) {
                dispatch(unfollowAC(userId))
            }
            dispatch(toggleIsFollowingProgressAC(false, userId));
        })
    }
}


export default usersReducer;