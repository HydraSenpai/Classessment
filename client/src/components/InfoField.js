import { useState } from 'react';
import styled from 'styled-components';

const InfoField = ({ value, field }) => {
  return (
    <Wrapper>
      <div className='data-container' field={field}>
        <h4>{value || '...'}</h4>
      </div>
    </Wrapper>
  );
};

export default InfoField;

const Wrapper = styled.div`
  .info-container {
    display: grid;
    grid-template-columns: 10em;
    grid-template-rows: auto;
  }
  .title {
    margin-bottom: 1.5em;
  }
  h4 {
    text-transform: none;
  }
  @media screen and (max-width: 950px) {
    h4 {
      font-size: 1.2em;
    }
  }
`;
