import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from '@react-pdf/renderer';

import styles from './styles';

const categories = [
  { name: 'Modern Teladan', minValue: '8.43', maxValue: '10' },
  { name: 'Modern Utama', minValue: '7.39', maxValue: '8.43' },
  { name: 'Modern', minValue: '6.34', maxValue: '7.39' },
  { name: 'Berkembang Teladan', minValue: '5.30', maxValue: '6.34' },
  { name: 'Berkembang Utama', minValue: '4.26', maxValue: '5.30' },
  { name: 'Berkembang', minValue: '3.21', maxValue: '4.26' },
  { name: 'Tradisional Teladan', minValue: '2.17', maxValue: '3.21' },
  { name: 'Tradisional Utama', minValue: '1.12', maxValue: '2.17' },
  { name: 'Tradisional', minValue: '0', maxValue: '1.12' }
];

const ScoreLegends = ({ score }) => {
  const activeIndex = categories.findIndex(
    ({ minValue, maxValue }) => score > minValue && score <= maxValue
  );

  return categories.map(({ name, minValue, maxValue }, index) => (
    <View style={styles.item} key={index}>
      <View style={styles.bullet} />
      {index === activeIndex && <View style={styles.bulletActive} />}
      <Text style={[styles.list]}>
        {name} ({minValue} &lt; skor &lt;= {maxValue})
      </Text>
    </View>
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
