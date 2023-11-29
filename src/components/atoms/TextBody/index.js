// Body Component
// --------------------------------------------------------

import React from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';
import './styles.scss';

const TextBody = ({
  className,
  color,
  weight,
  children,
  variant,
  titleBottom,
  handleChange,
  value
}) => {
  const classNames = classname(
    'o--text-body',
    className,
    color,
    weight,
    variant,
    titleBottom,
    handleChange,
    value
  );
  return <div className={classNames}>{children}</div>;
};

TextBody.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  weight: PropTypes.string,
  children: PropTypes.node,
  variant: PropTypes.string,
  titleBottom: PropTypes.string,
  handleChange: PropTypes.func,
  value: PropTypes.string
};

TextBody.defaultProps = {
  className: '',
  color: '',
  weight: '',
  children: '',
  variant: '',
  titleBottom: '',
  handleChange: () => {},
  value: ''
};

export default TextBody;
