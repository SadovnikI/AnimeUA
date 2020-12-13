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


class EpisodeDetail extends React.Component {
    state = {
        comments: [],
        isFetching: true,
        movie: {},
        video_id: 1,
        text: '',
        cabinet: [],
    }

    static propTypes = {
        addcomment: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
        auth: PropTypes.object.isRequired,

    };

    componentDidMount() {
        const movieID = this.props.match.params.movieID;
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

    onSubmit = (e) => {
        e.preventDefault();
        const {text} = this.state;
        const movie_id = this.props.match.params.movieID;
        const video_id = this.state.video_id;//this.props.match.params.episodeID;
        const {user} = this.props.auth;
        const date = new Date;
        const user_id = user.id;

        {
            const newComment = {
                user_id,
                text,
                date,
                video_id,
                movie_id
            };
            this.props.addcomment(newComment);
        }
    };

    onChange = (e) => this.setState({[e.target.name]: e.target.value});


    render() {

        const {text} = this.state;
        const movieID = this.props.match.params.movieID;
        let Episode = String(this.state.movie.video_urls).split(",");
        var rows = [];
        var episodeID = this.props.match.params.episodeID;
        if (Episode.length > 1) {
            for (let i = 1; i <= Episode.length; i++) {
                if (episodeID == i) {
                    rows.push(
                        <Button href={`/home/${movieID}/${i}`} variant="outlined" color="primary" size="small">
                            Episode {i}
                        </Button>
                    );
                } else {
                    rows.push(
                        <Button href={`/home/${movieID}/${i}`} variant="outlined" size="small">
                            Episode {i}
                        </Button>
                    );
                }
            }
        }
        const {user} = this.props.auth;


        return (
            <React.Fragment>
                <List/>

                <AnimeInfo rows={rows} comments={this.state.comments} episodeurl={Episode[episodeID - 1]}
                           post={this.state.movie}/>


                {this.props.auth.isAuthenticated ? <>
                    <Container component="main" maxWidth="sm">

                        <CssBaseline/>
                        <div className="col-md-6 m-auto">
                            <div className="card card-body mt-5">
                                <h2 className="text-center">Leave comment</h2>
                                <form onSubmit={this.onSubmit}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                    <textarea style={{
                                        display: 'block',
                                        width: '100%',
                                        padding: '0 20px',
                                        marginBottom: '10px',
                                        background: '#E9EFF6',
                                        lineHeight: '40px',
                                        borderWidth: '0',
                                        borderRadius: '20px',
                                        fontFamily: 'Roboto',
                                        resize: 'none',
                                    }} placeholder="Comment..." rows="3"
                                              name="text"

                                              required

                                              id="text"

                                              autoFocus
                                              onChange={this.onChange}
                                              value={text}
                                    />
                                            {

                                            }
                                        </Grid>
                                        <div className="form-group">
                                            <Button style={{margin: 'theme.spacing(1)',}}
                                                    type="submit"
                                                    fullWidth
                                                    variant="contained"
                                                    color="secondary"


                                            >
                                                Send
                                            </Button>
                                        </div>

                                    </Grid>

                                </form>
                            </div>
                        </div>
                    </Container>
                </> : <p style={{textAlign: 'center'}}>Register to leave coments</p>}
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    auth: state.auth,

});
export default connect(mapStateToProps, {addcomment, createMessage})(EpisodeDetail);
