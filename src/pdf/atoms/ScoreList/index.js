import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from '@react-pdf/renderer';

import styles from './styles';

const ScoreList = ({ no, label, score, maxScore, isHigh, isLow }) => {
  return (
    <View style={styles.container}>
      <View style={styles.no}>
        <Text>{no}</Text>
      </View>
      <View style={styles.legend}>
        <Text style={styles.label}>{label}</Text>
        <Text
          style={[styles.score, isLow && styles.low, isHigh && styles.high]}
        >
          {score}/{maxScore}
        </Text>
      </View>
    </View>
  );
};

ScoreList.propTypes = {
  no: PropTypes.number,
  label: PropTypes.string,
  score: PropTypes.number,
  maxScore: PropTypes.number,
  isHigh: PropTypes.bool,
  isLow: PropTypes.bool
};

ScoreList.defaultProps = {
  no: 0,
  label: '',
  score: 0,
  maxScore: 10,
  isHigh: false,
  isLow: false
};

export default ScoreList;
