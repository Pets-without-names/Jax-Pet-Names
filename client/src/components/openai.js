import { React, useState } from 'react';
import { useForm } from 'react-hook-form';
import Openai from 'openai';
import '../styles/openai.css';

function OpenaiComponent() {
  // eslint-disable-next-line
  const [prompt, setPrompt] = useState('');
  const [quantity, setQuantity] = useState();
  const [gender, setGender] = useState('Male');
  // eslint-disable-next-line
  const [aiResponse, setAiResponse] = useState('');

  // React Hook Form setup:
  const {
    register,
    handleSubmit,
    // eslint-disable-next-line
    reset,
    // eslint-disable-next-line
    clearErrors,
    // eslint-disable-next-line
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      theme: '',
      quantity: '1',
      gender: 'Male',
    },
  });

  const callOpenai = async () => {
    const openai = new Openai({
      apiKey: `${process.env.REACT_APP_OPENAI_KEY}`,
      dangerouslyAllowBrowser: true,
    });
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          { role: 'system', content: 'You are a creative assistant.' },
          {
            role: 'user',
            content: `create ${quantity} random ${gender} pet names.`,
          },
        ],
        model: 'gpt-3.5-turbo',
        max_tokens: 75,
        temperature: 0.8,
      });
      console.log(completion.choices[0].message.content);
      setAiResponse(completion.choices[0].message.content);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = () => {
    console.log(quantity);
    callOpenai();
    reset();
  };
  const onError = (errors) => {
    console.log('error: ' + errors);
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
        <h3>You can generate up to 5 names and pick a theme</h3>
        <div className='quantity-container'>
          <label htmlFor='quantity'>Number of Pet Names</label>
          <select
            name='quantity'
            id='quantity'
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
              console.log(quantity);
            }}
            {...register('quantity', { required: 'Select a number' })}
          >
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </select>
          <label htmlFor='gender'>Gender</label>
          <select
            name='gender'
            onChange={(e) => setGender(e.target.value)}
            {...register('gender')}
          >
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
          </select>
        </div>
        <div className='text-container'>
          <label htmlFor='theme'>
            Theme:{' '}
            <textarea
              name='theme'
              id='theme'
              cols='40'
              rows='2'
              maxLength={75}
              onChange={(e) => setPrompt(e.target.value)}
              {...register('theme', { required: 'Please enter a theme' })}
            ></textarea>
          </label>
          <p className='errors'>{errors.theme?.message}</p>
        </div>
        <div className='button'>
          <button type='submit'>Show me some names!</button>
        </div>
      </form>
      <div className='results-container'>
        <p>Results</p>
      </div>
    </div>
  );
}

export default OpenaiComponent;
