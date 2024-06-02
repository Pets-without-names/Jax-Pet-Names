import { React, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Openai from 'openai';
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
    reset,
    // clearErrors,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      theme: '',
      quantity: '1',
      gender: 'male',
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
          {
            role: 'system',
            content: `You are a creative assistant who generates creative and unique pet names.
              Return the response in JSON format always using a key of pet_names.`,
          },
          {
            role: 'user',
            content: `create ${quantity} random ${gender} pet names with a ${theme} theme.  
            Return ${quantity} pet names.
            Return only the names.  
            Never return a same name from the previous response.
            Never return more than five names.
            If the theme is not words return a value of null`,
          },
        ],
        model: 'gpt-3.5-turbo',
        response_format: { type: 'json_object' },
        max_tokens: 75,
        temperature: 0.5,
      });
      const names = JSON.parse(completion.choices[0].message.content);
      const namesArray = names.pet_names;
      let namesList = '';
      for (let i = 0; i < namesArray.length; i++) {
        namesList = namesList + ' ' + namesArray[i];
      }
      setAiResponse(namesList);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = () => {
    callOpenai();
    reset();
  };
  const onError = (errors) => {
    console.log('error: ' + errors);
    //Other error handling code:
  };

  useEffect(() => {
    if (useForm.isSubmitSuccessful) {
      reset({
        theme: '',
        quantity: '1',
        gender: 'male',
      });
    }
  }, [reset, isSubmitSuccessful, gender, quantity, theme]);

  return (
    <div className='openai-container'>
      <h2>Let AI generate your pet names!</h2>
      <form
        className='openai-card'
        autoComplete='off'
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <h3>You can generate up to 5 names and pick a theme</h3>
        <label htmlFor='quantity'>
          Number of Pet Names{' '}
          <select
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

        <div className='textarea'>
          <label htmlFor='theme'>Theme: </label>
          <textarea
            name='theme'
            cols='35'
            rows='1'
            maxLength={'35'}
            {...register('theme', {
              required: 'Please enter a theme',
              onChange: (event) => setTheme(event.target.value),
              value: { theme },
            })}
          ></textarea>
        </div>
        <p className='errors'>{errors.theme?.message}</p>
        <div className='button'>
          <button type='submit'>Show me some names!</button>
        </div>
      </form>
      <div className='results-container'>
        <p>{aiResponse}</p>
      </div>
    </div>
  );
}

export default OpenaiComponent;
