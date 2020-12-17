import React from 'react';
import axios from 'axios';
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import List from "./MovieList";
import AnimeInfo from "./AnimInfo";

import PropTypes from "prop-types";
import {connect} from "react-redux";
import {addcomment} from "../actions/auth";
import {createMessage} from "../actions/messages";
import {useAutocomplete} from "@material-ui/lab";
import {makeStyles} from "@material-ui/core/styles";
import * as MaterialUI from "@material-ui/core";
import Header from './Header'
import Footer from "./Footer";

const useStyles = MaterialUI.withStyles((theme) => ({
    main: {
        background: 'linear-gradient(-45deg, #EE7752, #E73C7E, #23A6D5, #23D5AB)',
        backgroundSize: '400% 400%',
        animation: '$gradient 15s ease infinite'
    },
    movieBox: {
        padding: theme.spacing(2),
        background: 'rgba(255,255,255,0.65)',
        marginBottom: theme.spacing(3)
    },
    '@keyframes gradient': {
        '0%': {
            backgroundPosition: '0% 50%'
        },
        '50%': {
            backgroundPosition: '100% 50%'
        },
        '100%': {
            backgroundPosition: '0% 50%'
        },
    },
}));


const EpisodeDetail = useStyles(class extends React.Component {
    state = {
        comments: [],
        isFetching: true,
        movie: {},
        cabinet: [],
    }

    static propTypes = {
        addcomment: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
        auth: PropTypes.object.isRequired,

    };

    componentDidMount() {
        const movieID = this.props.match.params.movieID;
        const movie_id = this.state.movie.movie_id;
        const {user} = this.props.auth;
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

        const {classes} = this.props
        const movieID = this.props.match.params.movieID;
        let Episode = String(this.state.movie.video_urls).split(",");
        var rows = [];
        var episodeID = this.props.match.params.episodeID;
        if (Episode.length > 1) {
            for (let i = 1; i <= Episode.length; i++) {
                if (episodeID == i) {
                    rows.push(
                        <Button style={{
                            maxWidth: '40px',
                            maxHeight: '40px',
                            minWidth: '40px',
                            minHeight: '40px',
                            background: 'rgba(200,255,200,0.85)',
                            marginRight: '2px',
                        }} href={`/home/${movieID}/${i}`} variant="filled" size="small">
                            {i}
                        </Button>
                    );
                } else {
                    rows.push(
                        <Button style={{
                            maxWidth: '40px',
                            maxHeight: '40px',
                            minWidth: '40px',
                            minHeight: '40px',
                            background: 'rgba(255,255,255,0.85)',
                            marginRight: '2px',
                        }} href={`/home/${movieID}/${i}`} variant="filled" size="small">
                            {i}
                        </Button>
                    );
                }
            }
        }

        return (
            <div className={classes.main}>
                <React.Fragment>
                    <Header/>

                    <AnimeInfo rows={rows} comments={this.state.comments} episodeurl={Episode[episodeID - 1]}
                               post={this.state.movie}/>

                    <Footer title="Про нас" description="Усі права захищені Богом!"/>
                </React.Fragment>
            </div>
        )
    }
});

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    auth: state.auth,

});
export default connect(mapStateToProps, {addcomment, createMessage})(EpisodeDetail);
