import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/id';

import { TextBody } from 'components';
import { withRouter } from 'react-router-dom';
import ScoreHistory from './_ScoreHistory';

const ItemClassHistory = ({ data, history, children }) => {
  const [showScoreHistory, setShowScoreHistory] = useState(false);
  moment.locale('id');
  const formatDate = (date) => moment(date).format('DD MMMM YYYY');
  const isDateValid = (date) => moment(date).isValid();
  const testScore = data.score?.higest
    ? Number(data.score.higest).toFixed(2)
    : 0;

  return (
    <div className="history-class__body">
      <div className="history-class__body--item">
        <div
          className="history-title cursor-pointer"
          onClick={() => history.push(`/umkm-smart/kelas/${data.class_id62}`)}
        >
          {data.background_cover ? (
            <div
              className="history-title__img"
              style={{
                backgroundImage: `url(${data.background_cover})`
              }}
            />
          ) : (
            <></>
          )}
          <TextBody>{data.display_name}</TextBody>
        </div>
      </div>
      <div className="history-class__body--item">
        <TextBody>{data.duration || 0} Menit</TextBody>
      </div>
      <div className="history-class__body--item">
        <TextBody>
          {isDateValid(data.end_at) && formatDate(data.end_at)}
        </TextBody>
      </div>
      <div className="history-class__body--item">
        <TextBody color="success">
          {testScore}/{data.max_score || 0}
        </TextBody>
        <div
          className="o--text-body a-links red underline cursor-pointer"
          onClick={() => setShowScoreHistory(true)}
        >
          Lihat Riwayat Skor
        </div>
      </div>
      <ScoreHistory
        show={showScoreHistory}
        onClose={() => setShowScoreHistory(false)}
        classId={data.class_id62}
      />
    </div>
  );
};

ItemClassHistory.propTypes = {
  history: PropTypes.object,
  data: PropTypes.object,
  children: PropTypes.element
};

ItemClassHistory.defaultProps = {
  history: { push: '/' },
  data: {},
  children: <></>
};

export default withRouter(ItemClassHistory);
