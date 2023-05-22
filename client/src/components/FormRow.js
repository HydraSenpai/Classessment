import React from 'react';

const FormRow = ({ name, type, labelText, handleChange, value }) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText}
      </label>
      <input
        type={type}
        value={value}
        className='form-input'
        name={name}
        onChange={handleChange}
      />
    </div>
  );
};

export default FormRow;
