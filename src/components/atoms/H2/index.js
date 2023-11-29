// H2 Component
// --------------------------------------------------------

import React from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';
import './styles.scss';

const H2 = ({ className, color, weight, children }) => {
  const classNames = classname('a-h2', className, color, weight);
  return <h2 className={classNames}>{children}</h2>;
};

H2.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  weight: PropTypes.string,
  children: PropTypes.node
};

H2.defaultProps = {
  className: '',
  color: '',
  weight: '',
  children: ''
};

export default H2;
