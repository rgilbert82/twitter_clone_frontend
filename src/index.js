// import dotenv from 'dotenv';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './stylesheets/index.css';
import { App } from './containers';

// dotenv.config();

ReactDOM.render(
  (
    <BrowserRouter>
      <Route path="/" render={(props) => <App {...props} />} />
    </BrowserRouter>
  ),
  document.getElementById('root')
);
