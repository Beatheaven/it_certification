import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ProgressBarPage } from 'components/molecules';
import classname from 'classnames';

// style
import './styles.scss';

class CardProgressBar extends Component {
  render() {
    const {
      props: { nameProgress, valueBar }
    } = this;
    const classNames = classname('o-card-progress-bar', {});
    return (
      <div className={classNames}>
        <div className="o-card-progress-bar__progress-bar-wrapper">
          <ProgressBarPage nameProgress={nameProgress} valueBar={valueBar} />
        </div>
      </div>
    );
  }
}
CardProgressBar.propTypes = {
  nameProgress: PropTypes.string,
  valueBar: PropTypes.string
};

CardProgressBar.defaultProps = {
  nameProgress: '',
  valueBar: ''
};

export default CardProgressBar;
