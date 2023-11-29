// Logo Component
// --------------------------------------------------------

import React from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';
import './styles.scss';

const Logo = ({ name, className }) => {
  const classNames = classname('a-logo', className, {
    'it-certification': name === 'itCertification',
    gpn: name === 'gpn',
    ojk: name === 'ojk'
  });

  return <div className={classNames} />;
};

Logo.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string
};

Logo.defaultProps = {
  name: '',
  className: ''
};

export default Logo;
