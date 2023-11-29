import React, { Component } from 'react';
import { Navbar, Avatar } from 'components';

import classname from 'classnames';

// style
import './styles.scss';

class RiwayatSurveyKompetensi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      histories: [],
      availableSurveyDate: null,
      previousHistories: [],
      activeAccordion: null,
      progress: 0,
      surveyTotal: 0,
      dataNav: [
        {
          title: 'UMKM Smart',
          withArrow: true
        },
        {
          title: 'Riwayat Survey Kompetensi',
          withArrow: false
        }
      ]
    };
  }

  render() {
    const classNames = classname('o-riwayat-survey');

    return (
      <div className={classNames}>
        <div className="riwayat-survey-header">
          <Navbar />
        </div>

        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <Avatar size="80" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RiwayatSurveyKompetensi;
