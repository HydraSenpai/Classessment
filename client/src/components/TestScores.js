import styled from 'styled-components';

const TestScores = ({ tests }) => {
  return (
    <Wrapper>
      <table>
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
            <tr className={index % 2 === 0 ? 'dark' : 'light'}>
              <td>{name}</td>
              <td>n/a</td>
              <td>n/a</td>
              <td>n/a</td>
              <td>{score}</td>
            </tr>
          );
        })}
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

  th {
    font-weight: 600;
    font-size: 1.4em;
    padding: 0.3em 1em;
    text-align: center;
    background-color: var(--grey-400);
    transition: var(--transition);
  }
  td {
    font-size: 1.1em;
    padding: 0em 1em;
    text-align: center;
    transition: var(--transition);
  }
  .dark {
    background-color: var(--grey-200);
    transition: var(--transition);
  }
  .dark:hover {
    background-color: var(--grey-300);
  }
  .light {
    background-color: var(--grey-50);
    transition: var(--transition);
  }
  .light:hover {
    background-color: var(--grey-100);
  }
`;
