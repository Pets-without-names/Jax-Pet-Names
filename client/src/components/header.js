import React from 'react';
import petlogo from '../images/petlogo-transparent.png';
import petlogo2 from '../images/petlogo2.png';
import '../styles/header.css';

function Header() {
  return (
    <header>
      <img src={petlogo} alt='dog and cat outline' />
      <h1>Pet Name Generator</h1>
      <img src={petlogo2} alt='dog and cat outline' />
    </header>
  );
}

export default Header;
