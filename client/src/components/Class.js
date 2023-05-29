import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Class = ({ name, id }) => {
  return (
    <Wrapper>
      <div className='class'>
        <h5 className='class-title'>{name}</h5>
        <p>Current Score: 50%</p>
        <div className='buttons'>
          <Link to={`/class/${id}`} className='btn btn-main'>
            Edit/Stats
          </Link>
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
    position: relative;
  }
  h5,
  p {
    margin: 0;
    padding: 0;
    text-transform: none;
  }
  p {
    font-size: 0.9em;
  }
  .class-title {
    font-size: 1.3em;
    max-height: 2.7em;
    overflow: hidden;
    margin-bottom: 0.1em;
  }
  .class:hover {
    box-shadow: var(--shadow-4);
  }
  .buttons {
    position: absolute;
    bottom: 1em;
    display: flex;
    gap: 0.25em;
  }
`;
