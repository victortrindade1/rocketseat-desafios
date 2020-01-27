import React from 'react';
import './PerfilPhoto.css';
import perfilPhoto from '../../assets/profile-avatar.png';

const Photo = () => {
  return <img src={perfilPhoto} className="perfil-photo" />;
};

export default Photo;
