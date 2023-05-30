import styled from 'styled-components';

const FormRow = ({ name, type, labelText, handleChange, value, max, min }) => {
  return (
    <Wrapper>
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
          max={max}
          min={min}
          step='any'
        />
      </div>
    </Wrapper>
  );
};

export default FormRow;

const Wrapper = styled.div`
  .form-row {
    padding-bottom: 0;
    margin-bottom: 0;
  }
`;
