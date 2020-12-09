import React from 'react';
import axios from 'axios';
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import List from "./MovieList";
import AnimeInfo from "./AnimInfo";

import Comments from "./CommentSection";
import {Card, Comment, Form, Header} from "semantic-ui-react";

class EpisodeDetail extends React.Component {
    state = {
        comments: [],
        isFetching: true,
        movie: {}
    }

    componentDidMount() {
        const movieID = this.props.match.params.movieID;

        axios.get(`http://127.0.0.1:8000/api/${movieID}`)
            .then(res => {
                this.setState({
                    movie: res.data
                });
            })

        axios.get(`http://127.0.0.1:8000/api/comment/${movieID}`)
            .then(res => {
                this.setState({
                    comments: res.data,

                });
            })

    }

    render() {
        const movieID = this.props.match.params.movieID;
        let Episode = String(this.state.movie.video_urls).split(",");
        var rows = [];
        var episodeID = this.props.match.params.episodeID;
        if (Episode.length > 1) {
            for (let i = 0; i < Episode.length; i++) {
                if (episodeID == i) {
                    rows.push(
                        <Button href={`/home/${movieID}/${i}`} variant="outlined" color="primary" size="small">
                            Episode {i + 1}
                        </Button>
                    );
                } else {
                    rows.push(
                        <Button href={`/home/${movieID}/${i}`} variant="outlined" size="small">
                            Episode {i + 1}
                        </Button>
                    );
                }
            }
        }


        return (
            <React.Fragment>

                <List/>
                <AnimeInfo post={this.state.movie}/>

                <Grid container justify="center" margin-top={'60px'}>

                    <video height={'340px'} src={Episode[episodeID]} controls/>

                </Grid>
                <Grid container justify="center">
                    {rows}
                </Grid>
                <Grid><Comments comments={this.state.comments}/></Grid>



            </React.Fragment>
        )
    }
}

export default EpisodeDetail;