import React, { useCallback, useEffect, useState } from 'react';
import '../styles/main.css';

function Main() {
  const [isMale, setIsMale] = useState(true);
  // const [petName, setPetName] = useState();
  const [names, setNames] = useState([]); //an array of 5 names

  const getName = useCallback(() => {
    fetch(`http://localhost:3001/names?is_male=${isMale}`)
      .then((response) => response.json())
      .then((data) => {
        const names = data.map((pet) => {
          return pet.name;
        });
        // setPetName(data[0].name);
        setNames(names);
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
            <p>{names[0]}</p>
          </div>
        </div>
        <aside>
          <div className='aside-content'>
            <h3>Other names you may like:</h3>
            <div className='aside-card'>
              <p>{names[1]}</p>
            </div>
            <div className='aside-card'>
              <p>{names[2]}</p>
            </div>
            <div className='aside-card'>
              <p>{names[3]}</p>
            </div>
            <div className='aside-card'>
              <p>{names[4]}</p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default Main;
