import React from 'react';

const FormRow = ({ name, type, labelText }) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText}
      </label>
      <input type={type} className='form-input' name={name} />
    </div>
  );
};

export default FormRow;
