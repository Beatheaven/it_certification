// Header Component
// ---------------------

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';
import {
  Avatar,
  Logo,
  TextTopNav,
  SystemIcon,
  H4,
  Dropdown,
  DropdownItem
} from 'components/atoms';
import './styles.scss';

// Assets
import emptyAvatar from 'assets/images/default-avatar-m.png';

// Network
import { getProfileUser } from '../../../services';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusNav: '',
      dataUser: props.dataUser,
      isProfileAction: false
    };
  }

  componentDidMount() {
    if ('token' in localStorage) this.getDataUser();
  }

  // temporary, until redux is set up again
  componentDidUpdate(prevProps, prevState) {
    const { dataUser } = this.props;
    const prevPropsAvatar = dataUser?.profile?.avatar;
    const prevStateAvatar = prevState.dataUser?.profile?.avatar;
    if (prevPropsAvatar !== undefined && prevPropsAvatar !== prevStateAvatar) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ dataUser });
    }
  }

  handleClickLogout = () => {
    localStorage.clear();
    window.location = '/login';
  };

  handleClickNav = () => {
    const { statusNav } = this.state;
    if (statusNav === 'is_active') {
      this.setState({
        statusNav: ''
      });
    }
    if (statusNav === '') {
      this.setState({
        statusNav: 'is_active'
      });
    }
  };

  handleShowDropdown = (bool) => {
    this.setState({ isProfileAction: bool });
  };

  getDataUser = () => {
    getProfileUser()
      .then((response) => {
        this.setState({
          dataUser: response.data
        });
      })
      .catch((err) => {
        throw err;
      });
  };

  onLogout = () => {
    this.setState({
      statusNav: ''
    });

    this.handleClickLogout();
  };

  onCloseNav = () => {
    this.setState({
      statusNav: ''
    });
  };

  render() {
    const {
      state: { statusNav, dataUser, isProfileAction },
      props: { activeMenu, transparent },
      handleClickNav,
      onCloseNav,
      onLogout,
      handleClickLogout
    } = this;

    const classNames = classname('o-header', {
      transparent
    });
    return (
      <div className={classNames}>
        <div className={`nav-wrapper-mobile ${statusNav}`}>
          <div className="nav-wrapper-mobile__profile-wrapper">
            <Avatar
              size="40"
              initial=""
              name=""
              image={dataUser?.profile?.avatar ?? emptyAvatar}
            />
            <div className="title-profile-wrapper">
              <H4 weight="bold" className="desktop-only">
                Jhone Doe
              </H4>
              <div className="title-profile-wrapper__subs">
                <H4 weight="bold" color="primary" className="desktop-only">
                  Tradisional Teladan
                </H4>
              </div>
            </div>
          </div>
          <div className="nav-wrapper-mobile__menu-wrapper">
            <TextTopNav
              to="/dashboard"
              color="white"
              onClick={() => {
                onCloseNav();
              }}
            >
              <span className="text-menu">HOME</span>
            </TextTopNav>
          </div>
          <div className="nav-wrapper-mobile__menu-wrapper">
            <TextTopNav
              to="/riwayat-survey-kompetensi"
              color="white"
              onClick={() => {
                onCloseNav();
              }}
            >
              <span className="text-menu">HISTORY SURVEY</span>
            </TextTopNav>
          </div>
          <div className="nav-wrapper-mobile__menu-wrapper">
            <TextTopNav
              to="/"
              color="white"
              onClick={() => {
                onCloseNav();
              }}
            >
              <span className="text-menu">I-UMKM</span>
            </TextTopNav>
          </div>
          <div className="nav-wrapper-mobile__menu-wrapper">
            <TextTopNav
              to="/"
              color="white"
              onClick={() => {
                onCloseNav();
              }}
            >
              <span className="text-menu">FAQ</span>
            </TextTopNav>
          </div>
          <div className="nav-wrapper-mobile__logout-wrapper">
            <TextTopNav
              to="/login"
              color="white"
              onClick={() => {
                onLogout();
              }}
            >
              <span className="text-menu">LogOUT</span>
            </TextTopNav>
          </div>
        </div>
        <div className="container">
          <div className="row pr-0">
            <div className="col-sm-12">
              <div className="o-header-wrapper">
                <div className="logo-section">
                  <div className="bri-logo">
                    <a href="/" rel="noopener noreferrer">
                      <Logo name="briWhite" />
                    </a>
                  </div>
                </div>
                {activeMenu !== 'notLoggedIn' && (
                  <div className="navigation-button">
                    <button
                      type="button"
                      className="button-item burger-button"
                      onClick={() => {
                        handleClickNav();
                      }}
                    >
                      <SystemIcon
                        name={statusNav === '' ? 'menu' : 'close-32'}
                      />
                    </button>
                  </div>
                )}
                <div className="navigation-bg-mobile" />

                <div className="navigation-section">
                  {activeMenu !== 'notLoggedIn' && (
                    <div className="navigation-wrapper">
                      <button
                        type="button"
                        className="close-button"
                        // onClick={handleMobileNavigation}
                      >
                        <SystemIcon name="close-32" />
                      </button>

                      <ul className="navigation-menu desktop-text">
                        <>
                          <li
                            className={classname({
                              active: activeMenu === 'home'
                            })}
                          >
                            <TextTopNav to="/" color="white">
                              <span className="text-menu">Home</span>
                            </TextTopNav>
                          </li>
                          <li
                            className={classname({
                              active: activeMenu === 'history survey'
                            })}
                          >
                            <TextTopNav
                              to="/riwayat-survey-kompetensi"
                              color="white"
                            >
                              <span className="text-menu">History Survey</span>
                            </TextTopNav>
                          </li>
                          <li
                            className={classname({
                              active: activeMenu === 'i-umkm'
                            })}
                          >
                            <TextTopNav to="#" color="white">
                              <span className="text-menu">I-UMKM</span>
                            </TextTopNav>
                          </li>
                          <li
                            className={classname({
                              active: activeMenu === 'faq'
                            })}
                          >
                            <TextTopNav to="#" color="white">
                              <span className="text-menu">Faq</span>
                            </TextTopNav>
                          </li>
                        </>
                      </ul>
                      <div className="user-profile">
                        <div className="user-profile-avatar">
                          <TextTopNav to="#" color="white">
                            <Avatar
                              size="40"
                              name={dataUser?.full_name ?? ''}
                              image={dataUser?.profile?.avatar ?? emptyAvatar}
                              onClick={() => this.handleShowDropdown(true)}
                            />
                          </TextTopNav>
                        </div>
                      </div>
                      {isProfileAction && (
                        <Dropdown
                          showHandler={() => this.handleShowDropdown(false)}
                        >
                          <DropdownItem onClick={() => handleClickLogout()}>
                            Logout
                          </DropdownItem>
                        </Dropdown>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  activeMenu: PropTypes.string,
  transparent: PropTypes.bool,
  dataUser: PropTypes.object
};

Header.defaultProps = {
  activeMenu: '',
  transparent: false,
  dataUser: {}
};

export default Header;
