import React from 'react';
import s from './Post.module.css';

const Post = (props) => {

    return (
      <div className={s.item}>
        <img src="https://i.vimeocdn.com/video/882068556_1920x1080.jpg?r=pad" alt="ocean"/>
        { props.messages }
        <div>
          <span>like, {props.totalLike}</span>
        </div>
      </div>
            
    )
}

export default Post;