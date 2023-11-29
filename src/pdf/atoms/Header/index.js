import React from 'react';
import { Image, View } from '@react-pdf/renderer';

import Logo from 'assets/images/logo/bri-primary.png';

import styles from './styles';

const Header = () => (
  <View fixed style={styles.header}>
    <Image src={Logo} style={styles.brand} />
  </View>
);

export default Header;
