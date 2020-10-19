const initialState = {
    sidebarLink: [
        {id: 0, name: 'Profile', link: '/profile'},
        {id: 1, name: 'Messages', link: '/dialogs'},
        {id: 2, name: 'Users', link: '/users'},
        {id: 3, name: 'News', link: '/news'},
        {id: 4, name: 'Music', link: '/music'},
        {id: 5, name: 'Setting', link: '/setting'}
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

const sidebarReducer = (state = initialState, action) => {


    return state;
};

export default sidebarReducer;