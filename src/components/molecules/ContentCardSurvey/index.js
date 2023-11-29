import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import html2canvas from 'html2canvas';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { H4, Links, TextBody } from 'components/atoms';
import { DocumentUmkmSmart } from 'pdf/molecules';
import { PdfGenerator } from 'pdf/organisms';

// style
import './styles.scss';

const categories = [
  { name: 'Modern Teladan', minValue: '8.43', maxValue: '10' },
  { name: 'Modern Utama', minValue: '7.39', maxValue: '8.43' },
  { name: 'Modern', minValue: '6.34', maxValue: '7.39' },
  { name: 'Berkembang Teladan', minValue: '5.30', maxValue: '6.34' },
  { name: 'Berkembang Utama', minValue: '4.26', maxValue: '5.30' },
  { name: 'Berkembang', minValue: '3.21', maxValue: '4.26' },
  { name: 'Tradisional Teladan', minValue: '2.17', maxValue: '3.21' },
  { name: 'Tradisional Utama', minValue: '1.12', maxValue: '2.17' },
  { name: 'Tradisional', minValue: '0', maxValue: '1.12' }
];

const ContentCardSurvey = ({
  currentData,
  dataPdf,
  dataChart,
  dataLegend,
  infoChart
}) => {
  const [canvas, setCanvas] = useState('');

  const id = `chart-${currentData}`;

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

  const activeIndex = categories.findIndex(
    ({ minValue, maxValue }) =>
      dataPdf.score > minValue && dataPdf.score <= maxValue
  );

  const handleDownloadPdf = (e) => {
    e.preventDefault();
    convertChartToCanvas(id);
  };

  useEffect(() => {
    if (canvas) {
      setTimeout(() => {
        setCanvas('');
      }, 500);
    }
  }, [canvas]);

  const customTick = ({ payload, x, y, textAnchor }) => {
    const [, score] = payload.value.match(/\(([^)]+)\)/);
    const color = highestScores.includes(parseFloat(score))
      ? '#1ab759'
      : lowestScores.includes(parseFloat(score))
      ? '#e93c3c'
      : 'black';

    return (
      <g className="recharts-layer recharts-polar-angle-axis-tick">
        <text
          x={x}
          y={y}
          className="recharts-text recharts-polar-angle-axis-tick-value"
          textAnchor={textAnchor}
        >
          <tspan x={x} dy="0em" fill={color}>
            {payload.value}
          </tspan>
        </text>
      </g>
    );
  };

  const customLegends = [
    { value: 'Aspek terendah', type: 'square', color: '#e93c3c' },
    { value: 'Aspek tertinggi', type: 'square', color: '#1ab759' }
  ];

  return (
    <div className="">
      <div className="row">
        <div className="col-md-8 col-lg-7" id={id}>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart cx="52%" data={dataChart}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" tick={customTick} />
              <PolarRadiusAxis />
              <Radar
                name="Riwayat Kompetensi"
                dataKey="A"
                stroke="#a51525"
                fill="rgba(245, 152, 35, 0.2)"
                fillOpacity={1}
                isAnimationActive={false}
              />
              <Legend
                payload={customLegends}
                verticalAlign="bottom"
                chartHeight={400}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        {dataLegend.length > 0 && (
          <div className="col-md-4 col-lg-5">
            <div className="row">
              <div className="col-md-12">
                <H4>Kategori Kelas</H4>
                {categories.map(({ name, minValue, maxValue }, index) => (
                  <TextBody
                    key={index}
                    className={`o-class-category ${
                      index === activeIndex ? 'o-class-category--active' : ''
                    }`}
                  >
                    {name} ({minValue} &lt; skor &lt; {maxValue})
                  </TextBody>
                ))}
              </div>
            </div>
            <div className="info-chart-wrapper row mt-32">
              <div className="col-sm-6 info">{infoChart}</div>
              <div className="col-sm-6 link">
                {dataChart.length && dataLegend.length && canvas ? (
                  <PdfGenerator
                    link
                    linkLabel="UNDUH SERTIFIKAT"
                    filename="Sertifikat Kompetensi"
                    document={
                      <DocumentUmkmSmart
                        data={dataPdf}
                        dataChart={dataChart}
                        dataLegend={dataLegend}
                        imageChart={canvas}
                      />
                    }
                  />
                ) : (
                  <Links
                    underline
                    variant="bold"
                    color="red"
                    onClick={handleDownloadPdf}
                  >
                    UNDUH SERTIFIKAT
                  </Links>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

ContentCardSurvey.propTypes = {
  currentData: PropTypes.string,
  dataPdf: PropTypes.object,
  dataChart: PropTypes.array,
  dataLegend: PropTypes.array,
  infoChart: PropTypes.array
};

ContentCardSurvey.defaultProps = {
  currentData: null,
  dataPdf: {},
  dataChart: [],
  dataLegend: [],
  infoChart: null
};

export default ContentCardSurvey;
