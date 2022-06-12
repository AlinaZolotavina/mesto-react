import React from 'react';
import logoPath from '../images/logo.svg';

function Header() {
  return (
    <header className="header">
      <img className="header__logo" alt="логотип" src={logoPath}/>
    </header>
  )
};

export default Header;