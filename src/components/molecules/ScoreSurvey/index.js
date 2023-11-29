import React from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';
import IconStar from 'assets/images/icon-star.png';
import { H3 } from 'components/atoms';
// Styles
import './styles.scss';

const ScoreSurvey = ({ className, nameUmkm, category }) => {
  const classNames = classname('o-score-survey', className, {});
  const classScore = classname('o-score-survey_score-wrapper', {});
  const sortCategory = [
    'Tradisional',
    'Tradisional Utama',
    'Tradisional Teladan',
    'Berkembang',
    'Berkembang Utama',
    'Berkembang Teladan',
    'Modern',
    'Modern Utama',
    'Modern Teladan'
  ];
  return (
    <div className={classNames}>
      {category && nameUmkm && (
        <H3 color="primary" weight="bold">
          {nameUmkm}
        </H3>
      )}
      <div className={classScore}>
        {sortCategory.map((_, index) => (
          <div className="score" key={index}>
            {index < sortCategory.indexOf(category) + 1 && (
              <img src={IconStar} alt={category} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

ScoreSurvey.propTypes = {
  className: PropTypes.string,
  category: PropTypes.string,
  nameUmkm: PropTypes.string
};

ScoreSurvey.defaultProps = {
  className: '',
  category: '',
  nameUmkm: ''
};

export default ScoreSurvey;
