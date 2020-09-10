const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_TEXT_MESSAGE = 'UPDATE-NEW-POST-TEXT-MESSAGE';

let store = {
    _state : {
        profilePage : {
            postData : [
                {id: 0, message: 'Hi, everybody', totalLike: 13},
                {id: 1, message: 'I glad to see you again', totalLike: 20},
                {id: 2, message: 'Already done!', totalLike: 5}
            ],
            newPostText: 'In my heart peace'
        },
        dialogPage: {
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
            newMessage: 'write here'
        },
        sidebar: {
            sidebarLink: [
                {id: 0, name: 'Profile', link: '/profile'},
                {id: 1, name: 'Messages', link: '/dialogs'},
                {id: 2, name: 'News', link: '/news'},
                {id: 3, name: 'Music', link: '/music'},
                {id: 4, name: 'Setting', link: '/setting'}
            ],
            info: {
                title: {id: 0, name: 'Friends'},
                content: [
                    {id: 0, name: 'Tolik', img: `https://www.clipartmax.com/png/middle/11-118245_circle-shape-clip-art-black-and-white-circle-shapes-clipart-black-and.png`},
                    {id: 1, name: 'Anna', img: `https://thumbs.dreamstime.com/b/happy-yellow-cartoon-smiley-face-character-expression-happy-yellow-cartoon-smiley-face-character-expression-illustration-120324536.jpg`},
                    {id: 2, name: 'Love', img: `https://shop.iglu.lv/uploads/products/large/sezampaliknis-smaidins-oranzs.jpg`},
                ]
            } 
        }
    },
    _callSubscriber() {
        console.log('State changed');
    },

    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        if(action.type === 'ADD-POST') {
            let newPost = {
                id: 3,
                message: this._state.profilePage.newPostText,
                totalLike: 0
            };
        
            this._state.profilePage.postData.push(newPost);
            this._state.profilePage.newPostText = '';
            this._callSubscriber(this._state);
        } else if (action.type === 'UPDATE-NEW-POST-TEXT') {
            this._state.profilePage.newPostText = action.newText;
            this._callSubscriber(this._state);
        } else if (action.type === 'ADD-MESSAGE') {
            let item = {
                id: 4,
                message: this._state.dialogPage.newMessage
             }
              this._state.dialogPage.messagesData.push(item);
              this._callSubscriber(store.getState());
              this._state.dialogPage.newMessage = '';
        } else if (action.type === 'UPDATE-NEW-POST-TEXT-MESSAGE') {
            this._state.dialogPage.newMessage = action.newText
            this._callSubscriber(this.getState());
        }
    }
};

//  POST
export const addPostActionCreator = () => ( {type: ADD_POST} );
  
export const updateNewPostTextActionCreator = (text) => (
    {
      type: UPDATE_NEW_POST_TEXT,
      newText: text
    }
);

//  MESSAGE
export const addMessageActionCreator = () => ( {type: ADD_MESSAGE} );

export const updateMessageActionCreator = (text) => (
    {
        type: UPDATE_NEW_TEXT_MESSAGE,
        newText: text
    }
)
  

window.store = store;
export default store;