import React, { Component } from 'react';
import {
  Navbar,
  Footer,
  CardDashboardMedium,
  RecommendedClass,
  HeaderBannerUmkm
} from 'components';

import classname from 'classnames';

import ImageCardMediumUMKM from 'assets/images/banner/banner-medium-umkm-smart.png';
import ImageCardMediumUMKMMobile from 'assets/images/banner/banner-medium-umkm-smart-mobile.png';
import KompetensiUsaha from './KompetensiUsaha';
import ListNews from './ListNews';

class UmkmSmart extends Component {
  render() {
    const nextClass = classname('inner-container', {});
    const classNames = classname('o-umkm-smart', {});
    return (
      <div className={nextClass}>
        <div className={classNames}>
          <div className="umkm-header">
            <Navbar />
          </div>
          <HeaderBannerUmkm />
          <div className="container pb-64">
            <CardDashboardMedium
              imageBackgroundDesktop={ImageCardMediumUMKM}
              imageBackgroundMobile={ImageCardMediumUMKMMobile}
              titleCardDashboard="Simulasi laporan keuangan"
              descCardDashboard="Cari tahu keuntungan yang diperoleh dari usahamu melalui simulasi ini"
              titleButton="Cek Sekarang"
            />
            <RecommendedClass />
            <KompetensiUsaha />
            <ListNews />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default UmkmSmart;
