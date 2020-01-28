import React from 'react';
import './PostList-Post-Comment.css';
import PerfilPhoto from '../../../PerfilPhoto/PerfilPhoto';

const Comment = ({ data }) => {
  return (
    <div className="box-comment">
      <div className="photo">
        <PerfilPhoto perfilPhoto={data.author.avatar} />
      </div>
      <div className="comment">
        <span className="name-comment">{data.author.name}</span>
        {data.content}
      </div>
    </div>
  );
};

export default Comment;
