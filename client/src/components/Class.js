import styled from 'styled-components';

const Class = ({ name }) => {
  return (
    <Wrapper>
      <div className='class'>
        <h3>{name}</h3>
        <p>Current Score: {Math.round(Math.random() * 100)}%</p>
        <div className='buttons'>
          <button className='btn btn-main'>Edit/Stats</button>
        </div>
      </div>
    </Wrapper>
  );
};

export default Class;

const Wrapper = styled.div`
  .class {
    background-color: white;
    transition: var(--transition);
    background: var(--white);
    border-radius: var(--borderRadius);
    box-shadow: var(--shadow-2);
    height: 10em;
    padding: 0.5em 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75em;
  }
  h3,
  p {
    margin: 0;
    padding: 0;
  }
  .class:hover {
    box-shadow: var(--shadow-4);
  }
  .buttons {
    display: flex;
    gap: 0.25em;
  }
`;
