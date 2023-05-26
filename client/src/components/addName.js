import { React } from 'react';
import { useForm } from 'react-hook-form';
import '../styles/addName.css';

function AddName() {
  // React Hook Form setup:
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const onSubmit = (formData) => {
    // POST API call
    console.log('form data:' + JSON.stringify(formData));
    fetch('http://localhost:3001/names', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        response.json();
      })
      .then((data) => {
        //Code for data
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  const onError = (errors) => {
    console.log('error: ' + errors);
    //Other error handling code:
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
          />
        </label>
        <small>{errors.petName?.message}</small>
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
    </div>
  );
}

export default AddName;
