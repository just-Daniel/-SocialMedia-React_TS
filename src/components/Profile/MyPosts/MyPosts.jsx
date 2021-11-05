import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = (props) => {
  let postElement = props.postData
    .map(i => <Post messages={ i.message } totalLike={ i.totalLike } key={i.id} />);
  // React.createRef() - create link 
  let newPostElement = React.createRef();

  let onAddPost = () => {
    props.addPost();
  }
  let onPostChange = () => {
    let text = newPostElement.current.value;
    props.updateNewPostText(text)
  }

    return (
        <div className={ s.postsBlock }>
          <h3>My posts</h3>

          <div>
            <div>
              {/* привязуем здесь ссылку */}
              <textarea ref={ newPostElement } 
                        onChange={ onPostChange }
                        value={ props.newPostText } />
            </div>
            <div>
              <button onClick={ onAddPost }>Add</button>
            </div>
          </div>

          <div className={s.posts}>
            { postElement }
          </div>

        </div>
    )
}

export default MyPosts;