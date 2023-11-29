import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const CountDownTimer = (props) => {
  const { className, interval, onStop } = props;

  const [counter, setCounter] = useState(interval);
  const [mins, setMins] = useState();
  const [sec, setSec] = useState();

  useEffect(() => {
    const mins = Math.floor(counter / 60);
    const sec = counter - mins * 60;

    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);

    setMins(mins < 10 ? `0${mins}` : mins);
    setSec(sec < 10 ? `0${sec}` : sec);
    if (counter <= 0) {
      onStop();
    }
    return () => clearInterval(timer);
  }, [counter, onStop]);

  return <div className={className}>( {`${mins}:${sec}`} )</div>;
};

CountDownTimer.propTypes = {
  className: PropTypes.string,
  interval: PropTypes.number,
  onStop: PropTypes.func
};

CountDownTimer.defaultProps = {
  className: '',
  interval: 60,
  onStop: () => {}
};

export default CountDownTimer;
