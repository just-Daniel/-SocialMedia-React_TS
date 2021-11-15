import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { Field, reduxForm} from 'redux-form';
import { maxLengthCreator, required } from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormControls/FormControls';

const maxLength30 = maxLengthCreator(30);

const MyPosts = (props) => {
  let postElement = props.postData
    .map(i => <Post messages={ i.message } totalLike={ i.totalLike } key={i.id} />);

  const addPostText = value => {
    props.addPost(value.newPostText);
  }

    return (
        <div className={ s.postsBlock }>
          <h3>My posts</h3>

          <AddProfilePost onSubmit={ addPostText } />

          <div className={s.posts}>
            { postElement }
          </div>

        </div>
    )
}

let AddProfilePost = props => {
  return (
    <form onSubmit={ props.handleSubmit } >
      <Field 
        component={ Textarea } 
        name='newPostText' 
        validate={[ required, maxLength30 ]}
      />
      <div>
        <button>Add</button>
      </div>
    </form>
  )
}

AddProfilePost = reduxForm({form: 'profileAddNewPost'})(AddProfilePost);

export default MyPosts;