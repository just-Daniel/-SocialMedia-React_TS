const ADD_MESSAGE = 'ADD-MESSAGE';

type DialogType = {
    id: number
    name: string
}

type MessageType = {
    id: number
    message: string
}

const initialState = {
    dialogsData : [
        {id: 1, name: 'Daniel'},
        {id: 2, name: 'Tolik'},
        {id: 3, name: 'Anna'},
        {id: 4, name: 'Love'},  
        {id: 5, name: 'Janet'},
        {id: 6, name: 'Grace'},
    ] as Array<DialogType>,
    messagesData : [
        {id: 1, message: 'hi'},
        {id: 2, message: 'hi Bro'},
        {id: 3, message: 'glad to see you here'},
    ] as Array<MessageType>,
    newMessageText: ''
}

type InitialStateType = typeof initialState;

const dialogReducer = (state: InitialStateType = initialState, action: AddMessageActionCreatorActionType): InitialStateType => {
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

type AddMessageActionCreatorActionType = {
    type: typeof ADD_MESSAGE
    newMessage: string
}

export const addMessageActionCreator = (newMessage: string): AddMessageActionCreatorActionType => ({ type: ADD_MESSAGE, newMessage });

export default dialogReducer;