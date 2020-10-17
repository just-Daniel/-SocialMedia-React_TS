const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';

const initialState = {
    users : [
        // {id: 0, userPhoto: 'https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2013/7/17/1374074739277/Elon-Musk-001.jpg?width=700&quality=85&auto=format&fit=max&s=79f4f7b8c688b57c8082eb4cc45d653a', followed: false, fullName: 'Daniel', status: 'I am a boss', location: {city: 'Minsk', country: 'Belarus'} },
        // {id: 1, userPhoto: 'https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2013/7/17/1374074739277/Elon-Musk-001.jpg?width=700&quality=85&auto=format&fit=max&s=79f4f7b8c688b57c8082eb4cc45d653a', followed: true, fullName: 'Sasha', status: 'I am a boss too', location: {city: 'Moscow', country: 'Russia'} },
        // {id: 2, userPhoto: 'https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2013/7/17/1374074739277/Elon-Musk-001.jpg?width=700&quality=85&auto=format&fit=max&s=79f4f7b8c688b57c8082eb4cc45d653a', followed: false, fullName: 'Andrew', status: 'I am a boss too', location: {city: 'Kiev', country: 'Ukraine'} },
    ]
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
                users: [...state.users, ...action.users]
            };
        default: 
            return state;
    }
}


export const followAC = (userId) => ( {type: FOLLOW, userId} );
  
export const unfollowAC = (userId) => ( { type: UNFOLLOW, userId } );

export const setUsersAC = (users) => ({ type: SET_USERS, users})

export default usersReducer;