import profileReducer from "./profile-reducer";
import dialogReducer from "./dialog-reducer";
import sidebarReducer from "./sidebar-reducer";


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
            newMessageText: ''
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
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogPage = dialogReducer(this._state.dialogPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._callSubscriber(this._state);
    }
};


window.store = store;
export default store;