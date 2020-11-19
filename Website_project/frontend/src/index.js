import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import Player from 'react-player'
import reportWebVitals from './reportWebVitals';
import ResponsivePlayer from './video/ResponsivePlayer';
import Navbar from './components/navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import Catalog from './pages/catalog';
import Main from './pages/main';
import SignUp from './pages/signup';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact component={Home} />
       
        <Route path='/about' component={About} />
        <Route path='/catalog' component={Catalog} />
        <Route path='/main' component={Main} />
        <Route path='/sign-up' component={SignUp} />
      </Switch>
    </Router>
    

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
