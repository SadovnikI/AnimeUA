import React, {Component} from "react";
import CreateRoomPage from "./CreateRoomPage";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from "react-router-dom";

export default class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/">
                        <p>POSOSU</p>
                    </Route>
                    <Route path="/create" component={CreateRoomPage}/>
                </Switch>
            </Router>
        );
    }
}