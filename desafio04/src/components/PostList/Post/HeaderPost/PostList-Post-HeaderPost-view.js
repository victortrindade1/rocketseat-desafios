import React from 'react';
import './PostList-Post-HeaderPost.css';

import PerfilPhoto from '../../../PerfilPhoto/PerfilPhoto';

const HeaderPost = ({ data }) => {
  return (
    <div className="perfil">
      <PerfilPhoto perfilPhoto={data.author.avatar} />
      <div className="box-name-date">
        <div className="name-perfil">{data.author.name}</div>
        <div className="date-post">{data.date}</div>
      </div>
    </div>
  );
};

export default HeaderPost;
