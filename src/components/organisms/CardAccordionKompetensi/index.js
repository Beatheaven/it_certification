import React, { useState, useEffect } from 'react';
import classname from 'classnames';
import PropTypes from 'prop-types';
import moment from 'moment';

// ASSETS
import IconChevron from 'assets/images/carret-down.png';

// COMPONENTS
import { TextBody, Loading } from 'components/atoms';
import { ScoreSurvey, ContentCardSurvey } from 'components/molecules';

// SERVICES
import { getHistorySurvey } from '../../../services';

// STYLES
import './styles.scss';

const CardAccordionKompetensi = ({ histories, activeIndex, handleChange }) => {
  const [activeHistory, setActiveHistory] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const currentSurvey = histories[activeIndex];

    if (currentSurvey) {
      setLoading(true);
      getHistorySurvey(currentSurvey.id62).then(({ data }) => {
        setActiveHistory(data);
        setLoading(false);
      });
    }
  }, [histories, activeIndex]);

  const mainClassName = 'o-card-accordion-kompetensi';
  const wrapperClassName = (index) =>
    classname(`${mainClassName}__wrapper`, {
      [`${mainClassName}__wrapper--active`]: index === activeIndex
    });

  const dataChart = activeHistory?.summary.map((data, index) => ({
    subject: `${index + 1}`,
    A: Math.round(data.score),
    fullMark: data.max_score
  }));

  const formatDate = (date) => moment(date).format('DD MMMM YYYY');

  return (
    <div className={mainClassName}>
      {histories.map((item, index) => {
        const dataPdf = {
          category: activeHistory?.umkm_category,
          score: activeHistory?.average_score,
          date: moment(activeHistory?.created_at).format('DD MMMM YYYY'),
          name: activeHistory?.full_name,
          business: activeHistory?.business_name,
          omzet: activeHistory?.omzet
        };

        return (
          <div key={item.id62} className={wrapperClassName(index)}>
            <div
              className={`${mainClassName}__header`}
              onClick={handleChange(index)}
            >
              <TextBody>{formatDate(item.created_at)}</TextBody>
              <div className={`${mainClassName}__icon`}>
                <img src={IconChevron} alt="icon" />
              </div>
            </div>
            {index === activeIndex && activeHistory && (
              <div className={`${mainClassName}__content`}>
                <Loading loading={loading} />
                <ScoreSurvey
                  category={activeHistory.umkm_category}
                  nameUmkm={`${activeHistory.omzet} ${activeHistory.umkm_category}`}
                />
                <ContentCardSurvey
                  dataPdf={dataPdf}
                  dataChart={dataChart}
                  dataLegend={activeHistory.summary}
                  currentData={activeHistory.id62}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

CardAccordionKompetensi.propTypes = {
  histories: PropTypes.array,
  activeIndex: PropTypes.number,
  handleChange: PropTypes.func
};

CardAccordionKompetensi.defaultProps = {
  histories: [],
  activeIndex: null,
  handleChange: () => {}
};

export default CardAccordionKompetensi;
