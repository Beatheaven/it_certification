// Button Component
// --------------------------------

import React from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';
import './styles.scss';

const NavItem = ({
  className,
  style,
  type,
  variant,
  family,
  tabIndex,
  onClick,
  disabled,
  full,
  children
}) => {
  const classNames = classname('a-navitem', className, variant, family, {
    'full-content': full
  });
  return (
    <>
      <button
        // eslint-disable-next-line react/button-has-type
        type={type}
        className={classNames}
        onClick={onClick}
        tabIndex={tabIndex}
        style={style}
        disabled={disabled}
      >
        {children}
      </button>
    </>
  );
};

NavItem.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  variant: PropTypes.string,
  family: PropTypes.string,
  tabIndex: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  full: PropTypes.bool,
  children: PropTypes.node
};

NavItem.defaultProps = {
  className: '',
  style: {},
  type: 'button',
  variant: '',
  family: '',
  tabIndex: '0',
  onClick: () => {},
  disabled: false,
  full: false,
  children: ''
};

export default NavItem;
