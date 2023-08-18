import { React, useState } from 'react';
import { useForm } from 'react-hook-form';
import '../styles/addName.css';

function AddName() {
  const [addedName, setAddedName] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);
  const [uniqeModalIsOpen, setUniqueModalIsOpen] = useState(false);
  const [uniqueError, setUniqueError] = useState(false);

  // React Hook Form setup:
  const {
    register,
    handleSubmit,
    reset,
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
  };

  const onSubmit = (formData) => {
    // POST API call
    fetch(`http://localhost:3001/names`, {
      // fetch(`${process.env.REACT_APP_HOST}/names`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        console.log(response);
        //unique constraint error
        if (response.status === 598) {
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
      .finally(() => {
        // setUniqueError(false);
      });
    reset({ name: '' }); //clears the form values from the user
  };

  const onError = (errors) => {
    console.log('error: ' + errors);
    //Other error handling code:
  };

  const closeModal = (event) => {
    setIsOpen(false);
    setUniqueModalIsOpen(false);
    setUniqueError(false);
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

        <div>
          <label>Gender: </label>
          <input
            type='radio'
            id='male'
            value={true}
            name='is_male'
            checked={true}
            {...register('is_male')}
          />
          <label htmlFor='male'>Male</label>
          <input
            type='radio'
            id='female'
            value={false}
            name='is_male'
            {...register('is_male')}
          />
          <label htmlFor='female'>Female</label>
        </div>
        <div>
          <button type='submit'>Add Name</button>
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
      {/* <div
        className={`unique-error-modal ${uniqeModalIsOpen ? 'is-open' : ''}`}
      >
        <p>name already exists</p>
        <button id='close-btn' onClick={closeModal}>
          OK
        </button>
      </div> */}
    </div>
  );
}

export default AddName;
