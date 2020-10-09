const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_TEXT_MESSAGE = 'UPDATE-NEW-POST-TEXT-MESSAGE';

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
                message: state.newMessageText
             }
            //   state.messagesData.push(item);
            //   state.newMessageText = '';
            //   return state;


            // let stateCopy = {...state};
            //  stateCopy.messagesData = [...state.messagesData];

            // stateCopy.messagesData.push(item);
            // stateCopy.newMessageText = '';
            // return stateCopy;

            return {
                ...state,
                messagesData: [...state.messagesData, item],
                newMessageText: ''
            };

        }
        case 'UPDATE-NEW-POST-TEXT-MESSAGE': {
            // state.newMessageText = action.newText;
            // return state;


            // let stateCopy = {...state};
            // stateCopy.newMessageText = action.newText;
            // return stateCopy;

            return {
                ...state,
                newMessageText: action.newText
            };
        }
        default: 
             return state;
    }
};

export const addMessageActionCreator = () => ( {type: ADD_MESSAGE} );

export const updateMessageActionCreator = (text) => (
    {
        type: UPDATE_NEW_TEXT_MESSAGE,
        newText: text
    }
)

export default dialogReducer;