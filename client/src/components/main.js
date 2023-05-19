import React, { useCallback, useEffect, useState } from 'react';
import '../styles/main.css';

function Main() {
  const [isMale, setIsMale] = useState(true);
  const [petName, setPetName] = useState();

  const getName = useCallback(() => {
    fetch(`http://localhost:3001/names?is_male=${isMale}`)
      .then((response) => response.json())
      .then((data) => {
        setPetName(data[0].name);
      })
      .catch((error) => console.log('crap: ' + error));
  }, [isMale]);

  const handleClick = () => {
    getName();
  };

  useEffect(() => {
    getName();
  }, [getName]);

  return (
    <main>
      <div className='content'>
        <h2>A tool to randomly generate a dog or cat name!</h2>
        <div className='gender-btn-container'>
          <button
            type='button'
            onClick={() => {
              setIsMale(true);
            }}
            className={isMale ? 'gender-btn active male' : 'gender-btn'}
          >
            Male
          </button>
          <button
            type='button'
            onClick={() => {
              setIsMale(false);
            }}
            className={isMale ? 'gender-btn' : 'gender-btn active female'}
          >
            Female
          </button>
        </div>
        <div className='generate-btn-container'>
          <button type='button' onClick={handleClick}>
            Generate
          </button>
        </div>
        <div className='card-container'>
          <p>{petName}</p>
        </div>
      </div>
    </main>
  );
}

export default Main;
