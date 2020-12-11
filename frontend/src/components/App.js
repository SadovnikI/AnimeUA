import React, {Component} from "react";
import {render} from "react-dom";
import {BrowserRouter as Router, Switch, Link, Resirect, Route} from "react-router-dom";

import Blog from "../containers/Home";
import BaseRouter from "../routes";
import {Provider} from "react-redux";
import store from "../store";
import {loadUser} from "../actions/auth";

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
                <div>
                <Router>
                    <BaseRouter />
                </Router>
            </div>
            </Provider>

        );
    }
}

const appDiv = document.getElementById("app");
render(<App/>, appDiv);