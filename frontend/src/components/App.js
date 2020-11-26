import React, {Component} from "react";
import {render} from "react-dom";
import {BrowserRouter as Router} from "react-router-dom";
import BaseRouter from "../routes";

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Router>
                    <BaseRouter/>
                </Router>
            </div>
        );
    }
}

const appDiv = document.getElementById("app");
render(<App/>, appDiv);