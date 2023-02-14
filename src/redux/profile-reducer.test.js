import profileReducer, { addPostActionCreator } from "./profile-reducer"

let state = {
    postData : [
        {id: 0, message: 'Hi, everybody', totalLike: 13},
        {id: 1, message: 'I glad to see you again', totalLike: 20},
        {id: 2, message: 'Already done!', totalLike: 5}
    ]
};

test('length of postData should be incremented', () => {  
    let action = addPostActionCreator('newText');

    let newState = profileReducer(state, action);

    expect(newState.postData.length).toBe(4);
})

test('message of new post should be correct ', () => {
    let action = addPostActionCreator('newText');
    let newState = profileReducer(state, action);

    expect(newState.postData[3].message).toBe('newText');
})