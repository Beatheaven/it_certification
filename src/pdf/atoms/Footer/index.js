import React from 'react';
import { Text, View } from '@react-pdf/renderer';

import styles from './styles';

const Footer = () => (
  <View fixed style={styles.footer}>
    <Text>Diterbitkan oleh PT.Bank Rakyat Indonesia (Persero) Tbk</Text>
  </View>
);

export default Footer;
