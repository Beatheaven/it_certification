// Dropdown Component
// --------------------------------------------------------

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';
import './styles.scss';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      const { showHandler } = this.props;
      showHandler();
    }
  }

  render() {
    const {
      props: { className, children }
    } = this;
    const classNames = classname('o-dropdown', className);

    return (
      <div ref={this.wrapperRef} className={classNames}>
        {children}
      </div>
    );
  }
}

Dropdown.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  showHandler: PropTypes.func
};

Dropdown.defaultProps = {
  className: '',
  children: '',
  showHandler: () => {}
};

export default Dropdown;
