import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';
import { Button, H2, TextBody } from 'components/atoms';

// style
import './styles.scss';

class CardDashboard extends Component {
  render() {
    const {
      props: {
        imageBackgroundDesktop,
        imageBackgroundMobile,
        altImage,
        titleCardDashboard,
        descCardDashboard,
        titleButton,
        actionButton,
        disabledButton
      }
    } = this;
    const classNames = classname('o-card-dashboard', {});
    return (
      <div className={classNames}>
        <div className="o-card-dashboard__image-wrapper o-card-dashboard__image-wrapper--d">
          <img src={imageBackgroundDesktop} alt={altImage} />
        </div>
        <div className="o-card-dashboard__image-wrapper o-card-dashboard__image-wrapper--m">
          <img src={imageBackgroundMobile} alt={altImage} />
        </div>
        <div className="o-card-dashboard__wrapper">
          <div className="o-card-dashboard__text-wrapper">
            <H2 weight="bold" color="" className="desktop-only">
              {titleCardDashboard}
            </H2>
            <TextBody
              weight="regular"
              color="secondary"
              className="desktop-only"
            >
              {descCardDashboard}
            </TextBody>
          </div>
          <div className="o-card-dashboard__button-wrapper">
            <Button
              variant="primary"
              onClick={actionButton}
              disabled={disabledButton}
            >
              {titleButton}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

CardDashboard.propTypes = {
  imageBackgroundDesktop: PropTypes.string,
  imageBackgroundMobile: PropTypes.string,
  altImage: PropTypes.string,
  actionButton: PropTypes.func,
  titleCardDashboard: PropTypes.string,
  descCardDashboard: PropTypes.string,
  titleButton: PropTypes.string,
  disabledButton: PropTypes.bool
};

CardDashboard.defaultProps = {
  imageBackgroundDesktop: '',
  imageBackgroundMobile: '',
  altImage: '',
  titleCardDashboard: '',
  descCardDashboard: '',
  actionButton: () => {},
  titleButton: '',
  disabledButton: false
};

export default CardDashboard;
