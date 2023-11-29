import React, { Component } from 'react';
import classname from 'classnames';
import moment from 'moment';

import { TextBody } from 'components/atoms';
import { ScoreSurvey } from 'components/molecules';

import { getprofilePublic, getProfileUser } from 'services';

// eslint-disable-next-line import/no-unresolved
import './styles.scss';

class CardUmkmSmartSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      highestSurvey: [],
      lowestSurvey: [],
      surveyResult: {}
    };
  }

  componentDidMount() {
    this.getDataUser();
  }

  componentDidUpdate(prevprevProps, prevState, snapshotState) {
    const { nik } = this.state;
    if (prevState.nik !== nik) {
      this.getDataProfile(nik);
    }
  }

  getDataUser = () => {
    getProfileUser()
      .then((response) => {
        this.setState({
          nik: response.data?.nik
        });
      })
      .catch((err) => {
        throw err;
      });
  };

  getDataProfile = (nik) => {
    return new Promise((resolve) => {
      if (nik) {
        getprofilePublic(nik).then(({ data }) => {
          this.setState({
            highestSurvey: data.data?.highest_survey,
            lowestSurvey: data.data?.lowest_survey,
            surveyResult: data.data?.profile
          });
          resolve();
        });
      }
    });
  };

  render() {
    const { highestSurvey, lowestSurvey, surveyResult } = this.state;
    const classNames = classname('o-card-umkm-summary', {});
    return (
      <div className={classNames}>
        <div className="o-card-umkm-summary__item">
          <TextBody color="black" weight="bold">
            KATEGORI KOMPETENSI
          </TextBody>
          <ScoreSurvey
            category={surveyResult.sub_category}
            nameUmkm={`${surveyResult.omzet} ${surveyResult.sub_category}`}
          />
          <TextBody color="black">
            Berdasarkan hasil survey{' '}
            {surveyResult.survey_date
              ? moment(surveyResult.survey_date).format('DD MMMM YYYY')
              : '-'}
          </TextBody>
        </div>
        <div className="o-card-umkm-summary__item">
          <TextBody color="black" weight="bold">
            3 ASPEK UNTUK DITINGKATKAN
          </TextBody>
          <div className="my-16">
            {lowestSurvey.map((res, i) => (
              <div key={i} className="a-item-competency">
                <TextBody color="black" className="align-left">
                  {res.name}
                </TextBody>
                <TextBody color="error">{res.score}</TextBody>
              </div>
            ))}
          </div>
        </div>

        <div className="o-card-umkm-summary__item">
          <TextBody color="black" weight="bold">
            3 ASPEK TERKUAT
          </TextBody>
          <div className="my-16">
            {highestSurvey.map((res, i) => (
              <div key={i} className="a-item-competency">
                <TextBody color="black" className="align-left">
                  {res.name}
                </TextBody>
                <TextBody color="success">{res.score}</TextBody>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default CardUmkmSmartSummary;
