const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

const initialState = {
    postData : [
        {id: 0, message: 'Hi, everybody', totalLike: 13},
        {id: 1, message: 'I glad to see you again', totalLike: 20},
        {id: 2, message: 'Already done!', totalLike: 5}
    ],
    newPostText: 'In my heart peace'
}

const profileReducer = (state = initialState, action) => {
    switch(action.type){
        case 'ADD-POST': {
            let newPost = {
                id: 3,
                message: state.newPostText,
                totalLike: 0
            };
        
            // state.postData.push(newPost);
            // state.newPostText = '';
            // return state;



            // let stateCopy = {...state};
            // stateCopy.postData = [...state.postData];

            // stateCopy.postData.push(newPost);
            // stateCopy.newPostText = '';
            // return stateCopy;
 
            return {
                ...state,
                postData: [...state.postData, newPost],
                newPostText: ''
            }

        }
        case 'UPDATE-NEW-POST-TEXT': {
            // state.newPostText = action.newText;
            // return state;


            // let stateCopy = {...state};

            // stateCopy.newPostText = action.newText;
            // return stateCopy;


            return {
                ...state,
                newPostText: action.newText
            }
        }
        default: 
            return state;
    }
}


export const addPostActionCreator = () => ( {type: ADD_POST} );
  
export const updateNewPostTextActionCreator = (text) => (
    {
      type: UPDATE_NEW_POST_TEXT,
      newText: text
    }
);

export default profileReducer;