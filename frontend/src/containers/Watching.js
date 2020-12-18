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
import {makeStyles, withStyles} from "@material-ui/core/styles";
import * as MaterialUI from "@material-ui/core";
import Header from './Header'
import Footer from "./Footer";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DoneIcon from "@material-ui/icons/Done";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";


const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);


class Watching extends React.Component {
    render() {

        const movie_url = 'Url'//this.props.movie.url;

        const cabinet_id = this.props.user.id;
        const type = this.props.type;

            const newWatching = {
                type,
                movie_url,
                cabinet_id

            };


        return (
            <Button onClick={this.props.updateChoice(newWatching)}>
          <ListItemIcon>
              {console.log(6)}
            {this.props.is_watching ? <DoneIcon /> : ''}
          </ListItemIcon>
          <ListItemText primary="Дивлюсь" />
        </Button>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    auth: state.auth,

});
export default connect(mapStateToProps, {updateChoice, createMessage})(Watching);
