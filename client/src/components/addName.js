import { React, useCallback, useEffect, useState } from 'react';
import '../styles/addName.css';

function AddName() {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('Male');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleGenderChange = useCallback((genderValue) => {
    setGender(genderValue);
    // console.log('gender: ' + gender);
  }, []);

  const handleOnChange = (event) => {
    handleGenderChange(event.target.value);
  };

  const handleSubmit = (event) => {
    event.prevent.default();
  };

  useEffect(() => {
    handleGenderChange(gender);
  }, [handleGenderChange, gender]);

  return (
    <div className='add-name-container'>
      <h2>Want to add a name to the database?</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:{' '}
          <input type='text' value={name} onChange={handleNameChange}></input>
        </label>
        <br></br>

        <div>
          <label>Gender: </label>
          <input
            type='radio'
            id='male'
            value='Male'
            name='gender'
            checked={gender === 'Male'}
            onChange={handleOnChange}
          />
          <label htmlFor='male'>Male</label>
          <input
            type='radio'
            id='female'
            value='Female'
            name='gender'
            checked={gender === 'Female'}
            onChange={(event) => {
              setGender(event.target.value);
              console.log('gender: ' + gender);
            }}
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
