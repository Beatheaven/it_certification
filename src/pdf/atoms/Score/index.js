import React from 'react';
import { Image, View } from '@react-pdf/renderer';
import PropTypes from 'prop-types';

import IconStar from 'assets/images/icon-star.png';

import styles from './styles';

const Score = ({ category }) => {
  const sortCategory = [
    'Tradisional',
    'Tradisional Utama',
    'Tradisional Teladan',
    'Berkembang',
    'Berkembang Utama',
    'Berkembang Teladan',
    'Modern',
    'Modern Utama',
    'Modern Teladan'
  ];
  return (
    <View style={styles.container}>
      {sortCategory.map((_, i) =>
        i < sortCategory.indexOf(category) + 1 ? (
          <Image key={i} src={IconStar} style={styles.icon} />
        ) : (
          <View key={i} style={styles.circle} />
        )
      )}
    </View>
  );
};

Score.propTypes = {
  category: PropTypes.string
};

Score.defaultProps = {
  category: ''
};

export default Score;
