/* eslint-disable jsx-a11y/tabindex-no-positive */
import React, { Component } from 'react';
import {
  Header,
  Footer,
  HeaderBanner,
  CardSteper,
  H3,
  TextBody,
  Input,
  Button,
  Notification,
  CountDownTimer,
  Loading
} from 'components';

import classname from 'classnames';
import ImageBanner from 'assets/images/banner/banner-lupa-pin.png';
import ImageBannerMobile from 'assets/images/banner/banner-lupa-pin-mobile.png';
import moment from 'moment';
import SweetAlert from 'react-bootstrap-sweetalert';

// Network
import { verifyOtp, register, sentOtp, validator } from '../../../services';
// styles
import './styles.scss';

class RegisterNasabah extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      loading: false,
      notifOTP: 'none',
      notifMessage: '',
      disabled: false,
      fieldDisable: false,
      notifText: [],
      dataForOTP: '',
      contentActive: 1,
      errorNik: '',
      errorFullName: '',
      errorCity: '',
      errorCondition: false,
      valueNik: '',
      valuePin: '',
      valuePin2: '',
      valuePinError: null,
      valueNoHp: '',
      valueFullName: '',
      valueEmail: '',
      valueCity: '',
      valueBirthDay: '',
      valueOtp1: '',
      valueOtp2: '',
      valueOtp3: '',
      valueOtp4: '',
      valueOtp5: '',
      valueOtp6: '',
      step: [
        {
          status: 'is-active',
          text: 'Data KTP',
          withLine: true,
          value: '1',
          onClick: () => {}
        },
        {
          status: '',
          text: 'Data diri',
          withLine: true,
          value: '2',
          onClick: () => {}
        },
        {
          status: '',
          text: 'Masukkan OTP',
          withLine: false,
          value: '3',
          onClick: () => {}
        }
      ],
      sendOTPInterval: 60,
      isShowResendOTP: false,
      alert: {
        show: false,
        success: true,
        title: ''
      }
    };
    this.handleChangeNik = this.handleChangeNik.bind(this);
    this.handleChangePin = this.handleChangePin.bind(this);
    this.handleChangePin2 = this.handleChangePin2.bind(this);
    this.handleChangeNoHp = this.handleChangeNoHp.bind(this);
    this.handleChangeFullName = this.handleChangeFullName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangeCity = this.handleChangeCity.bind(this);
    this.handleChangeOTP1 = this.handleChangeOTP1.bind(this);
    this.handleChangeOTP2 = this.handleChangeOTP2.bind(this);
    this.handleChangeOTP3 = this.handleChangeOTP3.bind(this);
    this.handleChangeOTP4 = this.handleChangeOTP4.bind(this);
    this.handleChangeOTP5 = this.handleChangeOTP5.bind(this);
    this.handleChangeOTP6 = this.handleChangeOTP6.bind(this);
  }

  componentDidMount() {
    this.displaForm();
  }

  onlyNumber = (value) => {
    const re = /^[0-9\b]+$/;
    if (value === '' || re.test(value)) {
      return value;
    }
    return '';
  };

  handleChangeDate = (date) => {
    const dateFormat = moment(date).format('YYYY-MM-DD');
    this.setState({
      startDate: date,
      valueBirthDay: dateFormat
    });
  };

  handleButtonStepperNext = (data, active) => {
    const { step, contentActive } = this.state;
    step[active - 1].status = 'is-done';
    step[active].status = 'is-active';

    this.setState({
      contentActive: contentActive + 1,
      step,
      errorCondition: false
    });
  };

  handleConfirmOTP = () => {
    const {
      valueNoHp,
      dataForOTP,
      valueOtp1,
      valueOtp2,
      valueOtp3,
      valueOtp4,
      valueOtp6,
      valueOtp5
    } = this.state;

    const dataVerify = {
      phone_number: parseInt(`62${valueNoHp}`),
      session_id: dataForOTP.session_id,
      code: `${valueOtp1}${valueOtp2}${valueOtp3}${valueOtp4}${valueOtp5}${valueOtp6}`,
      is_reset_pin: false
    };

    this.setState({
      loading: true
    });
    verifyOtp(dataVerify)
      .then((response) => {
        this.setState({
          loading: false,
          alert: {
            show: true,
            title: 'Berhasil',
            message: 'Selamat, registrasi Anda telah berhasil',
            errorCondition: false
          }
        });
      })
      .catch((err) => {
        if (dataVerify.code.length < 6) {
          this.setState({
            notifOTP: 'error',
            loading: false,
            notifMessage: 'OTP harus memiliki 6 angka',
            errorCondition: true
          });
        } else {
          this.setState({
            notifOTP: 'error',
            loading: false,
            notifMessage: 'OTP yang kamu masukan salah',
            errorCondition: true
          });
        }
      });
  };

  handleButtonStepperBack = (data, active) => {
    const { step, contentActive } = this.state;
    step[active - 2].status = 'is-active';
    step[active - 1].status = ' ';
    this.setState({
      contentActive: contentActive - 1,
      step,
      notifOTP: 'none',
      notifMessage: '',
      errorCondition: false
    });
  };

  displaForm = () => {
    const { contentActive } = this.state;
    if (contentActive === 1) {
      const active = this.contentDataKTP();
      return active;
    }
    if (contentActive === 2) {
      const active = this.contentDataPersonal();
      return active;
    }
    const active = this.contentFormOTP();
    return active;
  };

  sendOTP = () => {
    const { valueNoHp } = this.state;
    this.setState({
      loading: true
    });
    sentOtp({ phone_number: `62${valueNoHp}` })
      .then(() => {
        this.setState({
          sendOTPInterval: 60,
          isShowResendOTP: false,
          loading: false,
          notifOTP: 'none',
          notifMessage: '',
          errorCondition: false
        });
      })
      .catch((error) => {
        if (error.response) {
          this.setState({
            notifText: error.response.data,
            notifMessage: 'OTP yang kamu masukkan salah',
            errorCondition: true
          });
        }

        if (error.response.data.status === 'error') {
          this.setState({
            isShowResendOTP: false,
            sendOTPInterval: 0,
            notifOTP: 'error',
            notifMessage: 'Kamu telah mencapai batas pengiriman OTP',
            errorCondition: true
          });
        }

        this.setState({
          notifOTP: 'error',
          loading: false,
          errorCondition: true
        });
      });
  };

  handleButtonRegister = () => {
    const {
      valueNik,
      valuePin,
      valuePin2,
      valueNoHp,
      valueEmail,
      valueFullName,
      valueBirthDay,
      valueCity
    } = this.state;

    this.setState({
      loading: true
    });

    const noHp =
      Number(valueNoHp[0]) === 0
        ? valueNoHp.slice(1)
        : Number(valueNoHp.slice(0, 2)) === 62
        ? valueNoHp.slice(2)
        : valueNoHp;

    const userRegister = {
      email: valueEmail,
      phone_number: parseInt(`62${noHp}`),
      pin: valuePin,
      nik: valueNik,
      full_name: valueFullName,
      birth_date: valueBirthDay,
      birth_place: valueCity
    };
    if (!valueEmail) delete userRegister.email;

    if (valuePin2 === valuePin) {
      register(userRegister)
        .then((response) => {
          this.setState({
            dataForOTP: response.data,
            loading: false,
            notifOTP: 'none',
            notifMessage: '',
            sendOTPInterval: 60,
            isShowResendOTP: false,
            errorCondition: false
          });
          this.handleButtonStepperNext('data', 2);
        })
        .catch((error) => {
          if (error.response) {
            // Request made and server responded
            if (error.response.data.status === 'error') {
              this.setState({
                isShowResendOTP: false,
                sendOTPInterval: 0,
                notifOTP: 'error',
                notifMessage: 'Kamu telah mencapai batas pengiriman OTP'
              });
            } else {
              this.setState({
                notifMessage: 'Maaf, Kamu gagal Melakukan Register . . .'
              });
            }
            this.setState({
              notifText: error.response.data
            });
          } else if (error.request) {
            // The request was made but no response was received
          } else {
            // Something happened in set    ting up the request that triggered an Error
          }
          this.setState({
            notifOTP: 'error',
            loading: false,
            errorCondition: true
          });
        });

      this.setState({
        valuePinError: null
      });
    } else {
      this.setState({
        valuePinError: 'Pin tidak sesuai'
      });
    }
  };

  inputFocusOTP = (event) => {
    this.setState({
      notifOTP: 'none'
    });
    if (event.key === 'Delete' || event.key === 'Backspace') {
      const next = event.target.tabIndex - 2;
      if (next > -1) {
        event.currentTarget.children[next].firstElementChild.focus();
      }
    } else {
      const next = event.target.tabIndex;
      if (next < 6) {
        event.currentTarget.children[next].firstElementChild.focus();
      }
    }
  };

  handleChangePhoneNumber = () => {
    this.handleButtonStepperBack('data', 3);
    this.setState({
      fieldDisable: true,
      notifOTP: 'none',
      notifMessage: '',
      errorCondition: false
    });
  };

  contentFormOTP = () => {
    const {
      state: {
        notifOTP,
        valueOtp1,
        valueOtp2,
        valueOtp3,
        valueOtp4,
        valueOtp5,
        valueOtp6,
        sendOTPInterval,
        isShowResendOTP,
        loading,
        notifMessage,
        errorCondition
      },
      handleConfirmOTP,
      handleChangeOTP1,
      handleChangeOTP2,
      handleChangeOTP3,
      handleChangeOTP4,
      handleChangeOTP5,
      handleChangeOTP6,
      inputFocusOTP,
      handleChangePhoneNumber,
      sendOTP
    } = this;

    return (
      <section>
        <Loading loading={loading} />
        <H3 color="black" weight="bold">
          Masukkan OTP
        </H3>
        <TextBody color="gray" weight="light">
          Masukkan kode OTP yang telah kami kirimkan melalui SMS ke nomor
          handphone Anda.
        </TextBody>
        {errorCondition ? (
          <Notification status={notifOTP} title={notifMessage} />
        ) : (
          ''
        )}
        <div className="o-input-otp" onKeyUp={inputFocusOTP}>
          <Input
            type="text"
            id="input1"
            placeholder="-"
            variant="title-black input-gray"
            handleChange={handleChangeOTP1}
            value={valueOtp1}
            maxlength="1"
            tabIndex="1"
          />
          <Input
            type="text"
            id="input2"
            placeholder="-"
            variant="title-black input-gray"
            handleChange={handleChangeOTP2}
            value={valueOtp2}
            maxlength="1"
            tabIndex="2"
          />
          <Input
            type="text"
            id="input3"
            placeholder="-"
            variant="title-black input-gray"
            handleChange={handleChangeOTP3}
            value={valueOtp3}
            maxlength="1"
            tabIndex="3"
          />
          <Input
            type="text"
            id="input4"
            placeholder="-"
            variant="title-black input-gray"
            handleChange={handleChangeOTP4}
            value={valueOtp4}
            maxlength="1"
            tabIndex="4"
          />
          <Input
            type="text"
            id="input5"
            placeholder="-"
            variant="title-black input-gray"
            handleChange={handleChangeOTP5}
            value={valueOtp5}
            maxlength="1"
            tabIndex="5"
          />
          <Input
            type="text"
            id="input6"
            placeholder="-"
            variant="title-black input-gray"
            handleChange={handleChangeOTP6}
            value={valueOtp6}
            maxlength="1"
            tabIndex="6"
          />
        </div>
        <TextBody color="gray" weight="light">
          Tidak menerima kode OTP pada handphone Anda?
        </TextBody>
        <div className="text-otp-wrapper">
          <span
            className={`a-links links-additional-info black underline ${
              isShowResendOTP ? 'red cursor-pointer' : 'gray'
            }`}
            onClick={isShowResendOTP ? sendOTP : () => {}}
          >
            KIRIM ULANG KODE
          </span>
          <TextBody color="black" weight="bold">
            {sendOTPInterval > 0 ? (
              <CountDownTimer
                interval={sendOTPInterval}
                onStop={() =>
                  this.setState({
                    sendOTPInterval: 0,
                    isShowResendOTP: true
                  })
                }
              />
            ) : (
              `( 00:00 )`
            )}
          </TextBody>
        </div>
        <span
          className="a-links links-additional-info black underline red cursor-pointer"
          onClick={handleChangePhoneNumber}
        >
          GANTI NOMOR HANDPHONE
        </span>
        <div className="button-wrapper">
          <Button
            variant="primary"
            onClick={() => {
              handleConfirmOTP();
            }}
          >
            KONFIRMASI OTP
          </Button>
        </div>
      </section>
    );
  };

  contentDataPersonal = () => {
    const {
      state: {
        notifOTP,
        errorCondition,
        valueEmail,
        valuePin,
        valuePin2,
        valueNoHp,
        notifText,
        valuePinError,
        fieldDisable,
        loading,
        notifMessage
      },

      handleButtonRegister,
      handleButtonStepperBack,
      handleChangePin,
      handleChangePin2,
      handleChangeEmail,
      handleChangeNoHp
    } = this;

    return (
      <section>
        <Loading loading={loading} />
        <H3 color="black" weight="bold">
          Data Diri
        </H3>
        {errorCondition ? (
          <Notification status={notifOTP} title={notifMessage} />
        ) : (
          ''
        )}
        <form>
          <Input
            type="number"
            id="handphone"
            prepend="+62"
            placeholder="81XXXXXXXX"
            title="No. HP"
            variant={`title-black ${
              notifText.phone_number != null ? 'input-red' : 'input-gray'
            } half`}
            handleChange={handleChangeNoHp}
            value={valueNoHp}
            titleBottom={notifText.phone_number}
          />
          <Input
            type="email"
            id="email"
            placeholder="Masukkan emailmu yang aktif"
            title="Email (Tidak Wajib)"
            variant={`title-black ${
              notifText.email != null ? 'input-red' : 'input-gray'
            } half`}
            handleChange={handleChangeEmail}
            value={valueEmail}
            titleBottom={notifText.email}
            isDisable={fieldDisable}
          />
          <Input
            type="password"
            id="pin"
            placeholder=""
            title="Buat PIN"
            titleBottom="6 angka yang digunakan ketika login"
            titleBottomColor="black"
            variant="title-black input-gray half"
            handleChange={handleChangePin}
            value={valuePin}
            maxlength={6}
            isDisable={fieldDisable}
          />
          <Input
            type="password"
            id="re-pin"
            placeholder=""
            title="Masukkan ulang PIN"
            variant={`title-black ${
              valuePinError != null ? 'input-red' : 'input-gray'
            } small`}
            handleChange={handleChangePin2}
            value={valuePin2}
            titleBottom={valuePinError}
            maxlength={6}
            isDisable={fieldDisable}
          />
          <div className="button-wrapper">
            {!fieldDisable && (
              <Button
                variant="secondary"
                onClick={() => {
                  handleButtonStepperBack('data', 2);
                }}
              >
                KEMBALI
              </Button>
            )}
            <Button
              variant="primary"
              disabled={
                valueNoHp.length < 8 ||
                valueNoHp.length > 12 ||
                valuePin < 6 ||
                valuePin2 < 6 ||
                valuePin !== valuePin2
              }
              onClick={() => {
                handleButtonRegister();
              }}
            >
              LANJUT
            </Button>
          </div>
        </form>
      </section>
    );
  };

  contentDataKTP = () => {
    const {
      state: {
        errorNik,
        errorFullName,
        errorCity,
        valueNik,
        valueFullName,
        notifText,
        valueCity,
        startDate,
        disabled
      },

      handleButtonStepperNext,
      handleChangeNik,
      handleChangeFullName,
      handleChangeCity
    } = this;

    const isButtonStepperNextDisabled =
      disabled ||
      !!errorNik ||
      !valueNik ||
      !!errorFullName ||
      !valueFullName ||
      !!errorCity ||
      !valueCity ||
      !startDate;

    const date = new Date(new Date().getFullYear() - 19, 11, 31);

    return (
      <section>
        <H3 color="black" weight="bold">
          Data KTP
        </H3>
        <form>
          <Input
            type="text"
            id="nik"
            placeholder="12345 . . . "
            title="NIK"
            variant={`title-black ${
              errorNik || notifText.nik ? 'input-red' : 'input-gray'
            } width-full`}
            handleChange={handleChangeNik}
            value={valueNik}
            titleBottom={errorNik || notifText.nik}
            maxlength={16}
          />
          <Input
            type="text"
            id="name"
            placeholder="Masukkan Nama Anda"
            title="Nama Lengkap"
            variant={`title-black ${
              notifText.name || errorFullName ? 'input-red' : 'input-gray'
            } half`}
            handleChange={handleChangeFullName}
            value={valueFullName}
            titleBottom={notifText.name || errorFullName}
          />

          <div className="select-wrapper">
            <div className="row">
              <div className="col-md-6">
                <Input
                  type="text"
                  id="city"
                  placeholder="Masukkan Kota Kelahiran"
                  title="Kota kelahiran"
                  value={valueCity}
                  variant={`title-black ${
                    notifText.birth_place || errorCity
                      ? 'input-red'
                      : 'input-gray'
                  } city`}
                  handleChange={handleChangeCity}
                  titleBottom={notifText.birth_place || errorCity}
                />
              </div>
              <div className="col-md-6">
                <Input
                  type="date"
                  id="tgl"
                  title="Tanggal Lahir"
                  dateFormat="yyyy-MM-dd"
                  variant={`title-black ${
                    notifText.birth_date != null ? 'input-red' : 'input-gray'
                  } date`}
                  selectedDatePicker={startDate}
                  handleChange={this.handleChangeDate}
                  titleBottom={notifText.birth_date}
                  maxDate={date}
                />
              </div>
            </div>

            <div className="button-wrapper">
              <Button
                variant="primary"
                disabled={isButtonStepperNextDisabled}
                onClick={() => {
                  handleButtonStepperNext('data', 1);
                }}
              >
                LANJUT
              </Button>
            </div>
          </div>
        </form>
      </section>
    );
  };

  handleChangeNik = ({ target: { value } }) => {
    this.setState({ valueNik: this.onlyNumber(value), errorNik: '' });

    const data = {
      field: 'nik',
      value
    };

    if (value.length !== 16) {
      this.setState({ errorNik: 'Masukkan 16 digit NIK' });
    } else if (value.length === 16) {
      validator(data)
        .then((response) => {
          this.setState({
            disabled: false
          });
        })
        .catch((error) => {
          if (error.response) {
            this.setState({
              errorNik: error.response.data.error,
              disabled: true
            });
          } else {
            this.setState({
              disabled: false
            });
          }
        });
    }
  };

  handleCloseAlert = () => {
    window.location = '/login';
  };

  handleChangePin(event) {
    this.setState({ valuePin: this.onlyNumber(event.target.value) });
  }

  handleChangePin2(event) {
    this.setState({ valuePin2: this.onlyNumber(event.target.value) });
  }

  handleChangeNoHp(event) {
    this.setState({ valueNoHp: this.onlyNumber(event.target.value) });
  }

  handleChangeFullName({ target: { value } }) {
    this.setState({ valueFullName: value, errorFullName: '' });
    if (!value) this.setState({ errorFullName: 'Masukkan nama lengkap' });
  }

  handleChangeCity({ target: { value } }) {
    this.setState({ valueCity: value, errorCity: '' });
    if (!value) this.setState({ errorCity: 'Masukkan kota kelahiran' });
  }

  handleChangeEmail(event) {
    this.setState({ valueEmail: event.target.value });
  }

  handleChangeOTP1(event) {
    this.setState({ valueOtp1: this.onlyNumber(event.target.value) });
  }

  handleChangeOTP2(event) {
    this.setState({ valueOtp2: this.onlyNumber(event.target.value) });
  }

  handleChangeOTP3(event) {
    this.setState({ valueOtp3: this.onlyNumber(event.target.value) });
  }

  handleChangeOTP4(event) {
    this.setState({ valueOtp4: this.onlyNumber(event.target.value) });
  }

  handleChangeOTP5(event) {
    this.setState({ valueOtp5: this.onlyNumber(event.target.value) });
  }

  handleChangeOTP6(event) {
    this.setState({ valueOtp6: this.onlyNumber(event.target.value) });
  }

  render() {
    const {
      state: { step, alert },
      displaForm,
      handleCloseAlert
    } = this;

    const classNames = classname('o-register-nasabah', {});
    return (
      <div className={classNames}>
        <div className="register-nasabah-header">
          <Header activeMenu="notLoggedIn" />
        </div>
        <HeaderBanner
          imageDesktop={ImageBanner}
          imageMobile={ImageBannerMobile}
          title="Selamat datang"
          subtitle="Lengkapi form di bawah ini untuk mendaftarkan diri."
        />
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <CardSteper dataStepper={step} contentCard={displaForm()} />
            </div>
          </div>
        </div>
        <Footer />
        <SweetAlert
          show={alert.show}
          success
          title={alert.title}
          confirmBtnCssClass="a-button primary"
          onConfirm={() => handleCloseAlert()}
        >
          {alert.message}
        </SweetAlert>
      </div>
    );
  }
}

RegisterNasabah.propTypes = {};

RegisterNasabah.defaultProps = {};

export default RegisterNasabah;
