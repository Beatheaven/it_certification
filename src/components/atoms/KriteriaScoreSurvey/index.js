import React from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';
import TextBody from '../TextBody';
// Styles
import './styles.scss';

const KriteriaScoreSurvey = ({
  className,
  kriteriaScore,
  nameKriteria,
  nameList,
  color,
  weight
}) => {
  const classNames = classname('o-kriteria-survey', className);
  const classkriteriaList = classname('o-kriteria-survey__numbering');
  const classkriteriaText = classname('o-kriteria-survey__text');
  const classkriteriaScore = classname('o-kriteria-survey__kriteria_score');

  return (
    <div className={classNames}>
      <div className={classkriteriaList}>
        <TextBody color="black" weight="regular">
          {nameList}
        </TextBody>
      </div>
      <div className={classkriteriaText}>
        <TextBody color="black" weight="regular">
          {nameKriteria}
        </TextBody>
      </div>

      <div className={classkriteriaScore}>
        <TextBody
          color={color}
          weight={weight}
        >{`${kriteriaScore} / 10`}</TextBody>
      </div>
    </div>
  );
};

KriteriaScoreSurvey.propTypes = {
  className: PropTypes.string,
  kriteriaScore: PropTypes.number,
  nameKriteria: PropTypes.string,
  nameList: PropTypes.string,
  color: PropTypes.string,
  weight: PropTypes.string
};

KriteriaScoreSurvey.defaultProps = {
  className: '',
  kriteriaScore: 0,
  nameKriteria: '',
  nameList: '',
  color: '',
  weight: ''
};

export default KriteriaScoreSurvey;
