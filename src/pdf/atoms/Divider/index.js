import React from 'react';
import PropTypes from 'prop-types';
import { View } from '@react-pdf/renderer';

import styles from './styles';

const Divider = ({ color, fixed }) => (
  <View style={{ alignItems: 'center' }}>
    <View
      style={{
        ...styles.divider,
        backgroundColor: color,
        width: fixed ? 512 : '100%'
      }}
    />
  </View>
);

Divider.propTypes = {
  color: PropTypes.string,
  fixed: PropTypes.bool
};

Divider.defaultProps = {
  color: 'black',
  fixed: false
};

export default Divider;
