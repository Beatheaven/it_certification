import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { H4, TextBody, SystemIcon } from 'components/atoms';
import classname from 'classnames';
import iconPencil from '../../../assets/images/icon-pencil.png';

// style
import './styles.scss';

class CardUsaha extends Component {
  render() {
    const {
      props: {
        imageBackgroundDesktop,
        imageBackgroundMobile,
        altImage,
        titleCardDashboard,
        addressCard,
        addressCardProvince,
        addressCardRegency,
        timeCard,
        timeCardEnd,
        handleIcon,
        withIcon
      }
    } = this;
    const classNames = classname('o-card-usaha', {});
    return (
      <div className={classNames}>
        <div className="o-card-usaha__image-wrapper o-card-usaha__image-wrapper--d">
          <img src={imageBackgroundDesktop} alt={altImage} />
        </div>
        <div className="o-card-usaha__image-wrapper o-card-usaha__image-wrapper--m">
          <img src={imageBackgroundMobile} alt={altImage} color="white" />
        </div>
        {withIcon && (
          <div className="icon-title" onClick={handleIcon}>
            <img src={iconPencil} alt="pross" />
          </div>
        )}
        <div className="o-card-usaha__wrapper">
          <div className="o-card-usaha__text-wrapper">
            <H4 weight="bold" color="white" className="desktop-only">
              {titleCardDashboard}
            </H4>
            <div className="text-wrapper-contact">
              <div className="text-wrapper-contact r">
                <SystemIcon name="map-search" color="white" />
              </div>
              <div className="text-wrapper-contact l">
                <TextBody
                  weight="regular"
                  color="white"
                  className="desktop-only"
                >
                  {addressCard}
                </TextBody>
                <TextBody
                  weight="regular"
                  color="white"
                  className="desktop-only"
                >
                  {addressCardProvince}
                </TextBody>
                <TextBody
                  weight="regular"
                  color="white"
                  className="desktop-only"
                >
                  {addressCardRegency}
                </TextBody>
              </div>
            </div>
            <div className="text-wrapper-contact">
              <div className="text-wrapper-contact r">
                <SystemIcon name="map-search" color="white" />
              </div>
              <div className="text-wrapper-contact l">
                <TextBody
                  weight="regular"
                  color="white"
                  className="desktop-only"
                >
                  {timeCard}
                </TextBody>
              </div>
            </div>
            <div className="text-wrapper-contact">
              <div className="text-wrapper-contact r">
                <SystemIcon name="map-search" color="white" />
              </div>
              <div className="text-wrapper-contact l">
                <TextBody
                  weight="regular"
                  color="white"
                  className="desktop-only"
                >
                  {timeCardEnd}
                </TextBody>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CardUsaha.propTypes = {
  imageBackgroundDesktop: PropTypes.string,
  imageBackgroundMobile: PropTypes.string,
  altImage: PropTypes.string,
  titleCardDashboard: PropTypes.string,
  addressCard: PropTypes.string,
  addressCardProvince: PropTypes.string,
  addressCardRegency: PropTypes.string,
  timeCard: PropTypes.string,
  timeCardEnd: PropTypes.string,
  handleIcon: PropTypes.func,
  withIcon: PropTypes.bool
};

CardUsaha.defaultProps = {
  imageBackgroundDesktop: '',
  imageBackgroundMobile: '',
  altImage: '',
  titleCardDashboard: '',
  addressCard: '',
  addressCardProvince: '',
  addressCardRegency: '',
  timeCard: '',
  timeCardEnd: '',
  handleIcon: () => {},
  withIcon: false
};

export default CardUsaha;
