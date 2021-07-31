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
import {addcomment, deleteChoice, updateChoice} from "../actions/auth";
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
import MenuListComposition from "./DropDownChoice";

class Watching extends React.Component {
    state={
        user:[],
        reload: false
    }
    refreshPage = () => {
    this.setState(
      {reload: true},
      () => this.setState({reload: false})
    )
  }
    componentDidMount() {
        const user_id = this.props.auth.user.id;
        console.log(user_id, "userid")
        axios.get(`http://127.0.0.1:8000/api/cabinet/${user_id}`)
            .then(res => {
                this.setState({
                    user: res.data
                });
            })


    }

    render() {console.log(this.state.user)
        return (

            this.state.user.length?<MenuListComposition refreshPage={this.refreshPage} user_cabinet={this.state.user} updateChoice={this.props.updateChoice} deleteChoice={this.props.deleteChoice} movie={this.props.movie}/>:''
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    auth: state.auth,

});
export default connect(mapStateToProps, {updateChoice, deleteChoice, createMessage})(Watching);
