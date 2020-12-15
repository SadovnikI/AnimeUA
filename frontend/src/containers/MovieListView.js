import React from 'react'
import axios from 'axios';
import {List} from 'antd';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';

import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Card from "@material-ui/core/Card";
import FeaturedPost from "./FeaturedPost";


class MovieList extends React.Component {
    state = {
        movies: []
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api')
            .then(res => {
                this.setState({
                    movies: res.data
                });
                console.log(res.data);
            })
    }

    render() {

        return (

            <Grid container spacing={2}>
                {this.state.movies.map((post) => (
                    <FeaturedPost post={post}/>
                ))}
            </Grid>

        )
    }
}


export default MovieList;