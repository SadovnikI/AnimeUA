import React from 'react';


import MovieList from "./containers/MovieListView";
import MovieDetail from "./containers/MovieDetailView";
import {Route} from 'react-router-dom'
import EpisodeDetail from "./containers/EpisodeDetailView";


const BaseRouter=() =>(
    <div>
        <Route exact path='/' component={MovieList}/>
        <Route exact path='/:movieID' component={MovieDetail} />
        <Route exact path='/:movieID/:episodeID' component={EpisodeDetail} />
    </div>
);
export default BaseRouter;