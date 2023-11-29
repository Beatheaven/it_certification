import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';
import { H3 } from 'components/atoms';

// style
import './styles.scss';

class CardRekomendasi extends Component {
  render() {
    const {
      props: {
        imageBackgroundDesktop,
        imageBackgroundMobile,
        altImage,
        iconRekomendasi,
        titleRekomendasi,
        onClick
      }
    } = this;
    const classNames = classname('o-card-rekomendasi cursor-pointer', {});
    return (
      <div className={classNames} onClick={onClick}>
        <div className="o-card-rekomendasi__image-wrapper o-card-rekomendasi__image-wrapper--d">
          <img src={imageBackgroundDesktop} alt={altImage} />
        </div>
        <div className="o-card-rekomendasi__image-wrapper o-card-rekomendasi__image-wrapper--m">
          <img src={imageBackgroundMobile} alt={altImage} />
        </div>
        <div className="o-card-rekomendasi__wrapper">
          <div className="o-card-rekomendasi__icon-wrapper">
            {iconRekomendasi ? (
              <img src={iconRekomendasi} alt={altImage} />
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="o-card-rekomendasi__wrapper">
          <div className="o-card-rekomendasi__text-wrapper">
            <H3 weight="bold" color="" className="desktop-only">
              {titleRekomendasi}
            </H3>
          </div>
        </div>
      </div>
    );
  }
}

CardRekomendasi.propTypes = {
  imageBackgroundDesktop: PropTypes.string,
  imageBackgroundMobile: PropTypes.string,
  iconRekomendasi: PropTypes.string,
  titleRekomendasi: PropTypes.string,
  altImage: PropTypes.string,
  onClick: PropTypes.func
};

CardRekomendasi.defaultProps = {
  imageBackgroundDesktop: '',
  imageBackgroundMobile: '',
  iconRekomendasi: '',
  titleRekomendasi: '',
  altImage: '',
  onClick: () => {}
};

export default CardRekomendasi;
