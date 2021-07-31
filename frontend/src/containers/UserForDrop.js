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
import CustomizedMenus from "./DropDawnAvatar";
import CustomizedAddMenu from "./DropDownChoice";

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


const UserForDrop = useStyles(class extends React.Component {
    state = {

        cabinet: [],
    }

    static propTypes = {
        addcomment: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
        auth: PropTypes.object.isRequired,

    };

    componentDidMount() {
        const userID = this.props.user.id;

        axios.get(`http://127.0.0.1:8000/api/cabinet/${userID}`)
            .then(res => {
                this.setState({
                    cabinet: res.data
                });
            })



    }




    render() {


        return (
            <div >

                <CustomizedAddMenu user_cabinet={this.state.cabinet} movie={this.props.movie}/>

            </div>
        )
    }
});

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    auth: state.auth,

});
export default connect(mapStateToProps, {addcomment, createMessage})(UserForDrop);