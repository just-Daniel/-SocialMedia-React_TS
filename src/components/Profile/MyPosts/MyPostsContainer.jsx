import React from 'react';
import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';

const MyPostsContainer = (props) => {
  let state = props.store.getState();

  let addPost = () => {
    props.store.dispatch(addPostActionCreator());
  }
  let updateNewPostText = (text) => {
    let action = updateNewPostTextActionCreator(text)
    props.store.dispatch(action);
  }

    return (
        <MyPosts addPost={ addPost } 
                 updateNewPostText={ updateNewPostText } 
                 postData={ state.profilePage.postData }
                 newPostText = { state.profilePage.newPostText }
        />
    )
}

export default MyPostsContainer;