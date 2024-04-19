import React from 'react';
import { useState } from 'react';
import Openai from 'openai';
import '../styles/openai.css';

function OpenaiComponent() {
  // eslint-disable-next-line
  const [prompt, setPrompt] = useState('');
  // eslint-disable-next-line
  const [quantity, setQuantity] = useState('1');
  // eslint-disable-next-line
  const [gender, setGender] = useState('Male');
  // eslint-disable-next-line
  const [completion, setCompletion] = useState('');

  const openai = new Openai({
    apiKey: `${process.env.REACT_APP_OPENAI_KEY}`,
    dangerouslyAllowBrowser: true,
  });

  const callOpenai = async () => {
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          { role: 'system', content: 'You are a creative assistant.' },
          {
            role: 'user',
            content:
              'generate one random male dog name.  Return only the name.',
          },
        ],
        model: 'gpt-3.5-turbo',
        max_tokens: 75,
        temperature: 0.8,
      });
      console.log(completion.choices[0].message.content);
    } catch (error) {
      console.log(error);
    }
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
          <button onClick={handleClick}>Show me!</button>
        </div>
        <div className='results-container'></div>
      </div>
    </div>
  );
}

export default OpenaiComponent;
