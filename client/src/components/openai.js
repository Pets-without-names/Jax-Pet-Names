import React from 'react';
import { useState } from 'react';
import '../styles/openai.css';

function OpenaiComponent() {
  const [prompt, setPrompt] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [gender, setGender] = useState('Male');
  const [completion, setCompletion] = useState('');

  const callOpenai = () => {
    fetch(`${process.env.REACT_APP_HOST}/openai`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data: ' + data);
        setCompletion(data[0]);
      })
      .catch((error) => console.log(error));
  };

  const handleClick = () => {
    callOpenai();
  };

  return (
    <div className='openai-container'>
      <h2>Let AI generate your pet names!</h2>
      <div className='openai-card'>
        <p>You can generate up to 5 names and pick a theme</p>
        <div className='quantity-container'>
          <label htmlFor='quantity'>Number of Pet Names</label>
          <select
            name='quantity'
            id='quantity'
            onChange={(e) => setQuantity(e.target.value)}
          >
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </select>
          <label htmlFor='gender'>Gender</label>
          <select name='gender' onChange={(e) => setGender(e.target.value)}>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
          </select>
        </div>
        <div className='text-container'>
          <label htmlFor='theme'>Theme:</label>
          <textarea
            name='theme'
            id='theme'
            cols='40'
            rows='2'
            onChange={(e) => setPrompt(e.target.value)}
          ></textarea>
        </div>
        <div className='button'>
          <button onClick={handleClick}>Generate</button>
        </div>
        <div className='results-container'></div>
      </div>
    </div>
  );
}

export default OpenaiComponent;