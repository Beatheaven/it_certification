// Checkbox Component
// --------------------------------------------------------

import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';

import './styles.scss';

const Radio = ({
  className,
  id,
  name,
  children,
  onChange,
  isChecked,
  isMultipleChoice,
  disabled,
  value,
  valueSelect,
  variant,
  titleBottom,
  optionSelect,
  onDisabled
}) => {
  const classNames = classname('a-radio', className);

  const prevDisabled = useRef(disabled);
  useEffect(() => {
    if (prevDisabled.current !== disabled && disabled) {
      onDisabled();
    }
  }, [disabled, onDisabled]);

  return (
    <div className={classNames}>
      {isMultipleChoice ? (
        <input
          type="radio"
          name={name}
          id={id}
          onChange={(e) => onChange(e)}
          checked={isChecked}
          disabled={disabled}
          value={optionSelect.filter((obj) => obj.value === valueSelect)}
          variant={variant}
        />
      ) : (
        <input
          type="radio"
          checked={isChecked}
          disabled={disabled}
          value={optionSelect.filter((obj) => obj.value === valueSelect)}
          name={name}
          id={id}
          onChange={(e) => onChange(e)}
        />
      )}
      <label htmlFor={id}>{children}</label>
    </div>
  );
};

Radio.propTypes = {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onChange: PropTypes.func,
  isChecked: PropTypes.bool,
  isMultipleChoice: PropTypes.bool,
  disabled: PropTypes.bool,
  valueSelect: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  variant: PropTypes.string,
  optionSelect: PropTypes.array,
  titleBottom: PropTypes.string,
  onDisabled: PropTypes.func
};

Radio.defaultProps = {
  className: '',
  id: 0,
  name: 'dummyname',
  children: '',
  onChange: () => {},
  isChecked: false,
  isMultipleChoice: false,
  disabled: false,
  value: '',
  variant: '',
  titleBottom: '',
  valueSelect: null,
  optionSelect: [],
  onDisabled: () => {}
};

export default Radio;
