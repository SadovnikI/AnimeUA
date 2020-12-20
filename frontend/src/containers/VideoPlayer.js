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
import {addcomment, updateChoice} from "../actions/auth";
import {createMessage} from "../actions/messages";
import {useAutocomplete} from "@material-ui/lab";
import {makeStyles} from "@material-ui/core/styles";
import * as MaterialUI from "@material-ui/core";
import Header from './Header'
import Footer from "./Footer";
import Divider from "@material-ui/core/Divider";

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


const VideoPlayer = useStyles(class extends React.Component {
    state = {
        episodeurl:this.props.video_urls[0]
    }

    episode_id=0


        changeUrl = (url)=> {
            this.episode_id=url-1
            this.setState({
                episodeurl: this.props.video_urls[url-1]
            })
        }

    render() {

        var rows = [];
        if (this.props.video_urls.length > 1) {


            for (let i = 1; i <= this.props.video_urls.length; i++) {
                if (this.episode_id == i-1) {
                    rows.push(
                        <Button style={{
                            maxWidth: '40px',
                            maxHeight: '40px',
                            minWidth: '40px',
                            minHeight: '40px',
                            background: 'rgba(200,255,200,0.85)',
                            marginRight: '2px',
                        }}  variant="filled" size="small">
                            {i}
                        </Button>
                    );
                } else
                {
                    rows.push(
                        <Button onClick={()=>this.changeUrl(i)} style={{
                            maxWidth: '40px',
                            maxHeight: '40px',
                            minWidth: '40px',
                            minHeight: '40px',
                            background: 'rgba(255,255,255,0.85)',
                            marginRight: '2px',
                        }}  variant="filled" size="small">
                            {i}
                        </Button>
                    );
                }
            }
        }


        return (
            <div>
                <Grid container style={{
                    marginBottom: 10,

                }}>
                    <div style={{height: '100%'}}>
                        {rows}
                    </div>
                </Grid>
                <video background-color={'black'} margin-top={'10px'} style={{marginRight: 180}}
                       width={'855px'} height={'480px'}
                       src={this.state.episodeurl} controls/>
                <br/>
                <br/>
                <Divider style={{width: '105%'}}/>
            </div>
        )
    }
});

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    auth: state.auth,

});
export default connect(mapStateToProps, {addcomment, updateChoice, createMessage})(VideoPlayer);