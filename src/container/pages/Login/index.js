import React, { Component } from 'react';
import { H1, Button, Input, Links, Notification, Loading } from 'components';
import BgLoginMobile from 'assets/images/banner/bg-login-mobile.png';
import classname from 'classnames';
import PropTypes from 'prop-types';
import Sagara from 'assets/images/logo/Logo.png';
import Google from 'assets/images/google.png';
// Network
import { login } from '../../../services';

// style
import './styles.scss';

class Login extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      notif: '',
      valueNik: '',
      valuePin: '',
      message: '',
      loading: false
    };

    this.handleChangeNik = this.handleChangeNik.bind(this);
    this.handleChangePin = this.handleChangePin.bind(this);
    this.handleClickLogin = this.handleClickLogin.bind(this);
  }

  componentDidMount() {}

  handleClickLogin = (event) => {
    const { valueNik, valuePin } = this.state;
    const userTemp = {
      nik: valueNik,
      pin: valuePin
    };

    this.setState({ loading: true });

    login(userTemp).then((response) => {
      // console.log(response)
      localStorage.setItem('token', `Token ${response.data.token}`);
      window.location.href = '/class';
    });
    // .catch((err) => {
    //   if (valueNik.length !== 16 && valuePin.length !== 6) {
    //     this.setState({
    //       message: 'NIK harus 16 angka & PIN harus 6 angka',
    //     });
    //   } else if (valueNik.length !== 16) {
    //     this.setState({
    //       message: 'NIK harus 16 karakter',
    //     });
    //   } else if (valuePin.length !== 6) {
    //     this.setState({
    //       message: 'PIN harus 6 karakter',
    //     });
    //   } else {
    //     this.setState({
    //       message: 'NIK atau PIN yang kamu masukkan salah.',
    //     });
    //   }

    //   this.setState({ notif: 'error', loading: false });
    //   const { history } = this.props;
    //   history.push('/login');
    // });

    event.preventDefault();
  };

  handleChangeNik(event) {
    // const re = /^[0-9\b]+$/;
    // if (event.target.value === '' || re.test(event.target.value)) {
    this.setState({ valueNik: event.target.value });
    // }
  }

  handleChangePin(event) {
    // const re = /^[0-9\b]+$/;
    // if (event.target.value === '' || re.test(event.target.value)) {
    this.setState({ valuePin: event.target.value });
    // }
  }

  render() {
    const nextClass = classname('inner-container', {});
    const classNames = classname('o-login', {});
    const {
      state: { notif, valueNik, valuePin, message, loading },
      handleClickLogin,
      handleChangePin,
      handleChangeNik
    } = this;

    return (
      <div className={nextClass}>
        <Loading loading={loading} />
        <div className={classNames}>
          <div className="o-login__image-wrapper o-card-dashboard__image-wrapper--m">
            <img src={BgLoginMobile} alt="bg" />
          </div>
          <div className="o-login">
            <div className="col-sm-6 login-title">
              <div className="card__badge">
                <img src={Sagara} alt="Logo Perusahaan" />
                <div style={{ color: 'blue' }}>Learn More</div>
              </div>
              <H1 weight="bold" color="white" className="desktop-only">
                Login
              </H1>
              <Notification status={notif} title={message} />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <div className="card-body">
                  <div style={{ justifyContent: 'flex-start' }}>
                    <div
                      className="font"
                      style={{ color: '#a51525', fontSize: '50px' }}
                    >
                      Sign In
                    </div>
                    <div>
                      New to Sagara? &nbsp;
                      <Links
                        underline
                        className="forgot-password-link"
                        to="/register-nasabah"
                        variant="links-additional-info"
                        color="blue"
                        tabIndex="-1"
                        type="link"
                      >
                        Sign Up
                      </Links>
                    </div>
                  </div>
                  <form onSubmit={handleClickLogin}>
                    <div className="form-group" style={{ marginTop: '50px' }}>
                      {/* <label htmlFor="email">Email</label> */}
                      <Input
                        type="text"
                        id="nik"
                        placeholder="Email"
                        handleChange={handleChangeNik}
                        maxlength={16}
                        value={valueNik}
                      />
                    </div>
                    <div
                      className="form-group"
                      style={{ marginTop: '40px', marginBottom: '50px' }}
                    >
                      {/* <label htmlFor="password">Password</label> */}
                      <Input
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={valuePin}
                        maxlength={10}
                        handleChange={handleChangePin}
                      />
                    </div>
                    <div className="form-group">
                      <Links
                        underline
                        className="forgot-password-link"
                        to="/forgot-pin"
                        variant="links-additional-info"
                        color="black"
                        tabIndex="-1"
                        type="link"
                      >
                        Forgot Password?
                      </Links>
                    </div>
                    <div className="form-group">
                      <Button variant="primary" type="submit">
                        Sign In
                      </Button>
                    </div>
                    <div className="form-group">
                      <Button variant="secondary" type="button">
                        Sign In with Google
                      </Button>
                    </div>
                    <div className="form-group">
                      <Button variant="secondary" type="button">
                        Sign In with LinkedIn
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="link-section">
                <div className="title-content">Belum punya akun?</div>
                <Links
                  underline
                  className=""
                  to="/register-nasabah"
                  variant="links-additional-info"
                  color="white"
                  tabIndex="-1"
                  type="link"
                >
                  DAFTAR DISINI
                </Links>
              </div>
            </div>
            <div className="col-sm-6 pr-0">
              <div className="o-login__image-cover" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object
};

Login.defaultProps = {
  history: { push: '/' }
};

export default Login;
