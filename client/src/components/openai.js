import { React, useState } from 'react';
import { useForm } from 'react-hook-form';
import '../styles/openai.css';

function OpenaiComponent() {
  const [theme, setTheme] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [gender, setGender] = useState('male');
  const [aiResponse, setAiResponse] = useState('');

  // React Hook Form setup:
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      theme: '',
      quantity: '1',
      gender: 'male',
    },
  });

  const onSubmit = (formData) => {
    fetch(`${process.env.REACT_APP_HOST}/ainames`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //loop through the api response names:
        const namesData = JSON.parse(data.choices[0].message.content);
        const namesArray = namesData.names;
        const namesList = namesArray.map((name, i) => <li key={i}>{name}</li>);
        setAiResponse(namesList);
      })
      .catch((error) => {
        console.log(error.message);
        setAiResponse(<li>Oops. Something went wrong!</li>);
      });
  };

  const onError = (errors) => {
    console.log('error: ' + errors.message + ' ' + errors.name);
    //Other error handling code:
  };

  return (
    <div className='openai-container'>
      <h2>Let AI generate your pet names!</h2>
      <form
        className='openai-card'
        autoComplete='off'
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <label htmlFor='quantity'>
          Number of Pet Names{' '}
          <select
            className='openai-quantity'
            {...register('quantity', {
              value: { quantity },
              onChange: (event) => setQuantity(event.target.value),
            })}
          >
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </select>
        </label>

        <label htmlFor='gender'>
          Gender{' '}
          <select
            {...register('gender', {
              value: { gender },
              onChange: (event) => setGender(event.target.value),
            })}
          >
            <option value='male'>Male</option>
            <option value='female'>Female</option>
          </select>
        </label>

        <label htmlFor='theme' className='themeLabel'>
          Enter a short theme:{' '}
          <textarea
            name='theme'
            rows='1'
            maxLength={'40'}
            placeholder='"Disney characters"'
            {...register('theme', {
              required: 'Please enter a theme',
              onChange: (event) => setTheme(event.target.value),
              value: { theme },
            })}
          ></textarea>
        </label>
        <p className='errors'>{errors.theme?.message}</p>
        <div className='button'>
          <button className='openai-btn' type='submit'>
            AI names!
          </button>
        </div>
      </form>
      <div className='results-container'>
        <ul>{aiResponse}</ul>
      </div>
    </div>
  );
}

export default OpenaiComponent;
