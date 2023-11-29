import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import classname from 'classnames';

import { MoreAll, CardNews } from 'components';

import ImgNews1 from '../../../../assets/images/dummy/img-news-1.png';

import './styles.scss';

class ListNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listNews: [
        {
          title: 'Sederet Program BRI untuk UMKM Terdampak Corona',
          description: `PT Bank Rakyat Indonesia (Persero) Tbk mengeluarkan beberapa
        program buat pelaku Usaha Mikro, Kecil dan Menengah(UMKM) yang
        terdampak virus Corona(Covid- 19).Mulai dari pendampingan...`,
          date: '2020-11-04T02:14:32.140847Z',
          backgroud_cover: ImgNews1
        },
        {
          title: 'Sederet Program BRI untuk UMKM Terdampak Corona',
          description: `PT Bank Rakyat Indonesia (Persero) Tbk mengeluarkan beberapa
        program buat pelaku Usaha Mikro, Kecil dan Menengah(UMKM) yang
        terdampak virus Corona(Covid- 19).Mulai dari pendampingan...`,
          date: '2020-11-04T02:14:32.140847Z',
          backgroud_cover: ImgNews1
        }
      ]
    };
  }

  render() {
    const { listNews } = this.state;
    const { history } = this.props;
    const classNames = classname('o-wrapper-news', {});

    return (
      <div className={classNames}>
        <MoreAll
          titleCard="Berita Terbaru"
          titleButton="Lihat Semua"
          actionButton={() => {
            history.push('/umkm-smart');
          }}
        />
        {listNews.map((news, i) => (
          <CardNews
            title={news.title}
            description={news.description}
            date={news.date}
            image={news.backgroud_cover}
            url="/umkm-smart"
          />
        ))}
      </div>
    );
  }
}

ListNews.propTypes = {
  history: PropTypes.object
};

ListNews.defaultProps = {
  history: { push: '/' }
};

export default withRouter(ListNews);
