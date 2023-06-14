import { useState } from 'react';
import styled from 'styled-components';

const InfoField = ({ value, field, editing, handleChange, name, type }) => {
  let fixedValue = value.split('T')[0];
  return (
    <Wrapper>
      <div field={field} className='field'>
        <input
          type={type || 'text'}
          id={name}
          name={name}
          className={editing ? 'input editing' : 'input'}
          value={fixedValue}
          readOnly={!editing}
          onChange={handleChange}
        ></input>
      </div>
    </Wrapper>
  );
};

export default InfoField;

const Wrapper = styled.div`
  .field {
    align-self: center;
  }
  .title {
    margin-bottom: 1.5em;
  }
  .editing {
    border: 2px solid rgba(0, 0, 0, 0.3);
    border-radius: var(--borderRadius);
    //box-shadow: var(--shadow-1);
  }
  input {
    font-size: 1.5em;
    color: var(--black);
    border: none;
    text-transform: none;
    margin-right: 5em;
    padding: 0.1em 0.5em;
    box-sizing: border-box;
  }
  input:focus {
    outline: none;
  }
  @media screen and (max-width: 950px) {
    h4 {
      font-size: 1.2em;
    }
  }
`;
