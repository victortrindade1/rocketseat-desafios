import React from 'react';
import HeaderPost from './HeaderPost/';
import Comment from './Comment/';
import './PostList-Post.css';

const Post = () => {
  return (
    <>
      <HeaderPost />
      <div className="body-post">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio saepe
        deserunt magnam eos impedit perspiciatis quos quisquam doloribus
        reiciendis officiis unde aliquid accusantium rerum dolorum, excepturi,
        ullam veniam voluptatibus quam.
      </div>
      <hr className="divider" />
      <Comment />
    </>
  );
};

export default Post;
