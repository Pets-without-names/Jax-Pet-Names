import { React, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import ReactGA from 'react-ga4';
import '../styles/addName.css';

function AddName() {
  const [inputValue, setInputValue] = useState('');
  const [addedName, setAddedName] = useState('');
  const [uniqueError, setUniqueError] = useState(false);
  const modalRef = useRef();

  // React Hook Form setup:
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      name: '',
    },
  });

  //Validate user input for the text input:
  const validateText = (event) => {
    // allow only letters, periods, spaces and hyphens
    event.target.value =
      event.target.value.replace(/[^a-zA-Z. -]+/gi, '') || '';
    setInputValue(event.target.value);
    clearErrors('name');
  };

  //Capitalize the first letter of the user's input:
  const capitalize = (input) => {
    const value = input.trim();
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  const onError = (errors) => {
    console.log('error: ' + errors.message);
    //Other error handling code:
  };

  const closeModal = (event) => {
    setUniqueError(false);
    modalRef.current.close();
  };

  //Allows the enter key to submit the form
  const handleKeyPress = (event) => {
    if (event.keyCode === 13) {
      setValue('name', capitalize(inputValue));
      handleSubmit(onSubmit);
    }
  };

  const onSubmit = (formData) => {
    // POST API call
    fetch(`${process.env.REACT_APP_HOST}/names`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        //unique constraint error(name already exists)
        if (response.status === 422) {
          setUniqueError(true);
          return Promise.reject(response);
        }
        return response.json();
      })
      .then((data) => {
        //Name successfully submitted to the database:
        if (!uniqueError) {
          setAddedName(data[0].name);
          ReactGA.event({
            category: 'Visitor',
            action: 'Added a new name',
          });
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        modalRef.current.showModal();
        //clears/resets the form values
        reset();
        setInputValue('');
      });
  };

  return (
    <div className='add-name-container'>
      <h2>Want to add a name to the database?</h2>
      <form onSubmit={handleSubmit(onSubmit, onError)} autoComplete='off'>
        <label>
          Name:{' '}
          <input
            type='text'
            id='name-input'
            maxLength={30}
            name='name'
            {...register('name', { required: 'Name is required' })}
            value={inputValue}
            onChange={validateText}
            onKeyDown={handleKeyPress}
            onBlur={() => {
              //trim and capitalize:
              setValue('name', capitalize(inputValue));
            }}
          />
        </label>
        <p className='errors'>{errors.name?.message}</p>
        <br></br>

        <div className='gender-inputs'>
          <label id='gender-lbl'>Gender: </label>
          <input
            type='radio'
            id='male'
            value={true}
            name='is_male'
            defaultChecked={true}
            {...register('is_male', { required: 'select a gender' })}
          />
          <label className='input-lbl' htmlFor='male'>
            Male
          </label>
          <input
            type='radio'
            id='female'
            value={false}
            name='is_male'
            {...register('is_male')}
          />
          <label className='input-lbl' htmlFor='female'>
            Female
          </label>
        </div>
        <div className='buttonContainer'>
          <button className='submit-btn' type='submit'>
            Add Name
          </button>
        </div>
      </form>
      <dialog ref={modalRef} id='modal'>
        <div className='vertical-align'>
          <p>
            {uniqueError
              ? 'Name already exists'
              : `${addedName} has been added`}
          </p>
          <button id='close-btn' onClick={closeModal}>
            OK
          </button>
        </div>
      </dialog>
    </div>
  );
}

export default AddName;
