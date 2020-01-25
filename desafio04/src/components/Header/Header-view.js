import React from 'react';
import './Header.css';

import Logo from '../Icons/FacebookLogo';
import Meuperfil from './MeuPerfil/';

const Header = () => {
  return (
    <div className="header">
      <Logo className="logo" />
      <Meuperfil className="meu-perfil" />
    </div>
  );
};

export default Header;
