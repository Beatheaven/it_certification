import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ClipLoader from 'react-spinners/ClipLoader';

import './styles.scss';

const Loading = ({ loading, full }) => {
  const classNames = classnames('a-loading__wrapper', { full });

  return (
    loading && (
      <div className={classNames}>
        <ClipLoader color="#0A549A" />
      </div>
    )
  );
};

Loading.propTypes = {
  loading: PropTypes.bool,
  full: PropTypes.bool
};

Loading.defaultProps = {
  loading: false,
  full: false
};

export default Loading;
