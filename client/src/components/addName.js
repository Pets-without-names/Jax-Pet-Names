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

  const onSubmit = async (formData) => {
    //POST API call
    try {
      const response = fetch(`http://localhost:3001/names/`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': ' multipart/form-data',
        },
        body: JSON.stringify(formData),
      });
      console.log(response);
      // const data = await response.json();
      // response.send(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleErrors = (errors) => {
    console.log('error: ' + errors);
    //Other error handling code:
  };

  return (
    <div className='add-name-container'>
      <h2>Want to add a name to the database?</h2>
      <form
        onSubmit={handleSubmit(onSubmit, handleErrors)}
        method='POST'
        encType='multipart/form-data'
        autoComplete='off'
      >
        <label>
          Name:{' '}
          <input
            type='text'
            name='petName'
            {...register('petName', { required: 'Name is required' })}
          />
        </label>
        <small>{errors?.petName && errors.petName.message}</small>
        <br></br>

        <div>
          <label>Gender: </label>
          <input
            type='radio'
            id='male'
            value={true}
            name='isMale'
            checked={true}
            {...register('isMale')}
          />
          <label htmlFor='male'>Male</label>
          <input
            type='radio'
            id='female'
            value={false}
            name='isMale'
            {...register('isMale')}
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
