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
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import {connect} from "react-redux";
import {addcomment} from "../actions/auth";
import {createMessage} from "../actions/messages";
import Icon from '@material-ui/core/Icon';
import {Avatar, Divider, ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Moment from "moment";

class Avatars extends React.Component {
    state = {
        cabinet: [],

    }
    componentDidMount() {
        const id=this.props.userid
        axios.get(`http://127.0.0.1:8000/api/cabinet/${id}`)
        .then(res => {
            this.setState({
                cabinet: res.data,

            });
        })
    }


    render(){

        return(
            <>
            <Avatar alt="avatar" src={
            this.state.cabinet.map(item=>(
                item.avatar
            ))}
            />
            </>
    )}
}
export default (Avatars);