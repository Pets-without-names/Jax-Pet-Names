import React, { useCallback, useEffect, useState } from 'react';
import '../styles/main.css';

function Main() {
  const [isMale, setIsMale] = useState(true);
  const [petName, setPetName] = useState();

  const getName = useCallback(() => {
      fetch(`${process.env.REACT_APP_HOST}/names?is_male=${isMale}`)
      .then((response) => response.json())
      .then((data) => {
        setPetName(data[0].name);
      })
      .catch((error) => console.log(error));
  }, [isMale]);

  const handleClick = () => {
    getName();
  };

  useEffect(() => {
    getName();
  }, [getName]);

  return (
    <main>
      <h2>A tool to randomly generate a dog or cat name!</h2>
      <div className='flex-container'>
        <div className='content'>
          <div className='gender-btn-container'>
            <button
              type='button'
              onClick={() => {
                setIsMale(true);
              }}
              className={`gender-btn ${isMale ? 'active' : ''}`}
            >
              Male
            </button>
            <button
              type='button'
              onClick={() => {
                setIsMale(false);
              }}
              className={`gender-btn ${isMale ? '' : 'active'}`}
            >
              Female
            </button>
          </div>
          <div className='generate-btn-container'>
            <button
              className='generate-btn'
              type='button'
              onClick={handleClick}
            >
              Generate
            </button>
          </div>
          <div className='card-container'>
            <p>{petName}</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Main;
