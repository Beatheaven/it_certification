import React from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';

import SystemIcon from '../SystemIcon';
// Styles
import './styles.scss';

const StepperForm = ({ className, status, withLine, value, text, onClick }) => {
  const classNames = classname('o-stepper-form', className, status, {});
  const classText = classname('o-stepper-form__text-wrapper', {
    'is-active': status === 'is-active'
  });
  const classStep = classname('o-stepper-form__step-wrapper', {
    'is-active': status === 'is-active',
    'is-done': status === 'is-done'
  });
  const classLineTab = classname('o-stepper-form', {
    'line-tab': withLine
  });
  return (
    <div className={classNames}>
      <div onClick={onClick} className={classStep}>
        {status === 'is-done' ? (
          <div className="value">
            <SystemIcon name="check" />
          </div>
        ) : (
          <div className="value">{value}</div>
        )}
      </div>
      <div className={classText}>{text}</div>
      <div className={classLineTab}>
        <hr />
      </div>
    </div>
  );
};

StepperForm.propTypes = {
  className: PropTypes.string,
  status: PropTypes.string,
  withLine: PropTypes.bool,
  value: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func
};

StepperForm.defaultProps = {
  className: '',
  status: '',
  withLine: '',
  value: '',
  text: '',
  onClick: () => {}
};

export default StepperForm;
