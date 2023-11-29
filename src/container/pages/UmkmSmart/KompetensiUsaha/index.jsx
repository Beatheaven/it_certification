import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { CardCategoryKompetensiMedium, MoreAll } from 'components';

import classname from 'classnames';

import CardProgressSurveyMedium from './_CardProgressSurveyMedium';

import './styles.scss';

import { getDataHistorySurvey } from '../../../../services';

class UmkmKompetensi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      histories: []
    };
  }

  componentDidMount() {
    this.getDataHistory();
  }

  getDataHistory = () => {
    getDataHistorySurvey()
      .then((response) => {
        if (response.data.results.length) {
          const histories = response.data.results;
          histories.reverse();
          if (histories.length > 2) {
            histories.splice(2, histories.length);
          }
          this.setState({ histories });
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  render() {
    const { history } = this.props;
    const { histories } = this.state;
    const classNames = classname('o-umkm-smart__kompetensi', {});

    const historyIds = histories.map(({ id62 }) => id62);

    return (
      <div className={classNames}>
        {historyIds.length > 0 && (
          <>
            <MoreAll
              titleCard="Kompetensi Usaha"
              titleButton="LIHAT RIWAYAT HASIL SURVEY"
              actionButton={() => {
                history.push('/riwayat-survey');
              }}
            />
            <div className="row">
              <div className="col-md-4">
                <CardProgressSurveyMedium />
              </div>
              <div className="col-md-8">
                <CardCategoryKompetensiMedium historyIds={historyIds} />
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

UmkmKompetensi.propTypes = {
  history: PropTypes.object
};

UmkmKompetensi.defaultProps = {
  history: { push: '/' }
};

export default withRouter(UmkmKompetensi);
