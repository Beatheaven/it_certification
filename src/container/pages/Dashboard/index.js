import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Navbar,
  Footer,
  HeaderBanner,
  CardProfile,
  CardDashboard,
  CardSurveyOnProgress,
  RecommendedClass,
  Loading,
  PopupTakeSurvey,
  AlertChangePin
} from 'components';
import PropTypes from 'prop-types';
import ImageDashboard from 'assets/images/banner/image-dashboard.png';
import ImageCardDashboard from 'assets/images/banner/image-card-dashboard.png';
import ImageCardDashboardMobile from 'assets/images/banner/image-card-dashboard-mobile.png';
import ImageDashboardMobile from 'assets/images/banner/image-dashboard-mobile.png';
import classname from 'classnames';

// helpers
import moment from 'moment';

// assets
import ImageCardSurveyOnProgressMobile from '../../../assets/images/banner/image-card-survey-mobile.png';
import ImageCardSurveyOnProgress from '../../../assets/images/banner/image-card-survey.png';
// style
import './styles.scss';

const mapStateToProps = ({ user }, ownProps) => ({ user });

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTakeSurvey: false
    };
  }

  // life-cycle hooks
  componentDidMount() {
    this.populateInitialData();
  }

  handleShowPopup = () => {
    const { showTakeSurvey } = this.state;
    this.setState({
      showTakeSurvey: !showTakeSurvey
    });
  };

  getUserData = () => {
    const { dispatch } = this.props;
    return new Promise((resolve) => {
      resolve(dispatch({ type: 'user/GET_CURRENT_USER' }));
    });
  };

  getUserCheckPoint = () => {
    const { dispatch } = this.props;
    return new Promise((resolve) => {
      resolve(dispatch({ type: 'user/GET_CHECKPOINT' }));
    });
  };

  getSurveyProgress = () => {
    const { dispatch } = this.props;
    return new Promise((resolve) => {
      resolve(dispatch({ type: 'user/GET_PROGRESS' }));
    });
  };

  populateInitialData = () => {
    return Promise.all([
      this.getUserData(),
      this.getUserCheckPoint(),
      this.getSurveyProgress()
    ]);
  };

  render() {
    const greeting = 'Selamat datang di Portal UMKM BRI';
    const nextClass = classname('inner-container', {});
    const classNames = classname('o-dashboard', {});

    const {
      handleShowPopup,
      state: { showTakeSurvey },
      props: { user }
    } = this;

    const isSurveyAvailable = moment().isSameOrAfter(
      user?.survey?.next_survey_date
    );

    return (
      <div className={nextClass}>
        <Loading loading={user.loading} />
        <AlertChangePin />
        <PopupTakeSurvey show={showTakeSurvey} setShow={handleShowPopup} />
        <div className={classNames}>
          <div className="dashboard-header">
            <Navbar />
          </div>
          <HeaderBanner
            imageDesktop={ImageDashboard}
            imageMobile={ImageDashboardMobile}
            name={user?.profile?.full_name}
            subtitle={greeting}
          />
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <CardProfile
                  imageProfile={user?.profile?.profile?.avatar}
                  nameUser={user?.profile?.full_name}
                  nameUMKM={user?.survey?.sub_category}
                  actionButton={() => {
                    const { history } = this.props;
                    history.push('/profil');
                  }}
                  titleButton="LIHAT PROFILE"
                  nik={user?.profile?.nik}
                />
                {(user?.survey?.total === 0 &&
                  user?.progress?.progress === 0) ||
                (user?.progress?.progress === 0 && isSurveyAvailable) ? (
                  <CardDashboard
                    imageBackgroundDesktop={ImageCardDashboard}
                    imageBackgroundMobile={ImageCardDashboardMobile}
                    titleCardDashboard="Cek kompetensi usahamu"
                    actionButton={handleShowPopup}
                    titleButton="Cek Sekarang"
                    disabledButton={!isSurveyAvailable}
                  />
                ) : user?.progress?.progress > 0 &&
                  user?.checkpoint?.average_progres === 100 ? (
                  <CardSurveyOnProgress
                    imageBackgroundDesktop={ImageCardSurveyOnProgress}
                    imageBackgroundMobile={ImageCardSurveyOnProgressMobile}
                    titleCardSurveyOnProgress="Selesaikan survey kompetensimu!"
                    descCardSurveyOnProgress="Yuk lanjutkan pengerjaan survey untuk mengetahui seberapa siap kamu dalam menjalankan usaha yang profitable dan berkelanjutan."
                    titleButton="Lanjutkan"
                    actionButton={handleShowPopup}
                    valueBar={`${user?.progress?.progress}%`}
                    nameProgress="PROGRESS PENGERJAAN"
                  />
                ) : (
                  <></>
                )}
                {user?.survey?.total > 0 ? <RecommendedClass /> : <></>}
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  history: PropTypes.object,
  user: PropTypes.object,
  dispatch: PropTypes.func
};

Dashboard.defaultProps = {
  history: { push: '/' },
  user: {},
  dispatch: () => {}
};

export default connect(mapStateToProps)(Dashboard);
