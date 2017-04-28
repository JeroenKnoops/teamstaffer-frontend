// global css
import './assets/bootstrap/css/bootstrap.3.3.7.min.csss';

import React from 'react';
import ReactDOM from 'react-dom';
import { render } from "react-dom";
import { Routes } from './app/routes';

render(
  <Routes />,
  document.getElementById("app")
);