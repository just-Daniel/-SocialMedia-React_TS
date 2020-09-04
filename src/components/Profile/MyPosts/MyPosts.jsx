import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = (props) => {

  let postElement = props.postData
    .map(i => <Post messages={ i.messages } totalLike={ i.totalLike } />);

    return (
        <div className={ s.postsBlock }>
          <h3>My posts</h3>

          <div>
            <div>
              <textarea name="" id="" cols="30" rows="10"></textarea>
            </div>
            <div>
              <button>Add</button>
            </div>
          </div>

          <div className={s.posts}>
            { postElement }
          </div>

        </div>
    )
}

export default MyPosts;