import './scss/style.scss';
import React from 'react';
import ReactDOM from 'react-dom';

require('dotenv').config()

import Form from './components/Home';

const renderApplication = () => {
  ReactDOM.render(
    <Form /> ,
    document.querySelector('#root')
  );
}

renderApplication(Form);