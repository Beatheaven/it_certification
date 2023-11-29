import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import html2canvas from 'html2canvas';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';
import { KriteriaScoreSurvey } from 'components/atoms';

// style
import './styles.scss';

const ContentCardSurveyMedium = ({
  currentData,
  dataPdf,
  dataChart,
  dataLegend,
  infoChart,
  idChart,
  setCanvas,
  handleDownloadPdf
}) => {
  const convertChartToCanvas = (id) => {
    const chart = document.getElementById(id);
    const options = { scrollX: 0, scrollY: -window.scrollY };
    if (chart !== null) {
      html2canvas(chart, options).then((canvas) => {
        setCanvas(canvas.toDataURL('image/png'));
      });
    }
  };

  const sortedScore = [...dataLegend]
    .sort((a, b) => b.score - a.score)
    .map(({ score }) => score);

  const highestScores = sortedScore.slice(0, 3);
  const lowestScores = sortedScore.slice(-3, sortedScore.length);

  const getColorByScore = (score) => {
    return highestScores.includes(score)
      ? 'success'
      : lowestScores.includes(score)
      ? 'error'
      : 'black';
  };

  const getWeightByScore = (score) => {
    return highestScores.includes(score) || lowestScores.includes(score)
      ? 'bold'
      : 'regular';
  };

  useEffect(() => {
    setCanvas('');
    if (handleDownloadPdf && currentData !== null) {
      setTimeout(() => convertChartToCanvas(idChart), 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleDownloadPdf, idChart]);

  return (
    <div className="o-content-card-survey__medium">
      <div className="row">
        <div className="col-md-6" id={idChart}>
          <RadarChart
            cx={window.innerWidth > 768 ? 175 : 140}
            cy={174}
            outerRadius={window.innerWidth > 768 ? 150 : 120}
            width={window.innerWidth > 768 ? 500 : 300}
            height={window.innerWidth > 768 ? 340 : 340}
            data={dataChart}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis />
            <Radar
              name="Mike"
              dataKey="A"
              stroke="#0CB751"
              fill="rgba(12, 183, 81, 0.2)"
              fillOpacity={1}
              isAnimationActive={false}
            />
          </RadarChart>
          <div className="info-chart-wrapper row mt-32">
            <div className="col-sm-8 info">{infoChart}</div>
          </div>
        </div>
        {dataLegend.length > 0 && (
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-12">
                {dataLegend.map(
                  (value, index) =>
                    index < dataLegend.length / 2 && (
                      <KriteriaScoreSurvey
                        key={index}
                        nameList={`${index + 1}`}
                        nameKriteria={value.group}
                        kriteriaScore={value.score}
                        color={getColorByScore(value.score)}
                        weight={getWeightByScore(value.score)}
                      />
                    )
                )}
              </div>
              <div className="col-md-12">
                {dataLegend.map(
                  (value, index) =>
                    index >= dataLegend.length / 2 && (
                      <KriteriaScoreSurvey
                        key={index}
                        nameList={`${index + 1}`}
                        nameKriteria={value.group}
                        kriteriaScore={value.score}
                        color={getColorByScore(value.score)}
                        weight={getWeightByScore(value.score)}
                      />
                    )
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

ContentCardSurveyMedium.propTypes = {
  currentData: PropTypes.string,
  dataPdf: PropTypes.object,
  dataChart: PropTypes.array,
  dataLegend: PropTypes.array,
  infoChart: PropTypes.array,
  idChart: PropTypes.string,
  setCanvas: PropTypes.func,
  handleDownloadPdf: PropTypes.bool
};

ContentCardSurveyMedium.defaultProps = {
  currentData: null,
  dataPdf: {},
  dataChart: [],
  dataLegend: [],
  infoChart: null,
  idChart: null,
  setCanvas: () => {},
  handleDownloadPdf: false
};

export default ContentCardSurveyMedium;
