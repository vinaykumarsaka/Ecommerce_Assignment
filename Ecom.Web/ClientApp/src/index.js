import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import store from './redux/store';
import axios from 'axios';
import { jwtInterceptor } from './helpers';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'

// axios.defaults.baseURL="https://localhost:44322";
// axios.interceptors.request.use(req => {
//   const token = localStorage.getItem("token");
//   req.headers.authorization = token;
//   return req;
// });
jwtInterceptor();
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <Router>
    <App />
    </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
