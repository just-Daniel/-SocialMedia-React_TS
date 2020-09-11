const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_TEXT_MESSAGE = 'UPDATE-NEW-POST-TEXT-MESSAGE';

const dialogReducer = (state, action) => {
    switch (action.type) {
        case 'ADD-MESSAGE':
            let item = {
                id: 4,
                message: state.newMessageText
             }
              state.messagesData.push(item);
              state.newMessageText = '';
              return state;
        case 'UPDATE-NEW-POST-TEXT-MESSAGE': 
            state.newMessageText = action.newText;
            return state;
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