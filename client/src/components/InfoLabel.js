import styled from 'styled-components';

const InfoLabel = ({ text }) => {
  return (
    <Wrapper>
      <h4>{text}</h4>
    </Wrapper>
  );
};

export default InfoLabel;

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
