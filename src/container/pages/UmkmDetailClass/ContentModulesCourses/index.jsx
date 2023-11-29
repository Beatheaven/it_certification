import React from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';
import { withRouter } from 'react-router-dom';
import { H4, TextBody, EmptyContent } from 'components';

import IcFile from '../../../../assets/images/icons/ic-file.svg';

const ContentModules = ({
  dataModule,
  changeDocumentSource,
  history,
  titleClass,
  selectedModul
}) => {
  const classNames = classname('content-modules', {});

  return (
    <div className={classNames}>
      <H4 color="black" weight="bold">
        MATERI {titleClass.toUpperCase()}
      </H4>
      <div className="content-modules--wrapper">
        {dataModule.length ? (
          dataModule.map((modul, i) => (
            <div className="modules-content">
              <div className="modules-content__numbering">
                <TextBody weight="bold">{i + 1}</TextBody>
              </div>
              <div className="modules-item">
                <div
                  className={`modules-item__title cursor-pointer ${
                    selectedModul === modul.id62 ? 'active' : ''
                  }`}
                  onClick={() =>
                    changeDocumentSource({ url: modul.url, id: modul.id62 })
                  }
                >
                  <img src={IcFile} className="ic-play" alt="play" />
                  <TextBody color="primary">{modul.display_name}</TextBody>
                </div>
              </div>
            </div>
          ))
        ) : (
          <EmptyContent
            title="Mohon maaf, modul belum tersedia"
            description="Sambil menunggu modul tersedia, yuk ikuti kursus yang lain juga dengan klik tombol di bawah ini"
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
  dataModule: PropTypes.array,
  changeDocumentSource: PropTypes.func,
  titleClass: PropTypes.string,
  selectedModul: PropTypes.string
};

ContentModules.defaultProps = {
  history: { push: '/' },
  dataModule: [],
  changeDocumentSource: () => {},
  titleClass: '',
  selectedModul: ''
};

export default withRouter(ContentModules);
