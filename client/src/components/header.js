import React from "react";
import petlogo from "../images/petlogo.jpg";

function Header() {
  return (
    <div className="header">
      <h1>
        <img src={petlogo} alt="dog and cat outline" />
        Pet Name Generator
      </h1>
    </div>
  );
}

export default Header;
