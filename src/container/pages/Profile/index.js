import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import SweetAlert from 'react-bootstrap-sweetalert';
import {
  CardProgressBar,
  Navbar,
  HeaderBanner,
  Footer
} from 'components/organisms';

// tightly-coupled components
import ImageHeaderBanner from 'assets/images/banner/header-banner-profil.png';
import ImageHeaderBannerMobile from 'assets/images/banner/header-banner-profil-mobile.png';

import ProfileSidebar from './_ProfileSidebar';
import ProfileContent from './_ProfileContent';
import PopupAddress from './_ProfilePopupAddress';

// assets

// styles
import './styles.scss';

// redux
const mapStateToProps = ({ user }, ownProps) => ({ user });

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataNav: [{ title: 'Lihat Profil', withArrow: false }],
      activeSidebar: null,
      sidebarMenus: [
        { text: 'Akun', icon: 'profile-32' },
        { text: 'Usaha', icon: 'store-24' },
        { text: 'Hasil Pelatihan', icon: 'share' }
      ],
      alert: {
        show: false,
        success: true,
        title: '',
        onConfirm: () => {}
      }
    };
    this.handleScreenResize = this.handleScreenResize.bind(this);
  }

  // life-cycle hooks
  componentDidMount() {
    this.populateInitialData();
    this.handleScreenResize();
    window.addEventListener('resize', this.handleScreenResize, false);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleScreenResize, false);
  }

  // event handler
  handleScreenResize = () => {
    const { activeSidebar } = this.state;
    const windowWidth = window.innerWidth;
    const isSmall = windowWidth < 896;
    if (isSmall && activeSidebar === 0) {
      this.setState({ activeSidebar: null });
    } else if (!isSmall && activeSidebar === null) {
      this.setState({ activeSidebar: 0 });
    }
  };

  handleChangeMenu = (activeSidebar) => {
    this.setState({ activeSidebar });
  };

  handleTogglePopup = (target = 'address') => {
    const { dispatch } = this.props;
    dispatch({ type: 'user/TOGGLE_POPUP' });
  };

  handleCloseAlert = () => {
    this.setState({
      alert: { show: false, title: '', onConfirm: () => {} }
    });
  };

  handleSaveAddress = () => {
    this.getUserData().then(() => {
      this.handleTogglePopup();
    });
  };

  handleSave = (field) => {
    const alert = {
      show: true,
      success: true,
      title: 'Berhasil',
      message: '',
      onConfirm: this.handleCloseAlert
    };
    const { history } = this.props;

    switch (field) {
      case 'business':
        alert.message = 'Profil Usaha Anda telah berhasil disimpan';
        alert.onConfirm = () => {
          this.getUserCheckPoint().then(() => {
            const { user } = this.props;
            const { user_progress: userProgress } = user?.checkpoint || {};
            if (userProgress === 100) history.push('/form-survey');
            this.handleCloseAlert();
          });
        };
        break;
      case 'pin':
        alert.message = 'PIN Anda telah berhasil diubah';
        break;
      case 'account':
      default:
        alert.message = 'Profil Anda telah berhasil disimpan';
        alert.onConfirm = () => {
          this.populateInitialData().then(this.handleCloseAlert);
        };
        break;
    }

    this.setState({ alert });
  };

  // methods
  getSidebarMenus = () => {
    const { activeSidebar, sidebarMenus } = this.state;
    return sidebarMenus.map((menu, index) => ({
      ...menu,
      status: activeSidebar === index ? 'is-active' : '',
      onClick: () => this.handleChangeMenu(index)
    }));
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

  populateInitialData = () => {
    return Promise.all([this.getUserData(), this.getUserCheckPoint()]);
  };

  render() {
    const { dataNav, activeSidebar, sidebarMenus, alert } = this.state;
    const { user } = this.props;
    const progress = `${user?.checkpoint?.average_progres || 0}%`;

    const activeTitle = sidebarMenus[activeSidebar]?.text || '';
    const sidebarClassName = classnames('col-12 col-sm-3', {
      'd-none': activeSidebar !== null
    });
    const contentClassName = classnames('col-12 col-sm-9');

    const dataProfileAdress = user?.profile?.profile && {
      ...user?.profile?.profile?.addresses,
      branch_id: user?.profile?.profile?.branch_id,
      region_id: user?.profile?.profile?.region_id,
      supervisor_id: user?.profile?.profile?.supervisor_id
    };

    return (
      <div className="inner-container">
        <div className="o-profile">
          <SweetAlert
            show={alert.show}
            success
            title={alert.title}
            confirmBtnCssClass="a-button primary"
            onConfirm={alert.onConfirm}
          >
            {alert.message}
          </SweetAlert>
          <PopupAddress
            show={user.popup}
            data={dataProfileAdress ?? {}}
            onClose={this.handleTogglePopup}
            onSave={this.handleSaveAddress}
          />
          <div className="o-profile__header">
            <Navbar
              title={activeTitle}
              onBack={() => this.setState({ activeSidebar: null })}
            />
          </div>
          <HeaderBanner
            imageDesktop={ImageHeaderBanner}
            imageMobile={ImageHeaderBannerMobile}
            title="Profil"
            withNav={dataNav}
          />
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <CardProgressBar
                  nameProgress="LENGKAPI PROFILE"
                  valueBar={progress}
                />
              </div>
            </div>
            <div className="row">
              <div className={sidebarClassName}>
                <ProfileSidebar menus={this.getSidebarMenus()} />
              </div>
              <div className={contentClassName}>
                <ProfileContent
                  activeContent={activeSidebar}
                  onSave={this.handleSave}
                />
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  history: PropTypes.object,
  dispatch: PropTypes.func,
  user: PropTypes.object
};

Profile.defaultProps = {
  history: {},
  dispatch: () => {},
  user: {}
};

export default connect(mapStateToProps)(Profile);
