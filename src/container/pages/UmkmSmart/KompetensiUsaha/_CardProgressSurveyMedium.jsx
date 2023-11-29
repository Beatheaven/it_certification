import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import { H3, TextBody, Button, ProgressBar, PopupTakeSurvey } from 'components';

import classname from 'classnames';

import ImgUmkmSurvey from 'assets/images/class/umkm-smart-survey.png';

import './styles.scss';

import { getProfileCheckPoint, surveyProgress } from '../../../../services';

class UmkmCardProgressSurvey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      availableSurveyDate: null,
      surveyTotal: 0,
      progress: 0,
      showTakeSurvey: false
    };
  }

  componentDidMount() {
    this.getCheckPoint();
    this.getSurveyProgress();
  }

  getSurveyProgress = () => {
    surveyProgress().then(({ data: { progress } }) => {
      this.setState({ progress });
    });
  };

  getCheckPoint = () => {
    getProfileCheckPoint()
      .then(({ data }) => {
        this.setState({
          availableSurveyDate: data.data.survey.next_survey_date,
          surveyTotal: data.data.survey.total
        });
      })
      .catch((error) => {});
  };

  handleShowPoupSurvey = () => {
    const { showTakeSurvey } = this.state;
    this.setState({ showTakeSurvey: !showTakeSurvey });
  };

  render() {
    const {
      state: { availableSurveyDate, surveyTotal, progress, showTakeSurvey },
      handleShowPoupSurvey
    } = this;
    const classNames = classname('o-card-umkm-kompetensi', {});

    const isAvailable = moment().isSameOrAfter(availableSurveyDate);
    const isEverTakeSurvey = surveyTotal > 0;
    const formatDate = (date) => moment(date).format('DD MMMM YYYY');
    const isDateValid = (date) => moment(date).isValid();

    return (
      <div className={classNames}>
        <div className="o-card-umkm-kompetensi__image">
          <img src={ImgUmkmSurvey} alt="umkm-take survey" />
        </div>
        {isEverTakeSurvey ? (
          <div className="o-card-umkm-kompetensi__content">
            <TextBody className="my-32">
              Anda bisa mengambil kembali survey pada:
              <TextBody color="primary" weight="bold">
                {isDateValid(availableSurveyDate) &&
                  formatDate(availableSurveyDate)}
              </TextBody>
            </TextBody>
            <div className="align-center">
              <Button
                disabled={!isAvailable}
                variant="primary"
                onClick={() => handleShowPoupSurvey()}
              >
                Lakukan Survey Kembali
              </Button>
            </div>
          </div>
        ) : (
          progress > 0 && (
            <div className="o-card-umkm-kompetensi__content">
              <H3>Selesaikan survey kompetensimu!</H3>
              <TextBody weight="regular" color="black">
                Yuk lanjutkan pengerjaan survey untuk mengetahui seberapa siap
                kamu dalam menjalankan usaha yang profitabel dan berkelanjutan.
              </TextBody>
              <div className="o-progress-bar--medium">
                <div className="title-progress-bar">
                  <TextBody weight="bold" color="black">
                    PROGRESS PENGERJAAN
                  </TextBody>
                  <TextBody weight="bold" color="black">
                    {progress} %
                  </TextBody>
                </div>
                <div className="bar-progress-bar-wrapper">
                  <ProgressBar width={progress} />
                </div>
              </div>
              <Button variant="primary" onClick={() => handleShowPoupSurvey()}>
                Lanjutkan
              </Button>
            </div>
          )
        )}
        <PopupTakeSurvey
          show={showTakeSurvey}
          setShow={() => handleShowPoupSurvey()}
        />
      </div>
    );
  }
}

UmkmCardProgressSurvey.propTypes = {
  // history: PropTypes.object
};

UmkmCardProgressSurvey.defaultProps = {
  // history: { push: '/' }
};

export default withRouter(UmkmCardProgressSurvey);
