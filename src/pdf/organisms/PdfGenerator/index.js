import React from 'react';
import PropTypes from 'prop-types';
import { saveAs } from 'file-saver';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';

import './styles.scss';

const PdfGenerator = ({ document, viewer, link, linkLabel, filename }) => (
  <div>
    {viewer && (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <PDFViewer className="pdf">{document}</PDFViewer>
          </div>
        </div>
      </div>
    )}
    {link && (
      <PDFDownloadLink
        className="link"
        document={document}
        fileName={`${filename}.pdf`}
      >
        {({ blob, url, loading, error }) => {
          if (blob !== null) saveAs(blob, `${filename}.pdf`);
          return loading ? 'MEMUAT DOKUMEN...' : linkLabel;
        }}
      </PDFDownloadLink>
    )}
  </div>
);

PdfGenerator.propTypes = {
  viewer: PropTypes.bool,
  link: PropTypes.bool,
  linkLabel: PropTypes.string,
  filename: PropTypes.string,
  document: PropTypes.object
};

PdfGenerator.defaultProps = {
  viewer: false,
  link: false,
  linkLabel: 'Download now!',
  filename: 'download',
  document: null
};

export default PdfGenerator;
