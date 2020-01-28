import React from 'react';

import HeaderPost from './HeaderPost/';
import Comment from './Comment/';

import './PostList-Post.css';

const Post = ({ data }) => {
  // const Post = props => {
  const { content } = data;
  // const { content } = props.data;
  // const content = props.data.content;

  return (
    <li>
      <div className="post">
        <HeaderPost data={data} />
        <div className="body-post">{content}</div>
        <hr className="divider" />
        <ul>
          {data.comments.map(comment => (
            <Comment key={comment.id} data={comment} />
          ))}
        </ul>
        {/* <Comment /> */}
      </div>
    </li>
  );
};

export default Post;
