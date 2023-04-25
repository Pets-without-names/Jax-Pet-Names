import React, { useEffect, useState } from "react";
import "../styles/styles.css";

function Main() {
  const [isMale, setIsMale] = useState(true);
  const [petName, setPetName] = useState("Artie");

  const handleClick = () => {
    console.log("button clicked");
    fetch("http://localhost:3001/names/9")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPetName(data[0].name);
      })
      .catch((error) => console.log("crap: " + error));
  };

  useEffect(() => {}, [isMale]);

  return (
    <main>
      <h2>A tool to randomly generate a dog or cat name!</h2>
      <div className="btn-genders">
        <button
          type="button"
          onClick={() => {
            setIsMale(true);
          }}
          className={isMale ? "custom-button active" : "custom-button"}
        >
          Male
        </button>
        <button
          type="button"
          onClick={() => {
            setIsMale(false);
          }}
          className={isMale ? "custom-button" : "custom-button active"}
        >
          Female
        </button>
      </div>
      <div className="btn-generate">
        <button type="button" onClick={handleClick}>
          Generate
        </button>
      </div>
      <div className="card-container">
        <p>{petName}</p>
      </div>
    </main>
  );
}

export default Main;
