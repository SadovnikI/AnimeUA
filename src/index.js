import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import Player from 'react-player'
import reportWebVitals from './reportWebVitals';
import ResponsivePlayer from './video/ResponsivePlayer';
 


ReactDOM.render(
  <React.StrictMode>
    
    <ResponsivePlayer />,

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
