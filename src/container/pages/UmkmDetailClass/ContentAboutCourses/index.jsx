import React from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';
import { H4 } from 'components';

const ContentAboutCourses = ({ dataAbout }) => {
  const classNames = classname('content-modules', {});
  return (
    <div className={classNames}>
      <H4 color="black" weight="bold">
        Tentang Kursus
      </H4>
      <div className="content-modules--wrapper">
        <div className="modules-about">
          <div className="about-content">{dataAbout.short_description}</div>
        </div>
        <div className="modules-about">
          <div className="col-sm-2">
            <div className="title-about">Video</div>
          </div>
          <div className="col-sm-10">
            <div className="item-modul">
              {dataAbout?.videos?.length || 0} materi
            </div>
          </div>
        </div>
        <div className="modules-about">
          <div className="col-sm-2">
            <div className="title-about">Modul</div>
          </div>
          <div className="col-sm-10">
            <div className="item-modul">
              {dataAbout?.modules?.length || 0} materi
            </div>
          </div>
        </div>
        <div className="modules-about">
          <div className="col-sm-2">
            <div className="title-about__deskripsi">Deskripsi</div>
          </div>
          <div className="col-sm-10">
            <div className="title-deskripsi">{dataAbout.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

ContentAboutCourses.propTypes = {
  dataAbout: PropTypes.object
};

ContentAboutCourses.defaultProps = {
  dataAbout: {}
};

export default ContentAboutCourses;
