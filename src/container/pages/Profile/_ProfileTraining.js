import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

// components
import { Button, H3, TextBody, Links } from 'components/atoms';
import { ProgressBarPage } from 'components/molecules';

// assets
import ImagePelatihanEmptyState from 'assets/images/banner/empty-pelatihan-banner.png';

import { getClassHistory } from '../../../services';

const ProfileTraining = ({ history }) => {
  const [dataCourses, setDataCourses] = useState([]);

  // methods
  const fetchTestResult = () => {
    getClassHistory()
      .then(({ data }) => {
        setDataCourses(data || []);
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchTestResult();
  }, []);

  return (
    <div className="o-profile__content">
      <section className="o-profile__body">
        <H3 color="black" weight="bold">
          Pelatihan
        </H3>
        <div className="row">
          {dataCourses.length ? (
            dataCourses.map((course, i) => (
              <div key={i} className="col-sm-6">
                <div className="o-courses-card">
                  <div
                    className="o-courses-card__img"
                    style={{
                      backgroundImage: `url(${course.background_cover})`
                    }}
                  />
                  <div className="o-courses-card__txt">
                    <H3 weight="bold" color="">
                      {course.display_name}
                    </H3>
                    <TextBody color="grey" weight="light">
                      {course.short_description}
                    </TextBody>
                    <ProgressBarPage
                      nameProgress="PROGRESS PELATIHAN"
                      valueBar={`${course.progress}%`}
                    />
                    <div className="o-courses-card__txt--action">
                      <Links
                        underline
                        color="red"
                        to={`/umkm-smart/kelas/${course.id62}`}
                      >
                        {course.progress === 100 ? 'LIHAT' : 'LANJUTKAN'}
                      </Links>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <>
              <div className="o-card-empty-state">
                <img src={ImagePelatihanEmptyState} id="emptystate" alt="" />
              </div>
              <div className="align-center">
                <Button
                  variant="primary"
                  onClick={() => history.push('/umkm-smart/kelas')}
                >
                  Catalog Pelatihan
                </Button>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

ProfileTraining.propTypes = {
  history: PropTypes.object
};

ProfileTraining.defaultProps = {
  history: { push: '/' }
};

export default withRouter(ProfileTraining);
