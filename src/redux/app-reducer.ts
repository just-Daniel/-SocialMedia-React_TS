import { AppStateType } from './redux-store';
import { ThunkAction } from "redux-thunk";
import { authUser } from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

type InitialSateType = {
    initialized: boolean
}

let initialState: InitialSateType = {
    initialized: false
};

const appReducer = (state: InitialSateType = initialState, action: InitializedSuccessActionType): InitialSateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: 
            return {
                ...state,
                initialized: true
            }
        default: 
            return state
    }
}

type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

export const initializedSuccess = (): InitializedSuccessActionType => ({type: INITIALIZED_SUCCESS});

/*  Thunk  */

type ThunkActionType = ThunkAction<void, AppStateType, unknown, InitializedSuccessActionType>

export const initializeApp = (): ThunkActionType => (dispatch) => {
    const authPromise = dispatch(authUser());

    authPromise.then(() => {
        dispatch(initializedSuccess())
    })
}

export default appReducer;