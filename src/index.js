// Polyfill IE
import 'es5-shim';
import 'es5-shim/es5-sham';
import 'core-js/es/map';
import 'core-js/es/set';
import 'raf/polyfill';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import store from './store';
import { history } from './store/middlewares';

// Main Style
import './assets/styles/main.scss';

// App
import App from './container/app';

const googleAnalyticsId = 'G-CESK2EQ2JB';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter history={history}>
      <App />
      <Helmet>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
        />
        <script>
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${googleAnalyticsId}'); 
          `}
        </script>
      </Helmet>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
