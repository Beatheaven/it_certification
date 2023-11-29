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
import PropTypes from 'prop-types';
import SweetAlert from 'react-bootstrap-sweetalert';
import ImageBanner from 'assets/images/banner/banner-lupa-pin.png';
import ImageBannerMobile from 'assets/images/banner/banner-lupa-pin-mobile.png';
// style
import './style-min.scss';
// Network
import { setPin, resetPin, verifyOtp, sentOtp } from '../../../services';

class LupaPin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notifText: [],
      notifMessage: '',
      notifOTP: null,
      loading: false,
      contentActive: 1,
      dataForOTP: '',
      valuePinError: null,
      valueHp: '',
      valueNik: '',
      valueOtp1: '',
      valueOtp2: '',
      valueOtp3: '',
      valueOtp4: '',
      valueOtp5: '',
      valueOtp6: '',
      valueToken: '',
      valuePin: '',
      valuePin2: '',
      step: [
        {
          status: 'is-active',
          text: 'Identitas',
          withLine: true,
          value: '1',
          onClick: () => {}
        },
        {
          status: '',
          text: 'Masukan OTP',
          withLine: true,
          value: '2',
          onClick: () => {}
        },
        {
          status: '',
          text: 'Buat PIN baru',
          withLine: false,
          value: '3',
          onClick: () => {}
        }
      ],
      alertPin: {
        show: false,
        success: true
      },
      sendOTPInterval: 60,
      isShowResendOTP: false,
      errorCondition: false
    };
    this.handleChangeNik = this.handleChangeNik.bind(this);
    this.handleChangeHp = this.handleChangeHp.bind(this);
    this.handleChangeOTP1 = this.handleChangeOTP1.bind(this);
    this.handleChangeOTP2 = this.handleChangeOTP2.bind(this);
    this.handleChangeOTP3 = this.handleChangeOTP3.bind(this);
    this.handleChangeOTP4 = this.handleChangeOTP4.bind(this);
    this.handleChangeOTP5 = this.handleChangeOTP5.bind(this);
    this.handleChangeOTP6 = this.handleChangeOTP6.bind(this);
    this.handleChangePin = this.handleChangePin.bind(this);
    this.handleChangePin2 = this.handleChangePin2.bind(this);
  }

  componentDidMount() {
    this.displayForm();
  }

  onlyNumber = (value) => {
    const re = /^[0-9\b]+$/;
    if (value === '' || re.test(value)) {
      return value;
    }
    return '';
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

  inputFocusOTP = (event) => {
    this.setState({
      notifOTP: null
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

  handleButtonStepperBack = (data, active) => {
    const { step, contentActive } = this.state;
    step[active - 2].status = 'is-active';
    step[active - 1].status = ' ';
    this.setState({
      contentActive: contentActive - 1,
      step,
      errorCondition: false
    });
  };

  handleIdentitas = () => {
    const { valueNik, valueHp } = this.state;

    const noHp =
      Number(valueHp[0]) === 0
        ? valueHp.slice(1)
        : Number(valueHp.slice(0, 2)) === 62
        ? valueHp.slice(2)
        : valueHp;

    const dataIdentitas = {
      phone_number: parseInt(`62${noHp}`),
      nik: valueNik
    };

    this.setState({
      loading: true
    });

    resetPin(dataIdentitas)
      .then((response) => {
        this.setState({
          dataForOTP: response.data,
          loading: false,
          errorCondition: false
        });
        this.handleButtonStepperNext('data', 1);
      })
      .catch((error) => {
        if (valueNik > 0 || valueHp > 0) {
          if (error.response.data.status === 'error') {
            this.setState({
              notifMessage: 'Kamu telah mencapai batas pengiriman OTP'
            });
          } else {
            this.setState({
              notifMessage:
                'Pastikan NIK atau Nomor HP telah terdaftar sebelumnya'
            });
          }
        } else {
          this.setState({
            notifMessage: 'Lengkapi data yang belum terisi dengan benar'
          });
        }

        this.setState({
          notifOTP: 'error',
          notifText: error.response.data,
          loading: false,
          errorCondition: true
        });
      });
  };

  handleConfirmOTP = () => {
    const {
      valueHp,
      dataForOTP,
      valueOtp1,
      valueOtp2,
      valueOtp3,
      valueOtp4,
      valueOtp6,
      valueOtp5
    } = this.state;

    const dataVerify = {
      phone_number: parseInt(`62${valueHp}`),
      session_id: dataForOTP.session_id,
      code: `${valueOtp1}${valueOtp2}${valueOtp3}${valueOtp4}${valueOtp5}${valueOtp6}`,
      is_reset_pin: true
    };

    this.setState({
      loading: true
    });

    verifyOtp(dataVerify)
      .then((response) => {
        this.handleButtonStepperNext('data', 2);

        this.setState({
          valueToken: response.data.token,
          loading: false
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

  sendOTP = () => {
    const { valueHp } = this.state;
    this.setState({
      loading: true
    });
    sentOtp({ phone_number: `62${valueHp}` })
      .then(() => {
        this.setState({
          loading: false,
          sendOTPInterval: 60,
          isShowResendOTP: false,
          notifOTP: null,
          notifMessage: ''
        });
      })
      .catch((error) => {
        if (error.response) {
          this.setState({
            notifText: error.response.data,
            loading: false,
            errorCondition: true
          });
        }

        if (error.response.data.status === 'error') {
          this.setState({
            isShowResendOTP: false,
            sendOTPInterval: 0,
            notifMessage: 'Kamu telah mencapai batas pengiriman OTP',
            notifOTP: 'error',
            loading: false,
            errorCondition: true
          });
        }
      });
  };

  handleResetPin = () => {
    const { valuePin, valuePin2, valueToken } = this.state;
    if (valuePin2 === valuePin) {
      const dataPin = {
        forgot_token: valueToken,
        pin: valuePin2
      };

      this.setState({ loading: true });
      setPin(dataPin)
        .then((response) => {
          if (response.data) {
            this.setState({
              loading: false,
              alertPin: {
                show: true,
                title: 'Berhasil',
                message:
                  'PIN telah diperbaharui. Silahkan login dengan PIN baru'
              }
            });
          }
        })
        .catch((error) => {
          this.setState({ loading: false });
          if (dataPin.pin) {
            if (error.response.data.status === 'error') {
              this.setState({
                notifMessage: 'PIN tidak boleh sama dengan sebelumnya'
              });
            }

            this.setState({
              notifOTP: 'error',
              errorCondition: true
            });
            throw error;
          }
        });
    } else {
      this.setState({
        valuePinError: 'Pin tidak sesuai'
      });
    }
  };

  displayForm = () => {
    const { contentActive } = this.state;
    if (contentActive === 1) {
      const active = this.contentFormIdentitas();
      return active;
    }
    if (contentActive === 2) {
      const active = this.contentFormOTP();
      return active;
    }
    const active = this.contentFormPIN();
    return active;
  };

  contentFormIdentitas = () => {
    const {
      state: {
        valueHp,
        valueNik,
        notifOTP,
        notifText,
        notifMessage,
        loading,
        errorCondition
      },
      handleChangeHp,
      handleChangeNik,
      handleIdentitas
    } = this;
    return (
      <section>
        <Loading loading={loading} />
        <H3 color="black" weight="bold">
          Identitas
        </H3>
        <TextBody color="gray" weight="light">
          Silahkan masukan identitas untuk verifikasi.
        </TextBody>
        {errorCondition && (
          <Notification status={notifOTP} title={notifMessage} />
        )}
        <form>
          <Input
            type="text"
            id="nik"
            placeholder="Masukkan No.KTP"
            title="NIK"
            handleChange={handleChangeNik}
            value={valueNik === 'NaN' ? '' : valueNik}
            variant={`title-black ${
              notifText.nik != null ? 'input-red' : 'input-gray'
            } width-full`}
            titleBottom={notifText.nik != null ? notifText.nik : false}
            maxlength={16}
          />
          <Input
            type="number"
            id="noHp"
            prepend="+62"
            placeholder="81XXXXXXXX"
            title="NO. Handphone"
            handleChange={handleChangeHp}
            value={valueHp}
            variant={`title-black ${
              notifText.phone_number != null ? 'input-red' : 'input-gray'
            } city`}
            titleBottom={
              notifText.phone_number != null ? notifText.phone_number : false
            }
          />
          <div className="button-wrapper">
            <Button
              variant="primary"
              onClick={() => {
                handleIdentitas();
              }}
            >
              Lanjut
            </Button>
          </div>
        </form>
      </section>
    );
  };

  contentFormOTP = () => {
    const {
      state: {
        notifOTP,
        notifMessage,
        errorCondition,
        valueOtp1,
        valueOtp2,
        valueOtp3,
        valueOtp4,
        valueOtp5,
        valueOtp6,
        sendOTPInterval,
        isShowResendOTP,
        loading
      },
      handleConfirmOTP,
      handleButtonStepperBack,
      handleChangeOTP1,
      handleChangeOTP2,
      handleChangeOTP3,
      handleChangeOTP4,
      handleChangeOTP5,
      handleChangeOTP6,
      inputFocusOTP,
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
        {errorCondition && (
          <Notification status={notifOTP} title={notifMessage} />
        )}
        <div className="o-input-otp" onKeyUp={inputFocusOTP}>
          <Input
            type="text"
            id="input1"
            placeholder="-"
            variant="title-black input-gray"
            handleChange={handleChangeOTP1}
            maxlength="1"
            tabIndex="1"
            value={valueOtp1}
          />
          <Input
            type="text"
            id="input2"
            placeholder="-"
            variant="title-black input-gray"
            handleChange={handleChangeOTP2}
            maxlength="1"
            tabIndex="2"
            value={valueOtp2}
          />
          <Input
            type="text"
            id="input3"
            placeholder="-"
            variant="title-black input-gray"
            handleChange={handleChangeOTP3}
            maxlength="1"
            tabIndex="3"
            value={valueOtp3}
          />
          <Input
            type="text"
            id="input4"
            placeholder="-"
            variant="title-black input-gray"
            handleChange={handleChangeOTP4}
            maxlength="1"
            tabIndex="4"
            value={valueOtp4}
          />
          <Input
            type="text"
            id="input5"
            placeholder="-"
            variant="title-black input-gray"
            handleChange={handleChangeOTP5}
            maxlength="1"
            tabIndex="5"
            value={valueOtp5}
          />
          <Input
            type="text"
            id="input6"
            placeholder="-"
            variant="title-black input-gray"
            handleChange={handleChangeOTP6}
            maxlength="1"
            tabIndex="6"
            value={valueOtp6}
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
            KIRIM ULANG KODE OTP
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
        <div className="button-wrapper">
          <Button
            variant="secondary"
            onClick={() => {
              handleButtonStepperBack('data', 2);
            }}
          >
            KEMBALI
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleConfirmOTP();
            }}
          >
            LANJUT
          </Button>
        </div>
      </section>
    );
  };

  contentFormPIN = () => {
    const {
      state: {
        valuePin,
        valuePin2,
        valuePinError,
        loading,
        notifOTP,
        errorCondition,
        alertPin
      },
      handleChangePin,
      handleChangePin2,
      handleResetPin,
      handleButtonStepperBack
    } = this;
    const { history } = this.props;
    return (
      <section>
        <Loading loading={loading} />
        <H3 color="black" weight="bold">
          Buat PIN BARU
        </H3>
        {errorCondition && (
          <Notification
            status={notifOTP}
            title="Pin tidak boleh sama dengan sebelumnya"
          />
        )}
        <form>
          <div className="o-pin">
            <Input
              type="password"
              id="pin"
              placeholder=""
              title="Buat PIN"
              titleBottom="6 angka yang digunakan ketika login"
              titleBottomColor="black"
              variant="title-black input-gray city"
              handleChange={handleChangePin}
              value={valuePin}
              maxlength={6}
            />
            <Input
              type="password"
              id="re-pin"
              placeholder=""
              title="Masukkan ulang PIN"
              variant={`title-black ${
                valuePinError != null ? 'input-red' : 'input-gray'
              } city`}
              handleChange={handleChangePin2}
              value={valuePin2}
              titleBottom={valuePinError != null ? valuePinError : false}
              maxlength={6}
            />
            <div className="button-wrapper">
              <Button
                variant="secondary"
                onClick={() => {
                  handleButtonStepperBack('data', 3);
                }}
              >
                KEMBALI
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  handleResetPin();
                }}
              >
                UBAH PIN
              </Button>
            </div>
          </div>
          <SweetAlert
            show={alertPin.show}
            success
            title={alertPin.title}
            confirmBtnCssClass="a-button primary"
            onConfirm={() => history.push('/')}
          >
            {alertPin.message}
          </SweetAlert>
        </form>
      </section>
    );
  };

  handleChangeNik(event) {
    this.setState({ valueNik: this.onlyNumber(event.target.value) });
  }

  handleChangeHp(event) {
    this.setState({ valueHp: event.target.value });
  }

  handleChangeOTP1(event) {
    const value = event.target.value === 'N' ? '' : event.target.value;
    this.setState({ valueOtp1: this.onlyNumber(value) });
  }

  handleChangeOTP2(event) {
    const value = event.target.value === 'N' ? '' : event.target.value;
    this.setState({ valueOtp2: this.onlyNumber(value) });
  }

  handleChangeOTP3(event) {
    const value = event.target.value === 'N' ? '' : event.target.value;
    this.setState({ valueOtp3: this.onlyNumber(value) });
  }

  handleChangeOTP4(event) {
    const value = event.target.value === 'N' ? '' : event.target.value;
    this.setState({ valueOtp4: this.onlyNumber(value) });
  }

  handleChangeOTP5(event) {
    const value = event.target.value === 'N' ? '' : event.target.value;
    this.setState({ valueOtp5: this.onlyNumber(value) });
  }

  handleChangeOTP6(event) {
    const value = event.target.value === 'N' ? '' : event.target.value;
    this.setState({ valueOtp6: this.onlyNumber(value) });
  }

  handleChangePin(event) {
    const value = event.target.value === 'N' ? '' : event.target.value;
    this.setState({ valuePin: this.onlyNumber(value) });
  }

  handleChangePin2(event) {
    this.setState({ valuePin2: this.onlyNumber(event.target.value) });
  }

  render() {
    const {
      displayForm,
      state: { step }
    } = this;
    const classNames = classname('o-form-pin', {});

    return (
      <div className={classNames}>
        <div className="forgot-pin-header">
          <Header activeMenu="notLoggedIn" />
        </div>
        <HeaderBanner
          imageDesktop={ImageBanner}
          imageMobile={ImageBannerMobile}
          title="Lupa Pin"
          subtitle="Lengkapi form di bawah ini untuk mendaftarkan diri."
        />
        <div className="container">
          <div className="row">
            <div className="login-left">
              <CardSteper dataStepper={step} contentCard={displayForm()} />
            </div>
            <div className="login-right">
              <CardSteper dataStepper={step} contentCard={displayForm()} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

LupaPin.propTypes = {
  history: PropTypes.object
};

LupaPin.defaultProps = {
  history: { push: '/' }
};

export default LupaPin;
