import React from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';
import { H4, ProgressBar } from 'components/atoms';

// style
import './styles.scss';

const ProgressBarPage = ({ className, variant, nameProgress, valueBar }) => {
  const classNames = classname('o-progress-bar-page', className, variant);
  return (
    <div className={classNames}>
      <div className="o-progress-bar-page__wrapper">
        <div className="row">
          <div className="title-progress-bar-wrapper">
            <H4 weight="bold" className="desktop-only">
              {nameProgress}
            </H4>
          </div>
          <div className="subtitle-progress-bar-wrapper">
            <H4 weight="bold" className="desktop-only">
              {valueBar}
            </H4>
          </div>
        </div>
        <div className="row">
          <div className="bar-progress-bar-wrapper">
            <ProgressBar className="desktop-only" width={valueBar} />
          </div>
        </div>
      </div>
    </div>
  );
};

ProgressBarPage.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.string,
  nameProgress: PropTypes.string,
  valueBar: PropTypes.string
};

ProgressBarPage.defaultProps = {
  className: '',
  variant: '',
  nameProgress: '',
  valueBar: ''
};

export default ProgressBarPage;
