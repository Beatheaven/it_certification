// Dropdown Component
// --------------------------------------------------------

import React from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';
import './styles.scss';

const DropdownItem = ({ className, children, onClick }) => {
  const classNames = classname('o-dropdown-item', className);

  return (
    <div className={classNames} onClick={onClick}>
      {children}
    </div>
  );
};

DropdownItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func
};

DropdownItem.defaultProps = {
  className: '',
  children: '',
  onClick: () => {}
};

export default DropdownItem;
