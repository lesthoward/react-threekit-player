import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import  { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Provider from './provider/provider';
import ErrorBoundary from "./components/errorBoundary/errorBoundary"

ReactDOM.render(
  <ErrorBoundary>
    <Provider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </ErrorBoundary>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
