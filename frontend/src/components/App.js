import React, {Component} from "react";
import {render} from "react-dom";
import {BrowserRouter as Router, Switch, Link, Resirect, Route} from "react-router-dom";

import Blog from "../containers/Home";
import BaseRouter from "../routes";
import {Provider} from "react-redux";
import store from "../store";
import {loadUser} from "../actions/auth";

import ReactDOM from 'react-dom';


import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';



import Login from './accounts/Login';
import Register from './accounts/Register';
import PrivateRoute from './common/PrivateRoute';
import Alerts from "../containers/Alerts";



// Alert Options
const alertOptions = {
  timeout: 3000,
  position: 'top center',
};
export default class App extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        store.dispatch(loadUser());
    }

    render() {
        return (
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                <div>
                <Router>
                      <Alerts />
                    <BaseRouter />
                </Router>
            </div>
                    </AlertProvider>
            </Provider>

        );
    }
}

const appDiv = document.getElementById("app");
render(<App/>, appDiv);