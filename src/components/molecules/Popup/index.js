// Popup Component
// --------------------------------------------------------

import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// PLUGINS
import { CSSTransitionGroup } from 'react-transition-group';
import classname from 'classnames';

// helpers
import { removeScrollOnPopup } from 'helpers';

import { SystemIcon } from 'components/atoms';

// styles
import './styles.scss';

const Popup = ({
  className,
  left,
  showPopup,
  hideClose,
  onClickClosePopup,
  image,
  imageTitle,
  variant,
  children
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(showPopup);

    removeScrollOnPopup(showPopup);
  }, [showPopup]);

  const classNames = classname('m-popup', className, {
    dark: variant === 'dark',
    // use variant time out for popup timeout
    timeout: variant === 'timeout',
    'left-content': left
  });

  const handleClickClosePopup = () => {
    onClickClosePopup();
  };

  return (
    <CSSTransitionGroup
      component={Fragment}
      transitionName="pnet-popup-scale"
      transitionEnterTimeout={500}
      transitionLeaveTimeout={500}
    >
      {show && (
        <div className={classNames}>
          <div className="inner-popup">
            <div className="centered-popup">
              <div className={`content-popup ${variant}`}>
                {!hideClose && (
                  <button
                    className="popup-button-close"
                    type="button"
                    onClick={handleClickClosePopup}
                  >
                    <SystemIcon name="close-32" dsize="32" />
                  </button>
                )}
                {image !== '' && (
                  <div className="popup-head">
                    <img src={image} alt={imageTitle} />
                  </div>
                )}
                <div className="popup-body">{children}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </CSSTransitionGroup>
  );
};

Popup.propTypes = {
  className: PropTypes.string,
  left: PropTypes.bool,
  image: PropTypes.string,
  imageTitle: PropTypes.string,
  showPopup: PropTypes.bool,
  hideClose: PropTypes.bool,
  onClickClosePopup: PropTypes.func,
  variant: PropTypes.string,
  children: PropTypes.node
};

Popup.defaultProps = {
  className: '',
  left: false,
  image: '',
  imageTitle: '',
  showPopup: false,
  hideClose: false,
  onClickClosePopup: () => {},
  variant: '',
  children: ''
};

export default Popup;
