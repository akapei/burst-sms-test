import './scss/style.scss';
import React from 'react';
import ReactDOM from 'react-dom';

require('dotenv').config()

import Home from './components/Home';

const renderApplication = () => {
  ReactDOM.render(
    <Home /> ,
    document.querySelector('#root')
  );
}

renderApplication(Home);