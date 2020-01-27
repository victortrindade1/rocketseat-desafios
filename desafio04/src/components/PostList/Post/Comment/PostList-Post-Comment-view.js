import React from 'react';
import './PostList-Post-Comment.css';
import PerfilPhoto from '../../../PerfilPhoto/PerfilPhoto';

const Comment = () => {
  return (
    <div className="box-comment">
      <div className="photo">
        <PerfilPhoto />
      </div>
      <div className="comment">
        <span className="name-comment">Teta Tetéia</span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis,
        beatae labore! Neque, eos quas recusandae consequuntur impedit vel iure
        nostrum id. Exercitationem natus, perspiciatis eligendi quas enim
        aliquam esse minima?
      </div>
    </div>
  );
};

export default Comment;
