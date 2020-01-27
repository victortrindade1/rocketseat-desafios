import React from 'react';
import './PostList-Post-HeaderPost.css';

import PerfilPhoto from '../../../PerfilPhoto/PerfilPhoto';
const HeaderPost = () => {
  return (
    <div className="perfil">
      <PerfilPhoto />
      <div className="box-name-date">
        <div className="name-perfil">Julio Tetinha</div>
        <div className="date-post">04 Jun 2019</div>
      </div>
    </div>
  );
};

export default HeaderPost;
