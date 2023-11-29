import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';
import { withRouter } from 'react-router-dom';

import { getClassRecommendation } from 'services';

import CardRekomendasi from '../CardRekomendasi';
import MoreAll from '../../molecules/MoreAll';

// style
import './styles.scss';

class CatalogueClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otherClasses: []
    };
  }

  componentDidMount() {
    this.getClassRecommendation();
  }

  getClassRecommendation = () => {
    getClassRecommendation()
      .then((response) => {
        this.setState({
          otherClasses: response.data?.other_class
        });
      })
      .catch((err) => {
        throw err;
      });
  };

  render() {
    const {
      state: { otherClasses }
    } = this;
    const classNames = classname('o-catalogue-class', {});
    return (
      <div className={classNames}>
        <MoreAll titleCard="Kelas Lainnnya" hideActionButton />
        <div className="row">
          {otherClasses.length ? (
            otherClasses.map((cls, i) => (
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
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  }
}

CatalogueClass.propTypes = {
  history: PropTypes.object
};

CatalogueClass.defaultProps = {
  history: { push: '/' }
};

export default withRouter(CatalogueClass);
