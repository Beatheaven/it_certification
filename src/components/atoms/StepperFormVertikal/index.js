import React from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';

import SystemIcon from '../SystemIcon';
// Styles
import './styles.scss';

const StepperFormVertikal = ({ className, status, value, text, onClick }) => {
  const classNames = classname(
    'o-stepper-form-vertikal',
    className,
    status,
    {}
  );
  const classText = classname('o-stepper-form-vertikal__text-wrapper', {
    'is-active': status === 'is-active'
  });
  const classStep = classname('o-stepper-form-vertikal__step-wrapper', {
    'is-active': status === 'is-active',
    'is-done': status === 'is-done'
  });
  return (
    <div>
      <div className={classNames}>
        <div onClick={onClick} className={classStep}>
          {status === 'is-done' ? (
            <div className="value">
              <SystemIcon name="selected" />
            </div>
          ) : (
            <div className="value">{value}</div>
          )}
        </div>
        <div className={classText}>{text}</div>
      </div>
    </div>
  );
};

StepperFormVertikal.propTypes = {
  className: PropTypes.string,
  status: PropTypes.string,
  value: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func
};

StepperFormVertikal.defaultProps = {
  className: '',
  status: '',
  value: '',
  text: '',
  onClick: () => {}
};

export default StepperFormVertikal;
