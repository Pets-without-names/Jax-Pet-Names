import React from "react";
import petlogo from "../images/petlogo.jpg";
import "../styles/header.css";

function Header() {
  return (
    <header>
      <img src={petlogo} alt="dog and cat outline" />
      <h1>Pet Name Generator</h1>
    </header>
  );
}

export default Header;
