import React, { Component } from 'react';
import { Button, H3, TextBody } from 'components/atoms';
import PropTypes from 'prop-types';
import classname from 'classnames';

// style
import './styles.scss';

class CardAccordionIUmkm extends Component {
  render() {
    const {
      isOpen,
      title,
      desc,
      image,
      imageMobile,
      onClick,
      children
    } = this.props;
    return (
      <div
        className={classname('o-card-collapse', {
          active: isOpen,
          not_active: !isOpen
        })}
      >
        <div className="o-card-collapse__head">
          <div className="overlay overlay--d" onClick={onClick} />
          <div className="o-card-collapse__head__content">
            <div className="o-card-collapse__image-wrapper">
              <div className="overlay overlay--m" onClick={onClick} />
              <img className="--d" src={image} alt={title} />
              <img className="--m" src={imageMobile} alt={title} />
            </div>
            <div className="o-card-collapse__wrapper">
              <div className="o-card-collapse__text-wrapper">
                <H3 weight="bold" color="" className="desktop-only">
                  {title}
                </H3>
                <TextBody
                  weight="regular"
                  color="secondary"
                  className="desktop-only"
                >
                  {desc}
                </TextBody>
              </div>
              <div className="o-card-collapse__button-wrapper">
                <Button variant="primary" onClick={onClick}>
                  Daftarkan
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div
          className={classname('o-card-collapse__body ', {
            show: isOpen,
            hide: !isOpen
          })}
        >
          <div className="o-card-collapse__body__wrapper row">{children}</div>
        </div>
      </div>
    );
  }
}

CardAccordionIUmkm.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  desc: PropTypes.string,
  image: PropTypes.string,
  imageMobile: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node
};

CardAccordionIUmkm.defaultProps = {
  isOpen: false,
  title: '',
  desc: '',
  image: '',
  imageMobile: '',
  onClick: () => {},
  children: ''
};

export default CardAccordionIUmkm;
