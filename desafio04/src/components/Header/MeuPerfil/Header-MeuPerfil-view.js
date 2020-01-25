import React from 'react';
import './Header-MeuPerfil.css';

import UserIcon from '../../Icons/UserIcon';

const MeuPerfil = () => {
  return (
    <div className="meu-perfil-container">
      <div className="meu-perfil">Meu perfil </div>
      <UserIcon className="user-icon" />
    </div>
  );
};

export default MeuPerfil;
