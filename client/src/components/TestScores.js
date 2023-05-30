import styled from 'styled-components';

const TestScores = ({ tests }) => {
  return (
    <div>
      {tests.map((testScore) => {
        const { name, score } = testScore;
        return (
          <h5>
            {name}: {score}%
          </h5>
        );
      })}
    </div>
  );
};

export default TestScores;
