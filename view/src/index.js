import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store';
import App from './components/App';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import './style.css';
import JWT from 'jwt-client';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';

// config
JWT.defaults.tokenPrefix = 'JWT';
BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
