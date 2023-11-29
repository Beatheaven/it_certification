import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/id';

import { Popup } from 'components';

import { getTestResult } from '../../../services';

const ScoreHistory = ({ show, onClose, classId }) => {
  const [dataTest, setDataTest] = useState({});
  const [historyScore, setHistoryScore] = useState([]);

  moment.locale('id');
  const formatDate = (date) => moment(date).format('DD MMMM YYYY');
  const isDateValid = (date) => moment(date).isValid();

  // methods
  const fetchTestResult = () => {
    const params = {
      class_id62: classId
    };
    getTestResult(params)
      .then(({ data }) => {
        setDataTest(data);
        setHistoryScore(data.score?.all);
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (classId) {
      fetchTestResult();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classId]);

  return (
    <Popup
      showPopup={show}
      onClickClosePopup={onClose}
      className="score-history"
    >
      <div className="score-history__head">
        Riwayat Skor Tes
        <p className="bold name-courses">{dataTest.display_name}</p>
        <div className="score-history__current-score">
          <div>Skor saat ini</div>
          <div className="test-score">
            {Number(dataTest?.score?.higest).toFixed(2)}
          </div>
        </div>
      </div>
      <div className="history-class__header">
        <div className="history-class__header--item">Selesai</div>
        <div className="history-class__header--item">Skor</div>
      </div>
      {historyScore.map((tes, i) => (
        <div className="history-class__body">
          <div className="history-class__body--item">
            {isDateValid(tes.done_at) && formatDate(tes.done_at)}
          </div>
          <div className="history-class__body--item">
            {Number(tes.score).toFixed(2)}
          </div>
        </div>
      ))}
    </Popup>
  );
};

ScoreHistory.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  classId: PropTypes.string
};

ScoreHistory.defaultProps = {
  show: false,
  onClose: () => {},
  classId: null
};

export default ScoreHistory;
