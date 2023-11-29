// TextTopNav Component
// --------------------------------------------------------

import React from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';
import { Link } from 'react-router-dom';
import './styles.scss';

const TextTopNav = ({
  type,
  to,
  className,
  color,
  target,
  weight,
  tabIndex,
  onClick,
  children
}) => {
  const classNames = classname('a-text-top-nav', className, color, weight);

  return (
    <>
      {type === 'link' && (
        <a
          href={to}
          className={classNames}
          target={target}
          tabIndex={tabIndex}
          onClick={onClick}
        >
          {children}
        </a>
      )}
      {type === 'link-dom' && (
        <Link
          to={to}
          className={classNames}
          target={target}
          tabIndex={tabIndex}
          onClick={onClick}
        >
          {children}
        </Link>
      )}
    </>
  );
};

TextTopNav.propTypes = {
  type: PropTypes.string,
  to: PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.string,
  target: PropTypes.string,
  weight: PropTypes.string,
  tabIndex: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node
};

TextTopNav.defaultProps = {
  type: 'link-dom',
  to: '',
  className: '',
  color: '',
  target: '_self',
  weight: '',
  tabIndex: '0',
  onClick: () => {},
  children: ''
};
export default TextTopNav;
