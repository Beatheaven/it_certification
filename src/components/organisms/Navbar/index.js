import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { toggleMegamenuOverlay } from 'helpers';

// components
import {
  Avatar,
  Dropdown,
  DropdownItem,
  H4,
  Logo,
  SystemIcon,
  TextTopNav
} from 'components/atoms';
import MegaMenu from 'components/organisms/MegaMenu';
import MegaMenuMobile from 'components/organisms/MegaMenu/Mobile/index';

// assets
import emptyAvatar from 'assets/images/default-avatar-m.png';
import IcLogout from 'assets/images/icons/ic-logout.svg';

// styles
import './styles.scss';

// consts
const MENUS = [
  { name: 'home', text: 'Home', url: '/' },
  {
    name: 'class',
    text: 'Class',
    url: '/coming-soon'
  },
  {
    name: 'certification',
    text: 'Certification',
    url: '/coming-soon'
  },
  // { name: 'riwayat-survey', text: 'Riwayat Survey', url: '/riwayat-survey' },
  // { name: 'i-umkm', text: 'I-UMKM', url: '/i-umkm' },
  { name: 'faq', text: 'FAQ', url: '/coming-soon' }
];

// sub-components
// eslint-disable-next-line react/prop-types
const ButtonIcon = ({ icon, onClick }) => (
  <button type="button" className="a-nav__button" onClick={onClick}>
    <SystemIcon name={icon} />
  </button>
);

const Brand = () => (
  <a href="/" rel="noopener noreferrer">
    <Logo name="itCertification" />
  </a>
);

// component declaration
const Navbar = ({ title, onBack, history }) => {
  // hooks
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const isMegaMenuOpen = useSelector((state) => state.ui.megamenu);

  // states
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [menus] = useState(
    MENUS.map((menu) => ({ ...menu, isActive: menu.url === location.pathname }))
  );

  const [showSubmenu, setShowSubmenu] = useState(false);

  // classnames
  const drawerClassName = classnames('o-drawer', {
    'o-drawer--show': isMenuOpen
  });
  const menuClassname = (menu) => {
    const isUmkm = menu.name === 'umkm';
    return classnames({
      active: menu.isActive,
      megamenu: isUmkm && isMegaMenuOpen
    });
  };

  // event handlers
  const handleBack = () => {
    setIsMenuOpen(false);
    onBack();
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMegaMenu = (name) => {
    dispatch({
      type: 'ui/TOGGLE_MEGAMENU',
      payload: name === 'umkm' ? !isMegaMenuOpen : false
    });
    toggleMegamenuOverlay(name === 'umkm' ? !isMegaMenuOpen : false);
  };

  const handleLogout = () => {
    localStorage.clear();
    history.push('/login');
  };

  // side effects
  useEffect(() => {
    const handleScreenResize = () => {
      if (window.innerWidth < 896 && isMegaMenuOpen) {
        dispatch({ type: 'ui/TOGGLE_MEGAMENU', payload: false });
        toggleMegamenuOverlay(false);
      }
    };
    window.addEventListener('resize', handleScreenResize, false);
    return () => {
      window.removeEventListener('resize', handleScreenResize, false);
    };
  }, [dispatch, isMegaMenuOpen]);

  return (
    <>
      <header className="o-navbar">
        <div className="m-row-wrapper">
          <div className="m-col-wrapper">
            <div className="a-nav a-nav--desktop">
              <Brand />
            </div>
            <div className="a-nav a-nav--mobile">
              {title ? (
                <ButtonIcon icon="simple-left" onClick={handleBack} />
              ) : (
                <Brand />
              )}
            </div>
          </div>
          <div className="m-col-wrapper">
            <h1 className="a-title">{title}</h1>
          </div>
          <div className="m-col-wrapper">
            <div className="a-nav a-nav--right a-nav--desktop">
              {menus.map((menu) => (
                <TextTopNav
                  key={menu.name}
                  to={menu.url}
                  color="212121"
                  className={menuClassname(menu)}
                  onClick={() =>
                    menu.name === 'umkm' ? toggleMegaMenu(menu.name) : false
                  }
                >
                  {menu.text}
                </TextTopNav>
              ))}
              <Avatar
                size="40"
                image={user?.profile?.profile?.avatar ?? emptyAvatar}
                onClick={toggleDropdown}
              />
              {isDropdownOpen && (
                <Dropdown showHandler={() => setIsDropdownOpen(false)}>
                  <DropdownItem onClick={toggleDropdown}>
                    <a href="/profil" className="a-dropdown-link">
                      Profile
                    </a>
                  </DropdownItem>
                  <DropdownItem onClick={toggleDropdown}>
                    <a
                      href="/login"
                      className="a-dropdown-link"
                      onClick={handleLogout}
                    >
                      Logout
                    </a>
                  </DropdownItem>
                </Dropdown>
              )}
            </div>
            <div className="a-nav a-nav--right a-nav--mobile">
              <ButtonIcon
                icon={isMenuOpen ? 'close-32' : 'menu'}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
            </div>
          </div>
        </div>
      </header>
      <aside className={drawerClassName}>
        <div className="m-row-wrapper m-account">
          <div className="m-col-wrapper m-account__avatar">
            <Avatar
              size="64"
              image={user?.profile?.profile?.avatar ?? emptyAvatar}
            />
          </div>
          <div className="m-col-wrapper m-account__info">
            <H4 weight="bold">{user?.profile?.full_name ?? ''}</H4>
            <H4 weight="bold" color="primary">
              {user?.survey?.sub_category ?? ''}
            </H4>
          </div>
        </div>
        {!showSubmenu ? (
          menus.map((menu) => (
            <div key={menu.name} className="m-row-wrapper">
              <TextTopNav
                to={menu.url}
                color="white"
                className="mobile-menu"
                onClick={() =>
                  menu.name === 'umkm' ? setShowSubmenu(!showSubmenu) : {}
                }
              >
                <div>{menu.text}</div>
                <SystemIcon name="simple-right" />
              </TextTopNav>
            </div>
          ))
        ) : (
          <MegaMenuMobile handleBack={() => setShowSubmenu(!showSubmenu)} />
        )}

        <div className="m-row-wrapper m-logout">
          <TextTopNav
            className="mobile-menu__logout"
            onClick={handleLogout}
            color="white"
          >
            <img src={IcLogout} className="ic-logout" alt="logout" /> Logout
          </TextTopNav>
        </div>
      </aside>
      <MegaMenu />
    </>
  );
};

Navbar.propTypes = {
  title: PropTypes.string,
  onBack: PropTypes.func,
  history: PropTypes.object
};

Navbar.defaultProps = {
  title: '',
  onBack: () => {},
  history: { push: '/' }
};

export default withRouter(Navbar);
