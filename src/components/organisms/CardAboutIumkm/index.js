import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, H4, TextBody } from 'components/atoms';
import classname from 'classnames';

// style
import './styles.scss';

class CardAbout extends Component {
  render() {
    const {
      props: {
        imagePosition,
        imageCardAbout,
        altImageCardAbout,
        titleCardAbout,
        descCardAbout,
        titleButtonCardAbout,
        actionButtonCardAbout
      }
    } = this;
    const classNames = classname('o-card-about-i-umkm', {});
    return (
      <div className={classNames}>
        {imagePosition === 'left' && (
          <div className="o-card-about-i-umkm__image-wrapper">
            <img src={imageCardAbout} alt={altImageCardAbout} />
          </div>
        )}
        <div className="o-card-about-i-umkm__wrapper">
          <div className="o-card-about-i-umkm__text-wrapper">
            <H4 weight="bold">{titleCardAbout}</H4>
            <TextBody color="black" weight="light text-subs">
              {descCardAbout}
            </TextBody>
          </div>
          <div className="o-card-about-i-umkm__button-wrapper">
            <Button type="link" onClick={actionButtonCardAbout}>
              {titleButtonCardAbout}
            </Button>
          </div>
        </div>
        {imagePosition === 'right' && (
          <div className="o-card-about-i-umkm__image-wrapper right">
            <img src={imageCardAbout} alt={altImageCardAbout} />
          </div>
        )}
      </div>
    );
  }
}

CardAbout.propTypes = {
  imagePosition: PropTypes.string,
  imageCardAbout: PropTypes.string,
  altImageCardAbout: PropTypes.string,
  titleCardAbout: PropTypes.string,
  descCardAbout: PropTypes.string,
  titleButtonCardAbout: PropTypes.string,
  actionButtonCardAbout: PropTypes.func
};

CardAbout.defaultProps = {
  imagePosition: 'left',
  imageCardAbout: '',
  altImageCardAbout: '',
  titleCardAbout: '',
  descCardAbout: '',
  titleButtonCardAbout: '',
  actionButtonCardAbout: () => {}
};

export default CardAbout;
