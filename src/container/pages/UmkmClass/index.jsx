import React, { Component } from 'react';
import classname from 'classnames';

import {
  HeaderBannerUmkm,
  Navbar,
  Footer,
  CatalogueClass,
  RecommendedClass
} from 'components';

class UmkmClass extends Component {
  render() {
    const classNames = classname('o-umkm-smart', {});
    return (
      <>
        <div className={classNames}>
          <div className="umkm-header">
            <Navbar />
          </div>
          <HeaderBannerUmkm />
          <div className="container o-umkm-smart__content">
            <RecommendedClass hideButtonViewAll />
            <CatalogueClass />
          </div>
          <Footer />
        </div>
      </>
    );
  }
}

export default UmkmClass;
