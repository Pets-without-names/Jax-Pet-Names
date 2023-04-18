import React, { useEffect, useState } from "react";
import "../styles/styles.css";

function Main() {
  const [isMale, setIsMale] = useState(true);
  useEffect(() => {}, [isMale]);

  return (
    <main>
      <h2>A tool to randomly generate a dog or cat name!</h2>
      <div className="btn-genders">
        <button type="button">Male</button>
        <button type="button">Female</button>
      </div>
      <div className="btn-generate">
        <button type="button">Generate</button>
      </div>

      <div className="card-container">
        <h3>Generated name</h3>
      </div>
    </main>
  );
}

export default Main;
