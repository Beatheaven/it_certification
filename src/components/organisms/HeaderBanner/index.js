// Header Banner Component
// ---------------------

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';
import { H1, Links, SystemIcon } from 'components/atoms';
import './styles.scss';

class HeaderBanner extends Component {
  render() {
    const {
      props: { imageDesktop, imageMobile, name, title, alt, subtitle, withNav }
    } = this;

    const splitName = name.split(' ');
    const sliceName = splitName.slice(0, 2);
    const callName = sliceName.join(' ');

    const classNames = classname('o-header-banner', {});
    return (
      <div className={classNames} style={{ backgroundImage: `url(${imageDesktop})` }}>
        <div className="o-header-banner__img-wrapper o-header-banner__img-wrapper--d">
          {/* <img src={imageDesktop} alt={alt} /> */}
        </div>
        <div className="o-header-banner__img-wrapper o-header-banner__img-wrapper--m">
          {/* <img src={imageMobile} alt={alt} /> */}
        </div>
        <div className="o-header-banner__text-wrapper">
          <div className="container">
            <div className="row pr-0">
              <div className="col-sm-6 ">
                {localStorage.token && withNav && (
                  <div className="o-header-banner__text-nav-wrapper">
                    <Links
                      className=""
                      to="/dashboard"
                      variant="links-additional-info"
                      color="white"
                      tabIndex="-1"
                      type="link"
                      weight="regular"
                    >
                      Home
                    </Links>
                    <SystemIcon name="simple-right" />
                    {withNav.map((val, index) => (
                      <Fragment key={index}>
                        <Links
                          className=""
                          to="/dashboard"
                          variant="links-additional-info"
                          color="white"
                          tabIndex="-1"
                          type="link"
                          weight="regular"
                        >
                          {val.title}
                        </Links>
                        {val.withArrow && <SystemIcon name="simple-right" />}
                      </Fragment>
                    ))}
                  </div>
                )}
                <H1 weight="bold" color="white" className="desktop-only ">
                  {callName && `Hai, ${callName}`}
                  {title}
                </H1>
                <div className="o-header-banner__text">{subtitle}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

HeaderBanner.propTypes = {
  alt: PropTypes.string,
  title: PropTypes.string,
  name: PropTypes.string,
  subtitle: PropTypes.string,
  imageDesktop: PropTypes.string,
  imageMobile: PropTypes.string,
  withNav: PropTypes.array
};

HeaderBanner.defaultProps = {
  alt: '',
  name: '',
  title: '',
  subtitle: '',
  imageMobile: '',
  imageDesktop: '',
  withNav: [{}]
};

export default HeaderBanner;
