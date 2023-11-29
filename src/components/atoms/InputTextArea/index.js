// Text Area Component
// --------------------------------------------------------

import React from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';
import TextBody from '../TextBody';
import './styles.scss';
import iconPencil from '../../../assets/images/icon-pencil.png';

const InputTextArea = ({
  id,
  className,
  placeholder,
  variant,
  name,
  value,
  type,
  title,
  subtitle,
  titleBottom,
  titleBottomColor,
  handleChange,
  handleIcon,
  withIcon,
  isDisable
}) => {
  const classNames = classname('o-input-text-area', className, variant);
  return (
    <div className={classNames}>
      {title && (
        <div className="title-wrapper">
          <div className="text-title">
            {title}
            {subtitle && (
              <TextBody color="gray" weight="light">
                {subtitle}
              </TextBody>
            )}
          </div>
          {withIcon && (
            <div className="icon-title" onClick={handleIcon}>
              <img src={iconPencil} alt="pross" />
            </div>
          )}
        </div>
      )}
      {isDisable ? (
        <textarea
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          className={variant}
          value={value}
          onChange={handleChange}
          disabled
        />
      ) : (
        <textarea
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          className={variant}
          value={value}
          onChange={handleChange}
        />
      )}
      {titleBottom && (
        <TextBody color={titleBottomColor || 'gray'} weight="light">
          {titleBottom}
        </TextBody>
      )}
    </div>
  );
};

InputTextArea.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  variant: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  titleBottom: PropTypes.string,
  titleBottomColor: PropTypes.string,
  handleChange: PropTypes.func,
  handleIcon: PropTypes.func,
  withIcon: PropTypes.bool,
  isDisable: PropTypes.bool
};

InputTextArea.defaultProps = {
  className: '',
  placeholder: '',
  variant: '',
  type: '',
  id: '',
  value: '',
  name: '',
  title: '',
  subtitle: '',
  titleBottom: '',
  titleBottomColor: '',
  handleChange: () => {},
  handleIcon: () => {},
  withIcon: false,
  isDisable: false
};

export default InputTextArea;
