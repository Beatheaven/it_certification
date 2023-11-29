import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import classname from 'classnames';
import { Button, H3, H4, EmptyContent } from 'components';

import { postTakeModule } from '../../../../services';

const ContentWebinar = ({ dataWebinar, history, match }) => {
  const classNames = classname('content-modules', {});

  const handlePostTakeModule = (moduleId) => {
    const { classId } = match.params;
    const data = {
      class_id62: classId,
      module_id62: moduleId
    };

    postTakeModule(data)
      .then((response) => {})
      .catch((err) => {
        throw err;
      });
  };

  const handleSelectWebinar = (data) => {
    handlePostTakeModule(data.id62);
    window.open(data.url);
  };

  return (
    <div className={classNames}>
      <H3 color="black" weight="bold" className="pl-16">
        WEBINAR
      </H3>
      <div className="content-webinar">
        {dataWebinar.length ? (
          dataWebinar.map((webinar, i) => (
            <div key={i} className="o-card--webinar">
              <div className="o-card--webinar-item">
                <div
                  className="o-card--webinar__img"
                  style={{
                    backgroundImage: `url(${webinar.cover})`
                  }}
                />
                <div className="o-card--webinar__content">
                  <H4 color="black" weight="bold">
                    {webinar.display_name}
                  </H4>
                </div>
                <div className="o-card--webinar__action">
                  <Button
                    variant="primary"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSelectWebinar(webinar);
                    }}
                  >
                    Tonton Sekarang
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <EmptyContent
            title="Mohon maaf, webinar belum tersedia"
            description="Sambil menunggu webinar tersedia, yuk ikuti kursus yang lain juga dengan klik tombol di bawah ini"
            showAction
            titleAction="Catalog Pelatihan"
            actionClicked={() => {
              history.push('/umkm-smart/kelas');
            }}
          />
        )}
      </div>
    </div>
  );
};

ContentWebinar.propTypes = {
  dataWebinar: PropTypes.array,
  history: PropTypes.object,
  match: PropTypes.object
};

ContentWebinar.defaultProps = {
  dataWebinar: [],
  history: { push: '/' },
  match: {}
};

export default withRouter(ContentWebinar);
