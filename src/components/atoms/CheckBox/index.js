// Checkbox Component
// --------------------------------------------------------

import React from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';

import './styles.scss';

const CheckBox = ({
  className,
  id,
  name,
  children,
  onChange,
  isChecked,
  isMultipleChoice,
  disabled
}) => {
  const classNames = classname('a-checkbox', className);
  return (
    <div className={classNames}>
      {isMultipleChoice ? (
        <input
          type="checkbox"
          name={name}
          id={id}
          onChange={(e) => onChange(e)}
          checked={isChecked}
          disabled={disabled}
        />
      ) : (
        <input
          type="checkbox"
          name={name}
          id={id}
          checked={isChecked}
          disabled={disabled}
          onChange={(e) => onChange(e)}
        />
      )}
      <label htmlFor={id}>{children}</label>
    </div>
  );
};

CheckBox.propTypes = {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  id: PropTypes.string,
  name: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onChange: PropTypes.func,
  isChecked: PropTypes.bool,
  isMultipleChoice: PropTypes.bool,
  disabled: PropTypes.bool
};

CheckBox.defaultProps = {
  className: '',
  id: 'dummyid',
  name: 'dummyname',
  children: '',
  onChange: () => {},
  isChecked: false,
  isMultipleChoice: false,
  disabled: false
};

export default CheckBox;
