import React from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';
import { withRouter } from 'react-router-dom';

import { H4, TextBody, EmptyContent } from 'components';

import IcPlay from '../../../../assets/images/icons/ic-play.svg';

const ContentModules = ({
  dataVideo,
  changeVideoSource,
  history,
  titleClass,
  selectedVideo
}) => {
  const classNames = classname('content-modules', {});

  return (
    <div className={classNames}>
      <H4 color="black" weight="bold">
        MATERI {titleClass.toUpperCase()}
      </H4>
      <div className="content-modules--wrapper">
        {dataVideo.length ? (
          dataVideo.map((video, i) => (
            <div className="modules-content">
              <div className="modules-content__numbering">
                <TextBody weight="bold">{i + 1}</TextBody>
              </div>
              <div className="modules-item">
                <div
                  className={`modules-item__title cursor-pointer ${
                    selectedVideo === video.id62 ? 'active' : ''
                  }`}
                  onClick={() =>
                    changeVideoSource({ url: video.url, id: video.id62 })
                  }
                >
                  <img src={IcPlay} className="ic-play" alt="play" />
                  <TextBody color="primary">{video.display_name}</TextBody>
                </div>
                <div className="modules-item__duration">
                  <TextBody color="grey125">{video.duration} Menit</TextBody>
                </div>
              </div>
            </div>
          ))
        ) : (
          <EmptyContent
            title="Mohon maaf, konten video belum tersedia"
            description="Sambil menunggu konten video tersedia, yuk ikuti kursus yang lain juga dengan klik tombol di bawah ini"
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

ContentModules.propTypes = {
  history: PropTypes.object,
  changeVideoSource: PropTypes.func,
  dataVideo: PropTypes.array,
  titleClass: PropTypes.string,
  selectedVideo: PropTypes.string
};

ContentModules.defaultProps = {
  history: { push: '/' },
  changeVideoSource: () => {},
  dataVideo: [],
  titleClass: '',
  selectedVideo: ''
};

export default withRouter(ContentModules);
