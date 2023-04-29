import React, { useEffect, useState } from "react";
import "../styles/main.css";

function Main() {
  const [isMale, setIsMale] = useState(true);
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
        <button type="button">Generate</button>
      </div>
      <div className="card-container">
        <p>Name</p>
      </div>
    </main>
  );
}

export default Main;
