// SystemIcon Component
// --------------------------------------------------------

import React from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';
import './styles.scss';

const SystemIcon = ({ name, color, dsize, msize, className }) => {
  const classNames = classname(
    'a-system-icon',
    `icon-${name}`,
    color,
    `d-icon-${dsize}`,
    `micon m-icon-${msize}`,
    className
  );

  return <i className={classNames} />;
};

SystemIcon.propTypes = {
  name: PropTypes.string,
  dsize: PropTypes.string,
  msize: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string
};

SystemIcon.defaultProps = {
  name: '',
  dsize: '',
  msize: '',
  color: '',
  className: ''
};

export default SystemIcon;
