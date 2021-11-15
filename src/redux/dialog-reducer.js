const ADD_MESSAGE = 'ADD-MESSAGE';

const initialState = {
    dialogsData : [
        {id: 1, name: 'Daniel'},
        {id: 2, name: 'Tolik'},
        {id: 3, name: 'Anna'},
        {id: 4, name: 'Love'},  
        {id: 5, name: 'Janet'},
        {id: 6, name: 'Grace'},
    ],
    messagesData : [
        {id: 1, message: 'hi'},
        {id: 2, message: 'hi Bro'},
        {id: 3, message: 'glad to see you here'},
    ],
    newMessageText: ''
}

const dialogReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD-MESSAGE': {
            let item = {
                id: 4,
                message: action.newMessage
             }

            return {
                ...state,
                messagesData: [...state.messagesData, item]
            };
        }
        
        default: 
             return state;
    }
};

export const addMessageActionCreator = (newMessage) => ({ type: ADD_MESSAGE, newMessage });

export default dialogReducer;