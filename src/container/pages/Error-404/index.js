// Error404 Component
// --------------------------------------------------------

import React, { Component } from 'react';
// templates
import { ErrorPage } from 'container/templates';
// styles
import './styles.scss';
// image
import image from 'assets/images/dummy/error-404.png';

class Error404 extends Component {
  render() {
    return (
      <ErrorPage
        className="p-error404"
        image={image}
        title="Halaman yang Dicari Tidak Ditemukan."
        subTitle="Sepertinya halaman ini sudah berubah atau tidak ada."
        buttonText="Kembali ke Beranda"
        buttonTo={'token' in localStorage ? '/' : '/login'}
      />
    );
  }
}

export { Error404 as default };
