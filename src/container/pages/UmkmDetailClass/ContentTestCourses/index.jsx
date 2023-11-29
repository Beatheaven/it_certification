import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';
import { withRouter } from 'react-router-dom';

import { Button, H3, EmptyContent } from 'components';

import FormTestQuestion from './FormTestQuestion';
import TestResult from './TestResult';

import './styles.scss';

import { getTestResult, getListTestClass } from '../../../../services';

const ContentTestCourses = ({ match, titleClass, history }) => {
  const classNames = classname('content-modules', {});

  const [isTestStarted, setTestStarted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [resultScore, setResultScore] = useState({});
  const [hasTest, setHasTest] = useState(false);

  const { classId } = match.params;

  const fetchTestResult = () => {
    const params = {
      class_id62: classId
    };
    getTestResult(params)
      .then(({ data }) => {
        const latestScore = data.score.latest;
        const highestScore = data.score.higest;
        setResultScore({
          latest: latestScore,
          highest: highestScore
        });
        if (latestScore) {
          setShowResult(true);
        }
      })
      .catch(() => {});
  };

  const fetcListTestClass = () => {
    const params = {
      class_id62: classId
    };
    getListTestClass(params)
      .then(({ data }) => {
        if (data.length) {
          setHasTest(true);
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (classId) {
      fetchTestResult();
      fetcListTestClass();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classId]);

  if (isTestStarted && !showResult) {
    return (
      <FormTestQuestion
        titleClass={titleClass}
        handleResult={() => fetchTestResult()}
      />
    );
  }
  if (showResult) {
    return (
      <TestResult
        score={resultScore}
        startTest={() => {
          setTestStarted(true);
          setShowResult(false);
        }}
      />
    );
  }

  return (
    <div className={classNames}>
      <div className="content-test">
        {hasTest ? (
          <>
            <H3>{titleClass}</H3>
            <div className="title-deskripsi">
              Ayo mulai tes untuk mengasah kemampuan kamu
            </div>
            <Button variant="primary" onClick={() => setTestStarted(true)}>
              Mulai Tes
            </Button>
          </>
        ) : (
          <EmptyContent
            title="Mohon maaf, tes untuk materi ini belum tersedia"
            description="Sambil menunggu tes tersedia, yuk ikuti kursus yang lain juga dengan klik tombol di bawah ini"
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

ContentTestCourses.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  titleClass: PropTypes.string
};

ContentTestCourses.defaultProps = {
  history: { push: '/' },
  match: {},
  titleClass: ''
};

export default withRouter(ContentTestCourses);
