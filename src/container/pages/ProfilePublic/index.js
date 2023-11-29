import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/id';

import { H3, H4, TextBody } from 'components/atoms';
import { ScoreSurvey } from 'components/molecules';

import { getprofilePublic } from 'services';

import emptyAvatar from 'assets/images/default-avatar-m.png';

import './styles.scss';

const ProfilePublic = ({ match, history }) => {
  const { nik } = match.params;
  const [state, setState] = useState({
    profile: {
      name: 'Lorem Ipsum'
    },
    highestSurvey: [],
    lowestSurvey: [],
    profileData: []
  });

  useEffect(() => {
    getprofilePublic(nik)
      .then(({ data: { data } }) => {
        const parseBirthInfo = () => {
          moment.locale('id');
          const date = moment(data.profile.birth_date).format('D MMMM YYYY');
          return `${data.profile.birth_place} / ${date}`;
        };

        const profileData = [
          { label: 'NIK', value: data.profile.nik },
          { label: 'Nama Lengkap', value: data.profile.full_name },
          { label: 'Tempat / Tanggal Lahir', value: parseBirthInfo() },
          { label: 'Alamat', value: data.profile.address },
          { label: 'No. HP', value: data.profile.phone_number },
          { label: 'Email', value: data.profile.email }
        ];

        setState({
          profile: data.profile,
          highestSurvey: data.highest_survey,
          lowestSurvey: data.lowest_survey,
          profileData
        });
      })
      .catch(() => history.push('/error-404'));
  }, [history, nik]);

  return (
    <div className="o-profile-public container">
      <div className="m-header__bg" />
      <div className="m-header">
        <div className="a-photo">
          <img
            src={state.profile.avatar || emptyAvatar}
            alt={state.profile.full_name}
            width={80}
            height={80}
          />
        </div>
        <div className="a-name">
          <H3 color="white">{state.profile?.full_name?.toUpperCase()}</H3>
          <TextBody color="white">{state.profile.business_name}</TextBody>
        </div>
        <div className="a-score">
          <ScoreSurvey category={state.profile?.sub_category} />
          <H3 color="white">
            {`${state.profile?.omzet?.toUpperCase()} ${state.profile?.sub_category?.toUpperCase()}`}
          </H3>
        </div>
      </div>
      <div className="m-content">
        <div className="row">
          <div className="col-sm-6">
            <div className="m-content__list">
              {state.profileData.map(
                (data, index) =>
                  data.value && (
                    <div key={index}>
                      <H4 className="a-label">{data.label}</H4>
                      <TextBody className="a-value">{data.value}</TextBody>
                      <hr />
                    </div>
                  )
              )}
            </div>
          </div>
          <div className="col-sm-6">
            <div className="m-content__list">
              <H4 className="a-label center">
                {state.highestSurvey.length} ASPEK TERKUAT
              </H4>
              {state.highestSurvey.map((survey, index) => (
                <div key={index} className="a-list">
                  <TextBody className="a-list__group">{survey.name}</TextBody>
                  <TextBody className="a-list__score success">
                    {survey.score}
                  </TextBody>
                </div>
              ))}
            </div>
            <div className="m-content__list">
              <H4 className="a-label center">
                {state.lowestSurvey.length} ASPEK UNTUK DITINGKATKAN
              </H4>
              {state.lowestSurvey.map((survey, index) => (
                <div key={index} className="a-list">
                  <TextBody className="a-list__group">{survey.name}</TextBody>
                  <TextBody className="a-list__score error">
                    {survey.score}
                  </TextBody>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="m-footer">
        <div className="container">
          <TextBody color="white">
            Diterbitkan oleh PT.Bank Rakyat Indonesia (Persero) Tbk
          </TextBody>
        </div>
      </div>
    </div>
  );
};

ProfilePublic.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object
};

ProfilePublic.defaultProps = {
  match: {},
  history: {}
};

export default ProfilePublic;
