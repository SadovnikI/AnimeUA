import React, {Component} from "react";
import {TextField, Button, Grid, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import axios from "axios";
import Header from "../../containers/Header";

import InputBase from '@material-ui/core/InputBase';


export default class UserCabinet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomCode: "",
            error: "",
            user: [],
        }
    }

    componentDidMount() {
        const userID = this.props.match.params.userID;

        axios.get(`http://127.0.0.1:8000/api/cabinet/${userID}`)
            .then(res => {
                this.setState({
                    user: res.data
                });
            })
    }


    render() {
        return (
            <Grid style={{
                background: '#F1F2F2',
            }}>
                <Grid container
                      spacing={1}
                      direction="column"
                      style={{
                          minHeight: '100vh',
                          align: 'center',
                          margin: 'auto',
                          width: '81.5%',
                          background: 'white',
                      }}>
                    <Header style={{
                        background: '#FBCEB5',
                    }}/>
                    <Grid item xs={12} style={{
                        display: 'flex',
                        padding: '5%'
                    }}>
                        {this.state.user.map(user => (
                            <Button component="label" style={{
                                borderRadius: '100%',
                            }}><img src={user.avatar} alt="avatar" width="130px" height="130"/>
                                <input
                                    type="file"
                                    hidden
                                />
                            </Button>
                        ))}
                        <Grid container style={{
                            width: '130px',
                            height: '130px',
                            marginLeft: '15px'
                        }}>
                            <Typography style={{margin: 'auto'}}>
                                {this.state.user.map(user => (
                                           user.user.username))}
                            </Typography>
                            {/*<form noValidate>*/}
                            {/*    <InputBase*/}
                            {/*        style={{*/}
                            {/*            margin:theme.spacing(1),*/}
                            {/*        }}*/}
                            {/*        defaultValue="Naked input"*/}
                            {/*        inputProps={{'aria-label': 'naked'}}*/}
                            {/*    />*/}
                            {/*</form>*/}
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        Anime list
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
