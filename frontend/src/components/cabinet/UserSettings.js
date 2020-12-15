import React, {Component} from "react";
import {TextField, Button, Grid, Typography, ButtonGroup} from "@material-ui/core";
import {Link} from "react-router-dom";
import axios from "axios";
import Header from "../../containers/Header";
import {connect} from "react-redux";
import PropTypes from "prop-types";


export default class UserSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
        }
    }

    componentDidMount() {
        const user_id = this.props.match.params.userID;
        axios.get(`http://127.0.0.1:8000/api/cabinet/${user_id}`)
            .then(res => {
                this.setState({
                    user: res.data
                });
            })
    }

    static propTypes = {
        auth: PropTypes.object.isRequired,
    };


    render() {
        return (
            <Grid>
                <Grid container
                      spacing={1}
                      direction="column"
                      style={{
                          minHeight: '100vh',
                          align: 'center',
                          margin: 'auto',
                          width: '70%',
                      }}>
                    <Header style={{
                    }}/>
                    <Grid item xs={12} style={{
                        padding: '5%'
                    }}>
                        {this.state.user.map(user => (
                            <img src={user.avatar} alt="avatar" width="130px" height="130" style={{borderRadius: "50%"}}/>
                        ))}
                        <Grid container style={{
                            width: '130px',
                            height: '130px',
                            marginLeft: '15px'
                        }}>
                            <TextField
                                xs={30}
                                size="medium"
                                label={this.state.user.map(user => (
                                    user.user.username))}
                                variant="outlined"

                                style={{
                                    color: "black",
                                    marginTop: "15px",
                                }}
                            >
                            </TextField>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>

                    </Grid>
                </Grid>
            </Grid>
        );
    }
}