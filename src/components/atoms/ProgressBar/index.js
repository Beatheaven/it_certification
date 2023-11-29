// Body Component
// --------------------------------------------------------

import React from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';
import './styles.scss';

const ProgressBar = ({ className, width }) => {
  const classNames = classname('o-progress-bar', className, width);
  return (
    <div className={classNames}>
      <div className="bar" style={{ width: `${width}` }} />
    </div>
  );
};

ProgressBar.propTypes = {
  className: PropTypes.string,
  width: PropTypes.string
};

ProgressBar.defaultProps = {
  className: '',
  width: ''
};

export default ProgressBar;
