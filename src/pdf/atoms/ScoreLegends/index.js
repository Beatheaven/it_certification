import React from 'react';
import PropTypes from 'prop-types';
import ScoreList from '../ScoreList';

const ScoreLegends = ({ data, startFrom, highest, lowest }) => {
  return data.map((legend, index) => (
    <ScoreList
      key={index}
      no={startFrom + index + 1}
      label={legend.group}
      score={legend.score}
      maxScore={legend.maxScore}
      isHigh={highest.includes(legend.score)}
      isLow={lowest.includes(legend.score)}
    />
  ));
};

ScoreLegends.propTypes = {
  data: PropTypes.array,
  highest: PropTypes.array,
  lowest: PropTypes.array,
  startFrom: PropTypes.number
};

ScoreLegends.defaultProps = {
  data: [],
  highest: [],
  lowest: [],
  startFrom: 0
};

export default ScoreLegends;
