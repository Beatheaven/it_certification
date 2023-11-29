import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, H3, TextBody } from 'components/atoms';
import classname from 'classnames';

// style
import './styles.scss';

class CardIUmkm extends Component {
  render() {
    const {
      props: {
        imageBackground,
        altImage,
        titleCardIumkm,
        descCardIUmkm,
        actionButtonConfirm,
        actionButtonRegister
      }
    } = this;
    const classNames = classname(
      'o-card-item-i-umkm col-12 col-md-6 col-lg-4',
      {}
    );
    return (
      <div className={classNames}>
        <div className="o-card-item-i-umkm__image-wrapper o-card-item-i-umkm__image-wrapper--d">
          <img src={imageBackground} alt={altImage} />
        </div>
        <div className="o-card-item-i-umkm__wrapper">
          <div className="o-card-item-i-umkm__head">
            <div className="o-card-item-i-umkm__text-wrapper">
              <H3 weight="bold" color="" className="desktop-only">
                {titleCardIumkm}
              </H3>
              <TextBody>{descCardIUmkm}</TextBody>
            </div>
            <div className="o-card-item-i-umkm__button-wrapper">
              <Button variant="secondary" type="link" to={actionButtonConfirm}>
                Konfirmasi
              </Button>
              <Button variant="primary" type="link" to={actionButtonRegister}>
                Daftarkan
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CardIUmkm.propTypes = {
  imageBackground: PropTypes.string,
  altImage: PropTypes.string,
  titleCardIumkm: PropTypes.string,
  descCardIUmkm: PropTypes.string,
  actionButtonConfirm: PropTypes.string,
  actionButtonRegister: PropTypes.string
};

CardIUmkm.defaultProps = {
  imageBackground: '',
  altImage: '',
  titleCardIumkm: '',
  descCardIUmkm: '',
  actionButtonConfirm: '',
  actionButtonRegister: ''
};

export default CardIUmkm;
