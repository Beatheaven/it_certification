// Comingsoon Component
// --------------------------------------------------------

import React, { Component } from 'react';
// templates
import { ComingSoon } from 'container/templates';
// styles
import './styles.scss';
// image
import image from 'assets/images/dummy/error-404.png';

class ComingS extends Component {
  render() {
    return (
      <ComingSoon
        className="p-error404"
        image={image}
        title="Halaman yang Dicari Belum Ada."
        subTitle="Sepertinya halaman ini masih dalam tahap pengembangan."
        buttonText="Kembali ke Beranda"
        buttonTo={'token' in localStorage ? '/' : '/login'}
      />
    );
  }
}

export { ComingS as default };
