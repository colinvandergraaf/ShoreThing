// import 'babel-polyfill'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import App from './containers/App.jsx';
// also add styles here when applicable
import styles from './styles.scss'


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
