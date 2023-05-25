import styled from 'styled-components';

const FormRow = ({ name, type, labelText, handleChange, value }) => {
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
