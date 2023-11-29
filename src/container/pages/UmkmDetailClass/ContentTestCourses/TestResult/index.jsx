import React from 'react';
import PropTypes from 'prop-types';

import { H3, TextBody, Button } from 'components';

const TestResult = ({ score, startTest }) => {
  const latestScore = Number(score.latest).toFixed(2);
  const highestScore = Number(score.highest).toFixed(2);

  return (
    <div className="content-test">
      <H3>Selamat, Kamu telah menyelesaikan kursus! </H3>
      <div className="title-deskripsi">
        Berikut ini hasil dari tes terakhir kamu, ayo tingkatkan terus skill
        usahamu
      </div>
      <div className="test-score">
        <TextBody color="primary" weight="bold">
          {latestScore}
        </TextBody>
      </div>
      <div className="title-deskripsi pb-0 mt-32">
        Skor kamu saat ini: <b>{highestScore}</b>
      </div>
      <Button className="my-32" variant="primary" onClick={() => startTest()}>
        Ulangi Tes
      </Button>
    </div>
  );
};

TestResult.propTypes = {
  score: PropTypes.object,
  startTest: PropTypes.func
};

TestResult.defaultProps = {
  score: {},
  startTest: () => {}
};

export default TestResult;
