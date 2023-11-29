import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';
import { withRouter } from 'react-router-dom';
import { Button } from 'components/atoms';

import { getProfileCheckPoint, getClassRecommendation } from 'services';

import CardRekomendasi from '../CardRekomendasi';
import MoreAll from '../../molecules/MoreAll';

// style
import './styles.scss';

class RecommendedClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classRecommended: [],
      dataCheckpoint: {}
    };
  }

  componentDidMount() {
    this.getProfileCheckPoint();
    this.getClassRecommendation();
  }

  getProfileCheckPoint = () => {
    getProfileCheckPoint()
      .then((response) => {
        this.setState({
          dataCheckpoint: response.data
        });
      })
      .catch((err) => {
        throw err;
      });
  };

  getClassRecommendation = () => {
    getClassRecommendation()
      .then((response) => {
        this.setState({
          classRecommended: response.data?.recommendation
        });
      })
      .catch((err) => {
        throw err;
      });
  };

  render() {
    const {
      state: { classRecommended, dataCheckpoint },
      props: { hideButtonViewAll, history }
    } = this;

    const classNames = classname('o-recommended-class', {});
    let element;

    if (
      dataCheckpoint.data?.profile?.average_progres === 100 &&
      dataCheckpoint.data?.survey?.total > 0
    ) {
      element = (
        <div className={classNames}>
          <MoreAll
            titleCard="Kelas rekomendasi"
            titleButton="LIHAT SEMUA KELAS"
            actionButton={() => history.push('/umkm-smart/kelas')}
            hideActionButton={hideButtonViewAll}
          />
          <div className="row">
            {classRecommended &&
              classRecommended.map((cls, i) => (
                <div key={i} className="col-sm-6 col-md-4">
                  <CardRekomendasi
                    imageBackgroundDesktop={cls.background_cover}
                    imageBackgroundMobile={cls.background_cover}
                    iconRekomendasi={cls.icon}
                    titleRekomendasi={cls.display_name}
                    onClick={() => {
                      const { history } = this.props;
                      history.push(`/umkm-smart/kelas/${cls.id62}`);
                    }}
                  />
                </div>
              ))}
          </div>
          <Button
            className="o-recommended-class button--d"
            variant="primary"
            onClick={() => history.push('/umkm-smart/kelas')}
          >
            LIHAT SEMUA KELAS
          </Button>
        </div>
      );
    }

    return <>{element}</>;
  }
}

RecommendedClass.propTypes = {
  history: PropTypes.object,
  hideButtonViewAll: PropTypes.bool
};

RecommendedClass.defaultProps = {
  history: { push: '/' },
  hideButtonViewAll: false
};

export default withRouter(RecommendedClass);
