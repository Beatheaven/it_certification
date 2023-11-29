// Header Banner Component
// ---------------------

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import classname from 'classnames';

import ImageDashboard from 'assets/images/banner/banner-class.png';
import ImageDashboardMobile from 'assets/images/banner/banner-class.png';
import ImageCardUMKM from 'assets/images/banner/image-card-dashboard.png';
import ImageCardUMKMMobile from 'assets/images/banner/image-card-dashboard-mobile.png';

import PopupTakeSurvey from '../PopupTakeSurvey';

import HeaderBanner from '../HeaderBanner';
import CardDashboard from '../CardDashboard';
import CardUmkmSmartSummary from '../CardUmkmSmartSummary';
import CardSurveyOnProgress from '../CardSurveyOnProgress';

import ImageCardSurveyOnProgressMobile from '../../../assets/images/banner/image-card-survey-mobile.png';
import ImageCardSurveyOnProgress from '../../../assets/images/banner/image-card-survey.png';

import { getProfileCheckPoint, surveyProgress } from '../../../services';

class HeaderBannerUmkm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataNav: [
        {
          title: 'UMKM Smart',
          withArrow: false
        }
      ],
      showTakeSurvey: false,
      surveyProgress: 0,
      dataProfile: {}
    };
  }

  componentDidMount() {
    this.handleDataProfile();
    this.getSurveyProgress();
  }

  getSurveyProgress = () => {
    return new Promise((resolve) => {
      surveyProgress().then(({ data }) => {
        this.setState({ surveyProgress: data.progress });
        resolve();
      });
    });
  };

  handleDataProfile = () => {
    getProfileCheckPoint()
      .then((response) => {
        this.setState({
          dataProfile: response.data
        });
      })
      .catch((err) => {
        throw err;
      });
  };

  handleShowPopup = () => {
    const { showTakeSurvey } = this.state;
    this.setState({ showTakeSurvey: !showTakeSurvey });
  };

  render() {
    const {
      handleShowPopup,
      state: { dataNav, showTakeSurvey, surveyProgress, dataProfile }
    } = this;
    const classNames = classname('o-header-banner-umkm', {});
    return (
      <div className={classNames}>
        <PopupTakeSurvey
          show={showTakeSurvey}
          setShow={() => handleShowPopup()}
        />
        <HeaderBanner
          imageDesktop={ImageDashboard}
          imageMobile={ImageDashboardMobile}
          title="Kelas  "
          subtitle="Tingkatkan uji kompetensi usahamu dengan kelas-kelas berkualitas dari para ahli di bidangnya."
          withNav={dataNav}
        />
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="o-umkm-smart__card">
                {dataProfile.data?.profile?.average_progres < 100 ||
                (dataProfile.data?.survey?.total === 0 &&
                  surveyProgress === 0) ? (
                  <>
                    <CardDashboard
                      imageBackgroundDesktop={ImageCardUMKM}
                      imageBackgroundMobile={ImageCardUMKMMobile}
                      titleCardDashboard="Cek kompetensi usahamu"
                      actionButton={() => handleShowPopup()}
                      titleButton="Cek Sekarang"
                    />
                  </>
                ) : null}

                {surveyProgress > 0 &&
                surveyProgress < 100 &&
                dataProfile.data?.profile?.average_progres === 100 &&
                dataProfile.data?.survey?.total === 0 ? (
                  <>
                    <CardSurveyOnProgress
                      imageBackgroundDesktop={ImageCardSurveyOnProgress}
                      imageBackgroundMobile={ImageCardSurveyOnProgressMobile}
                      titleCardSurveyOnProgress="Selesaikan survey kompetensimu!"
                      descCardSurveyOnProgress="Yuk lanjutkan pengerjaan survey untuk mengetahui seberapa siap kamu dalam menjalankan usaha yang profitable dan berkelanjutan."
                      titleButton="Lanjutkan"
                      actionButton={() => handleShowPopup()}
                      valueBar={`${surveyProgress}%`}
                      nameProgress="PROGRESS PENGERJAAN"
                    />
                  </>
                ) : null}

                {dataProfile.data?.profile?.average_progres === 100 &&
                dataProfile.data?.survey?.total > 0 ? (
                  <>
                    <CardUmkmSmartSummary />
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(HeaderBannerUmkm);
