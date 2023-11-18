import { React, useState } from 'react';
import { useForm } from 'react-hook-form';
import '../styles/addName.css';

function AddName() {
  const [inputValue, setInputValue] = useState('');
  const [addedName, setAddedName] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);
  const [uniqueError, setUniqueError] = useState(false);

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

  //Submit the form when the user presses the Enter key
  const handleKeyPress = (event) => {
    if (event.keyCode === 13) {
      setValue('name', capitalize(inputValue));
      handleSubmit(onSubmit);
    }
  };

  const onError = (errors) => {
    console.log('error: ' + errors);
    //Other error handling code:
  };

  //closes the pop up modal when a name is added
  const closeModal = (event) => {
    setIsOpen(false);
    setUniqueError(false);
    reset();
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
        //unique constraint error
        if (response.status === 422) {
          setUniqueError(true);
        }

        return response.json();
      })
      .then((data) => {
        //Code for data
        if (!uniqueError) {
          setAddedName(data.name);
          setIsOpen(true); //will trigger the modal to open
        }
      })
      .catch((error) => console.log(error))
      .finally(
        reset() //clears/resets the form values
      );
  };

  return (
    <div className='add-name-container'>
      <h2>Want to add a name to the database?</h2>
      <form onSubmit={handleSubmit(onSubmit, onError)} autoComplete='off'>
        <label>
          Name:{' '}
          <input
            type='text'
            name='name'
            {...register('name', { required: 'Name is required' })}
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
            {...register('is_male')}
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
        <div>
          <button className='submit-btn' type='submit'>
            Add Name
          </button>
        </div>
      </form>
      <div className={`modal-container ${modalIsOpen ? 'is-open' : ''}`}>
        <p>
          {uniqueError ? 'Name already exists' : `${addedName} has been added`}
        </p>
        <button id='close-btn' onClick={closeModal}>
          OK
        </button>
      </div>
    </div>
  );
}

export default AddName;
