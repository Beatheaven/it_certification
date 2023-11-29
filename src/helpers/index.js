// PLUGINS
import { disablePageScroll, enablePageScroll } from 'scroll-lock-m5';
// import { multiLanguage } from 'helpers/ConfigLanguage';

// ==> START checkOS
export function mobileOSCheck() {
  let mobileOSIs = 'desktop-browser';
  const HTMLElement = document.getElementsByTagName('html')[0];
  if (navigator.userAgent.match(/Android/i)) {
    mobileOSIs = 'android-browser';
  } else if (navigator.userAgent.match(/BlackBerry/i)) {
    mobileOSIs = 'blackberry-browser';
  } else if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
    mobileOSIs = 'ios-browser';
  } else if (navigator.userAgent.match(/IEMobile/i)) {
    mobileOSIs = 'windows-phone-browser';
  }
  HTMLElement.classList.add(mobileOSIs);
}
mobileOSCheck();
// ==> END checkOS

// ==> START delay
export function delay(duration) {
  // eslint-disable-next-line consistent-return
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line prefer-promise-reject-errors
    if (!duration) return reject('Duration is not set!');
    setTimeout(() => resolve(), duration);
  });
}
// ==> END delay

// ==> START removeScrollOnPopup
let removeScrollStatus = false;
export function removeScrollOnPopup(status) {
  // android case : default value is unused due to bug no 45627
  let removeScroll = '';
  if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
    removeScroll = 'remove-scroll-ios';
  }
  if (status) {
    if (window.innerWidth <= 960) {
      if (removeScroll !== '') {
        document.body.classList.remove('scroll-off');
        document.body.classList.remove('remove-scroll');
        document.body.classList.remove('remove-scroll-ios');
        setTimeout(() => {
          document.body.classList.add(removeScroll);
        }, 200);
      } else {
        document.body.classList.add('scroll-off');
      }
    } else {
      document.body.classList.add('scroll-off');
    }
    removeScrollStatus = true;
    delay(300).then(() => {
      removeScrollStatus = false;
    });
  } else if (!removeScrollStatus) {
    document.body.classList.remove('scroll-off');
    document.body.classList.remove('remove-scroll');
    document.body.classList.remove('remove-scroll-ios');
    enablePageScroll();
  }
}
// ==> END removeScrollOnPopup

// ==> START removeScrollInputDropdown
export function removeScrollInputDropdown(status) {
  let removeScroll = 'remove-scroll';
  if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
    removeScroll = 'remove-scroll-dropdown-ios';
  }
  document.body.classList.remove('remove-scroll');
  document.body.classList.remove('remove-scroll-dropdown-ios');
  enablePageScroll();
  if (status) {
    if (window.innerWidth <= 960) {
      document.body.classList.add(removeScroll);
    } else if (window.innerWidth <= 1200) {
      delay(300).then(() => {
        disablePageScroll();
      });
    } else {
      disablePageScroll();
    }
  } else if (window.innerWidth <= 1200) {
    delay(50).then(() => {
      document.body.classList.remove('remove-scroll');
      document.body.classList.remove('remove-scroll-dropdown-ios');
      enablePageScroll();
    });
  }
}
// ==> END removeScrollInputDropdown

export function toggleMegamenuOverlay(status) {
  const root = document.getElementById('root');
  const backdrop = document.createElement('div');
  const existing = document.querySelector('.megamenu-backdrop');
  document.body.classList.toggle('megamenu-overlay', status);

  if (status) {
    root.appendChild(backdrop);
    backdrop.classList.toggle('megamenu-backdrop', status);
    backdrop.classList.toggle('megamenu-backdrop--show', status);
  } else if (!status && existing !== null) {
    existing.classList.toggle('megamenu-backdrop--show', status);
    setTimeout(() => existing.remove(), 150);
  }
}

// ==> START formatRupiah
export function formatRupiah(amount) {
  const numberString = amount.toString();
  const split = numberString.split('.');
  const overage = split[0].length % 3;
  const thousand = split[0].substr(overage).match(/\d{1,3}/gi);
  let decimal = split[1];
  let rupiah = split[0].substr(0, overage);

  if (thousand) {
    const separator = overage ? ',' : '';
    rupiah += separator + thousand.join(',');
  }

  if (decimal === undefined) {
    decimal = '00';
  }

  const formatted = `${rupiah}.${decimal}`;
  return `Rp ${formatted}`;
}
// ==> END formatRupiah

// ==> START formatRupiahRMG
export function formatRupiahRMG(amount) {
  const numberString = amount.toString();
  const split = numberString.split('.');
  const formatted = split[0].replace(/(\d)(?=(\d{3})+$)/g, '$&,');

  if (split[1]) {
    return `Rp ${formatted}.${split[1]}`;
  }

  return `Rp ${formatted}.00`;
}
// ==> END formatRupiahRMG

// ==> START formatNoCurrency
export function formatNoCurrency(amount) {
  const numberString = amount.toString();
  const split = numberString.split('.');
  const formatted = split[0].replace(/(\d)(?=(\d{3})+$)/g, '$&,');

  if (split[1]) {
    return `${formatted}.${split[1]}`;
  }

  return `${formatted}.00`;
}
// ==> END formatNoCurrency

// ==> START formatThousandRMG
export function formatThousandRMG(amount) {
  const numberString = amount.toString();
  const formatted = numberString.replace(/(\d)(?=(\d{3})+$)/g, '$&.');
  return formatted;
}
// ==> END formatThousandRMG

// ==> START smoothScroll
export function smoothScroll(element, duration, offset = 0) {
  // which element do you want to scroll to
  const target = element;

  // that element's y position
  const targetPosition =
    target.getBoundingClientRect().top + window.scrollY + offset;

  // current window position
  const windowPosition = window.scrollY;

  // distance between curent window position and the target
  const distance = targetPosition - windowPosition;

  let startTime = null;

  function animation(currentTime) {
    if (!startTime) {
      startTime = currentTime;
    }
    const timeElapsed = currentTime - startTime;
    const run = Math.easeInOutQuad(
      timeElapsed,
      windowPosition,
      distance,
      duration
    );
    window.scrollTo(0, run);
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

// u: current time, b: start value, c: change in value, d: duration
Math.easeInOutQuad = (t, b, c, d) => {
  let u;
  u /= d / 2;
  if (u < 1) return (c / 2) * u * u + b;
  u -= 1;
  return (-c / 2) * (u * (u - 2) - 1) + b;
};
// ==> END smoothScroll

// ==> START formatMoney
export function formatMoney(amount, symbol, mantissa = true) {
  if (!symbol) return '';
  const numberString = amount.toString();
  const split = numberString.split('.');
  const overage = split[0].length % 3;
  const thousand = split[0].substr(overage).match(/\d{1,3}/gi);
  let money = split[0].substr(0, overage);

  if (thousand) {
    const separator = overage ? ',' : '';
    money += separator + thousand.join(',');
  }

  let formatted = money;

  if (mantissa) {
    formatted = `${money}`;
  }

  let symbolSign = '';
  switch (symbol) {
    case 'IDR':
      symbolSign = 'Rp';
      break;
    default:
      symbolSign = symbol;
      break;
  }
  return `${symbolSign} ${formatted}${split[1] ? `.${split[1]}` : '.00'}`;
}
// ==> END formatMoney

// ==> START formatNumberCard
export const formatNumberCard = (key) => {
  const parts = [];
  for (let i = 0, len = key.length; i < len; i += 4) {
    parts.push(key.substring(i, i + 4));
  }
  return parts.join('-');
};
// ==> END formatNumberCard

// ==> START checkNumber
export const checkNumber = (value) => {
  return Math.floor(value) === value;
};
// ==> END checkNumber

// ==> START formatPhoneNumber
export function formatPhoneNumber(number) {
  const space = /^\s*$/;
  let formatted = number;
  if (!space.test(number)) {
    formatted = formatted
      .replace(/\s/g, '')
      .match(/.{1,4}/g)
      .join(' ');
  }
  return formatted;
}
// ==> END formatPhoneNumber

// ==> START formatNumberCardInput
export function formatNumberCardInput(number) {
  const space = /^-*$/;
  let formatted = number;
  if (!space.test(number)) {
    formatted = formatted
      .replace(/-/g, '')
      .match(/.{1,4}/g)
      .join('-');
  }
  return formatted;
}
// ==> END formatNumberCardInput

// ==> START formatPercentage
export function formatPercentage(number) {
  const value = `${parseFloat(number).toFixed(2)}%`;
  return value;
}

//  ==> START formatDate
export function formatDate(value, format) {
  const date = new Date(value);
  const m = [];
  //   m[2] = multiLanguage.March; example for mulitLang
  m[0] = 'Januari';
  m[1] = 'Februari';
  m[2] = 'Maret';
  m[3] = 'April';
  m[4] = 'Mei';
  m[5] = 'Juni';
  m[6] = 'Juli';
  m[7] = 'Agustus';
  m[8] = 'September';
  m[9] = 'Oktober';
  m[10] = 'November';
  m[11] = 'Desember';
  const month = m[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  if (format === 'd MM YYYY') {
    return `${day} ${month} ${year}`;
  }
  if (format === 'd MM') {
    return `${day} ${month}`;
  }
  if (format === 'YYYY-MM-DD') {
    return `${year} ${month} ${day}`;
  }
  return '';
}

// countdown timer
export function countDown(duration) {
  let timer = duration;
  let minutes;
  let seconds;

  setInterval(() => {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    // eslint-disable-next-line no-plusplus
    if (--timer < 0) {
      timer = duration;
    }
    return `${minutes}:${seconds}`;
  }, 1000);
}
