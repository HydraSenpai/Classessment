import styled from 'styled-components';

const TestScores = ({ tests }) => {
  if (tests.length === 0) {
    return (
      <Wrapper>
        <h3 className='title'>No Grades Entered...</h3>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <table cellSpacing='0'>
        <tr>
          <th>Grade Item</th>
          <th>Calculated Weight</th>
          <th>Grade</th>
          <th>Range</th>
          <th>Percentage</th>
        </tr>
        {tests.map((testScore, index) => {
          const { name, score } = testScore;
          return (
            <tr className='light'>
              <td>{name}</td>
              <td>n/a</td>
              <td>n/a</td>
              <td>n/a</td>
              <td>{score}</td>
            </tr>
          );
        })}
        <tr className='darker'>
          <td>CLASS TOTAL:</td>
          <td>100%</td>
          <td>n/a</td>
          <td>0-100</td>
          <td>total score%</td>
        </tr>
      </table>
    </Wrapper>
  );
};

export default TestScores;

const Wrapper = styled.div`
  .test-container {
    display: flex;
    flex-direction: column;
  }
  .test-list {
    display: flex;
    gap: 2em;
  }
  .bold {
    font-weight: 600;
    font-size: 1.4em;
  }
  table {
    margin: 0;
    padding: 0;
    border-radius: var(--borderRadius);
  }
  th {
    font-weight: 600;
    font-size: 1.5em;
    padding: 0.3em 1em;
    text-align: center;
    background-color: var(--grey-300);
    transition: var(--transition);
  }
  td {
    font-size: 1.1em;
    padding: 0em 1em;
    text-align: center;
    transition: var(--transition);
  }
  .light {
    //background-color: var(--grey-50);
    transition: var(--transition);
  }
  .light:hover {
    background-color: var(--grey-100);
  }
  .darker {
    background-color: var(--grey-300);
    transition: var(--transition);
  }
  .title {
    margin-top: 1em;
  }
`;
