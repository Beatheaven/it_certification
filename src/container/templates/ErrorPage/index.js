// ErrorPage Component
// --------------------------------------------------------

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';

// components
import { H2, Button } from 'components';

// helpers
import { delay } from 'helpers';

// styles
import './styles.scss';

class ErrorPage extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      showContent: false
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.classList.add('bg-black');
    this.handleShowContent();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleShowContent = () => {
    this._isMounted = true;

    delay(250).then(() => {
      if (this._isMounted) {
        this.setState({ showContent: true });
      }
    });
  };

  render() {
    const {
      state: { showContent },
      props: {
        className,
        image,
        title,
        subTitle,
        buttonText,
        buttonType,
        buttonTo,
        buttonTarget,
        buttonTabIndex,
        buttonOnClick,
        children
      }
    } = this;

    const classNames = classname('t-error-page', className, {
      'show-content': showContent
    });

    return (
      <div className={classNames}>
        <div className="outer-container">
          <div className="inner-container">
            <img src={image} alt={title} />
            <H2 color="black" weight="light">
              {title}
            </H2>
            <p
              className="sub-title"
              dangerouslySetInnerHTML={{ __html: subTitle }}
            />
            {buttonText !== '' && (
              <Button
                variant="primary"
                type={buttonType}
                to={buttonTo}
                target={buttonTarget}
                tabIndex={buttonTabIndex}
                onClick={buttonOnClick}
              >
                {buttonText}
              </Button>
            )}
            {children}
          </div>
        </div>
      </div>
    );
  }
}

ErrorPage.propTypes = {
  className: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  buttonText: PropTypes.string,
  buttonType: PropTypes.string,
  buttonTo: PropTypes.string,
  buttonTarget: PropTypes.string,
  buttonTabIndex: PropTypes.string,
  buttonOnClick: PropTypes.func,
  children: PropTypes.node
};

ErrorPage.defaultProps = {
  className: '',
  image: '',
  title: '',
  subTitle: '',
  buttonText: '',
  buttonType: 'link-dom',
  buttonTo: '',
  buttonTarget: '_self',
  buttonTabIndex: '0',
  buttonOnClick: () => {},
  children: ''
};

export default ErrorPage;
