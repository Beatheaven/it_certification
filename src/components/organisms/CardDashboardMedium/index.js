import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, H3, TextBody } from 'components/atoms';
import classname from 'classnames';

// style
import './styles.scss';

class CardDashboardMedium extends Component {
  render() {
    const {
      props: {
        imageBackgroundDesktop,
        imageBackgroundMobile,
        altImage,
        titleCardDashboard,
        descCardDashboard,
        titleButton,
        actionButton
      }
    } = this;
    const classNames = classname('o-card-dashboard-medium', {});
    return (
      <div className={classNames}>
        <div className="o-card-dashboard-medium__image-wrapper o-card-dashboard-medium__image-wrapper--d">
          <img src={imageBackgroundDesktop} alt={altImage} />
        </div>
        <div className="o-card-dashboard-medium__image-wrapper o-card-dashboard-medium__image-wrapper--m">
          <img src={imageBackgroundMobile} alt={altImage} />
        </div>
        <div className="o-card-dashboard-medium__wrapper">
          <div className="o-card-dashboard-medium__text-wrapper">
            <H3 weight="bold" color="" className="desktop-only">
              {titleCardDashboard}
            </H3>
            <TextBody
              weight="regular"
              color="secondary"
              className="desktop-only"
            >
              {descCardDashboard}
            </TextBody>
          </div>
          <div className="o-card-dashboard-medium__button-wrapper">
            <Button variant="secondary" onClick={actionButton}>
              {titleButton}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

CardDashboardMedium.propTypes = {
  imageBackgroundDesktop: PropTypes.string,
  imageBackgroundMobile: PropTypes.string,
  altImage: PropTypes.string,
  titleCardDashboard: PropTypes.string,
  descCardDashboard: PropTypes.string,
  titleButton: PropTypes.string,
  actionButton: PropTypes.func
};

CardDashboardMedium.defaultProps = {
  imageBackgroundDesktop: '',
  imageBackgroundMobile: '',
  altImage: '',
  titleCardDashboard: '',
  descCardDashboard: '',
  titleButton: '',
  actionButton: () => {}
};

export default CardDashboardMedium;
