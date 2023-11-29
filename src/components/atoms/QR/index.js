import React from 'react';
import PropTypes from 'prop-types';
import QRCode from 'react-qr-code';

const QR = ({ value }) => <QRCode size={80} value={value} />;

QR.propTypes = {
  value: PropTypes.string
};

QR.defaultProps = {
  value: ''
};

export default QR;
