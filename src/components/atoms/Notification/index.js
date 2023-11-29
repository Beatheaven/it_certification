// Notification Component
// --------------------------------

import React from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';
import TextBody from '../TextBody';
import './styles.scss';

const Notification = ({ className, style, status, title }) => {
  const classNames = classname('a-notif', className, style, status, {});
  return (
    <div className={classNames}>
      <TextBody color="white" weight="regular">
        {title}
      </TextBody>
    </div>
  );
};

Notification.propTypes = {
  className: PropTypes.string,
  style: PropTypes.string,
  status: PropTypes.string,
  title: PropTypes.string
};

Notification.defaultProps = {
  className: '',
  style: '',
  status: '',
  title: ''
};

export default Notification;
