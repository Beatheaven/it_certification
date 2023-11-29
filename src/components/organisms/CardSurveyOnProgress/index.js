import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, H2, TextBody } from 'components/atoms';
import { ProgressBarPage } from 'components/molecules';
import classname from 'classnames';

// style
import './styles.scss';

// assets
import ImageCardSurveyOnProgress from '../../../assets/images/banner/image-card-survey.png';
import ImageCardSurveyOnProgressMobile from '../../../assets/images/banner/image-card-survey-mobile.png';

class CardSurveyOnProgress extends Component {
  render() {
    const {
      props: {
        imageBackgroundDesktop,
        imageBackgroundMobile,
        altImage,
        titleCardSurveyOnProgress,
        descCardSurveyOnProgress,
        titleButton,
        actionButton,
        valueBar,
        nameProgress
      }
    } = this;
    const classNames = classname('o-card-survey-onprogress', {});
    return (
      <div className={classNames}>
        <div className="o-card-survey-onprogress__image-wrapper o-card-survey-onprogress__image-wrapper--d">
          <img src={imageBackgroundDesktop} alt={altImage} />
        </div>
        <div className="o-card-survey-onprogress__image-wrapper o-card-survey-onprogress__image-wrapper--m">
          <img src={imageBackgroundMobile} alt={altImage} />
        </div>
        <div className="o-card-survey-onprogress__wrapper">
          <div className="o-card-survey-onprogress__text-wrapper">
            <H2 weight="bold" color="" className="desktop-only">
              {titleCardSurveyOnProgress}
            </H2>
            <TextBody
              weight="regular"
              color="secondary"
              className="desktop-only"
            >
              {descCardSurveyOnProgress}
            </TextBody>
            <ProgressBarPage nameProgress={nameProgress} valueBar={valueBar} />
          </div>
          <div className="o-card-survey-onprogress__button-wrapper">
            <Button variant="primary" onClick={actionButton}>
              {titleButton}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

CardSurveyOnProgress.propTypes = {
  imageBackgroundDesktop: PropTypes.string,
  imageBackgroundMobile: PropTypes.string,
  altImage: PropTypes.string,
  titleCardSurveyOnProgress: PropTypes.string,
  descCardSurveyOnProgress: PropTypes.string,
  titleButton: PropTypes.string,
  valueBar: PropTypes.string,
  actionButton: PropTypes.func,
  nameProgress: PropTypes.string
};

CardSurveyOnProgress.defaultProps = {
  imageBackgroundDesktop: ImageCardSurveyOnProgress,
  imageBackgroundMobile: ImageCardSurveyOnProgressMobile,
  altImage: '',
  titleCardSurveyOnProgress: '',
  descCardSurveyOnProgress: '',
  titleButton: 'Lanjutkan',
  valueBar: '0%',
  nameProgress: 'PROGRESS PENGERJAAN',
  actionButton: () => {}
};

export default CardSurveyOnProgress;
