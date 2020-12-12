import React from 'react';

import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";


import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import List from "./MovieList";

import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import Footer from './Footer';
import axios from "axios";
import MovieList from "./MovieListView";


class MovieDetail extends React.Component {
    state={
        movie: {}
    }

    componentDidMount() {
    const movieID=this.props.match.params.movieID;

        axios.get(`http://127.0.0.1:8000/api/${movieID}`)
            .then(res=> {
                this.setState({
                    movie: res.data
                });
            })

    }

    render(){
        const movieID=this.props.match.params.movieID;
        let Episode = String(this.state.movie.video_urls).split(",");
        var rows = [];
        for (let i = 0; i <Episode.length ; i++) {
            rows.push(
                <div><Button href={`/home/${movieID}/${i}`} variant="contained" color="primary">
                       Episode {i+1}
                      </Button>
                </div>
                );
        }

        return (

            <div>
                {
                    <List/>
                }
                {rows}

            </div>

        );

    }
}

export default MovieDetail;