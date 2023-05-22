import styled from 'styled-components';
import img from '../assets/images/landing.svg';

const Landing = () => {
  return (
    <Wrapper>
      <h1 className='title'>Classessment</h1>
      <div className='column'>
        <div>
          <h2>
            Class <span className='bold'>Analysis</span> App
          </h2>
          <p>
            <span className='bold'>Classessment</span> is the go-to class score
            and grade tracking app! Effortlessly enter and edit grades for any
            class into the class profiler and view insightful statistics and
            graphs on your progress. Track current and expected grades to make
            it effortless to achieve your best result. Use Classessment free
            today!
          </p>
          <button className='btn'>Login!</button>
        </div>
        <div>
          <img src={img} alt='classassment main' className='logo' />
        </div>
      </div>
    </Wrapper>
  );
};

export default Landing;

const Wrapper = styled.div`
  margin-top: 2em;
  h1 {
    font-size: 4em;
  }
  .column {
    margin: 5em 8em 0 8em;
    display: flex;
    align-items: center;
  }
  p {
    align-self: center;
    max-width: 65%;
  }
  .bold {
    color: var(--primary-500);
    font-weight: 500;
  }
`;
