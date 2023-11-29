import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { H3, TextBody, Button } from 'components/atoms';
import { Popup } from 'components/molecules';
import { withRouter } from 'react-router-dom';

import './styles.scss';

const AlertChangePin = ({ history }) => {
  const user = useSelector((state) => state.user);
  const { checkpoint } = user;

  if (checkpoint?.need_change_pin) {
    return (
      <Popup
        showPopup
        onClickClosePopup={() => {}}
        hideClose
        className="alert-change-pin"
      >
        <div className="align-center">
          <H3 color="black" weight="black">
            Harap Ganti PIN Anda
          </H3>
          <TextBody>Demi keamanan, silakan ubah PIN Anda di sini </TextBody>
          <Button
            variant="primary"
            onClick={() => history.push('/profil?tab=change-pin')}
          >
            UBAH PIN
          </Button>
        </div>
      </Popup>
    );
  }
  return <></>;
};

AlertChangePin.propTypes = {
  history: PropTypes.object
};

AlertChangePin.defaultProps = {
  history: { push: '/' }
};

export default withRouter(AlertChangePin);
