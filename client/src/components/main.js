import React, { useEffect, useState } from 'react';
import '../styles/main.css';

function Main() {
  const [isMale, setIsMale] = useState(true);
  const [petName, setPetName] = useState('Artie');

  const handleClick = async () => {
    try {
      const response = await fetch(`http://localhost:3001/names`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isMale: isMale }),
      });
      const data = await response.json();
      setPetName(data[0].name);
    } catch (error) {
      console.log('crap', error);
    }
  };

  useEffect(() => {}, [isMale]);

  return (
    <main>
      <h2>A tool to randomly generate a dog or cat name!</h2>
      <div className='btn-genders'>
        <button
          type='button'
          onClick={() => {
            setIsMale(true);
          }}
          className={isMale ? 'custom-button active' : 'custom-button'}
        >
          Male
        </button>
        <button
          type='button'
          onClick={() => {
            setIsMale(false);
          }}
          className={isMale ? 'custom-button' : 'custom-button active'}
        >
          Female
        </button>
      </div>
      <div className='btn-generate'>
        <button type='button' onClick={handleClick}>
          Generate
        </button>
      </div>
      <div className='card-container'>
        <p>{petName}</p>
      </div>
    </main>
  );
}

export default Main;
