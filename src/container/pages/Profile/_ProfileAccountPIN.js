import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { H3, Input, Button, TextBody, Loading, Notification } from 'components';

import { changePin } from '../../../services';

// component declaration
const ProfileAccountPIN = ({ onSave }) => {
  // states
  const [form, setForm] = useState({ pin: '', confirm_pin: '' });
  const [error, setError] = useState({});
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // methods
  const validateForm = () => {
    if (form.pin === form.confirm_pin) return true;
    setError({ error: true, message: 'Pin tidak sesuai' });
    return false;
  };

  // event handlers
  const handleInput = (type, e) => {
    const res = /^[0-9\b]+$/;
    if (e.target.value === '' || res.test(e.target.value)) {
      setError({ error: false });
      setForm({ ...form, [type]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    changePin(form)
      .then((response) => {
        if (response.data) onSave();
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <Loading loading={isLoading} />
      <section className="o-profile__body">
        <H3 color="black" weight="bold">
          Ubah Pin
        </H3>
        <TextBody className="mb-24" color="black" weight="light">
          Demi mengamankan dan melindungi Akun Anda mohon untuk tidak memberikan
          PIN kepada orang lain
        </TextBody>
        <Notification
          status={isError ? 'error' : ''}
          title="PIN yang anda masukkan sama dengan PIN anda sekarang"
        />
        <form onSubmit={handleSubmit}>
          <Input
            type="password"
            title="Buat PIN"
            id="pin"
            name="pin"
            variant="title-black input-gray small"
            value={form.pin}
            handleChange={(e) => handleInput('pin', e)}
            maxlength={6}
          />
          <Input
            type="password"
            title="Masukkan ulang PIN"
            id="confirm_pin"
            name="confirm_pin"
            variant={`title-black ${
              error.error ? 'input-red' : 'input-gray'
            } small`}
            value={form.confirm_pin}
            handleChange={(e) => handleInput('confirm_pin', e)}
            maxlength={6}
            titleBottom={error.message || false}
          />
          <div className="m-button-wrapper">
            <Button
              type="submit"
              variant="primary"
              disabled={
                !form.pin ||
                !form.confirm_pin ||
                form.confirm_pin.length < 6 ||
                form.pin.length < 6
              }
            >
              Ubah Pin
            </Button>
          </div>
        </form>
      </section>
    </>
  );
};

ProfileAccountPIN.propTypes = {
  onSave: PropTypes.func
};

ProfileAccountPIN.defaultProps = {
  onSave: () => {}
};

export default ProfileAccountPIN;
