import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, useHistory } from 'react-router-dom';

import { CheckBox, H3, TextBody, Button } from 'components/atoms';
import { Popup } from 'components/molecules';

import { removeScrollOnPopup } from 'helpers';

const PopupTakeSurvey = (props) => {
  const { show, setShow } = props;
  const user = useSelector((state) => state.user);
  const history = useHistory();

  const [isChecked, setChecked] = useState(false);

  const handleSurveyScoring = () => {
    removeScrollOnPopup(false);
    if (
      user?.checkpoint?.user_progress < 100 ||
      user?.checkpoint?.business_progress < 100
    ) {
      history.push('/profil');
    } else {
      history.push('/form-survey');
    }
  };

  return (
    <Popup showPopup={show} onClickClosePopup={() => setShow()}>
      <H3 color="black" weight="black">
        Salam Naik Kelas!
      </H3>
      <TextBody color="black" weight="black">
        Mau tahu kondisi kesiapan usaha kita untuk memotret atau mendiagnosa
        kondisi kesiapan usaha kita untuk membesarkan usaha secara
        berkelanjutan. Yuk coba mengisi form survey ini!
      </TextBody>
      <CheckBox
        id="select-all"
        onChange={(e) => setChecked(e.target.checked)}
        isChecked={isChecked}
      >
        <TextBody color="black" weight="black">
          Saya setuju untuk memberikan izin bagi PT Bank Rakyat Indonesia untuk
          merekam jawaban saya
        </TextBody>
      </CheckBox>
      <Button
        variant="primary"
        disabled={!isChecked}
        onClick={() => {
          handleSurveyScoring();
        }}
      >
        AMBIL SURVEY UMKM SCORING
      </Button>
    </Popup>
  );
};

PopupTakeSurvey.propTypes = {
  show: PropTypes.bool,
  setShow: PropTypes.func
};

PopupTakeSurvey.defaultProps = {
  show: false,
  setShow: () => { }
};

export default withRouter(PopupTakeSurvey);
