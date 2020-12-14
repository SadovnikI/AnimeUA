import React from 'react';
import MovieList from "./containers/MovieListView";
import MovieDetail from "./containers/MovieDetailView";

import { Route } from "react-router-dom";

import EpisodeDetail from "./containers/EpisodeDetailView";
import Album from "./containers/Home";
import Home from "./containers/Home";
import List from "./containers/MovieList";
import Register from "./components/accounts/Register";
import Login from "./components/accounts/Login";
import PrivateRoute from "./components/common/PrivateRoute";
import UserCabinet from "./components/cabinet/UserCabinet";
import UserSettings from "./components/cabinet/UserSettings";


const BaseRouter=() =>(
    <div>
        <Route exact path='/home' component={Home}/>
        <Route exact path='/register' component={Register}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/home/:movieID' component={MovieDetail}/>
        <Route exact path='/home/:movieID/:episodeID' component={EpisodeDetail} />
        <Route exact path='/cabinet/:userID' component={UserCabinet} />
        <Route exact path='/cabinet/settings/:userID' component={UserSettings} />
    </div>
);
export default BaseRouter;