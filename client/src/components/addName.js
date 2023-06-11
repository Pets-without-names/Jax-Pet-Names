import { React, useState } from 'react';
import { useForm } from 'react-hook-form';
import '../styles/addName.css';

function AddName() {
  const [addedName, setAddedName] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);

  // React Hook Form setup:
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
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
    clearErrors('name');
  };

  const onSubmit = (formData) => {
    // POST API call
    fetch('http://localhost:3001/names', {
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
        //Code for data
        setAddedName(data.name);
        setIsOpen(true); //will trigger the modal to open
      })
      .catch((error) => console.log(error));
    reset({ name: '' }); //clears the form values
  };

  const onError = (errors) => {
    console.log('error: ' + errors);
    //Other error handling code:
  };

  const closeModal = (event) => {
    setIsOpen(false);
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
          />
        </label>
        <small>{errors.name?.message}</small>
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
        <p>{addedName} has been added</p>
        <button id='close-btn' onClick={closeModal}>
          OK
        </button>
      </div>
    </div>
  );
}

export default AddName;
