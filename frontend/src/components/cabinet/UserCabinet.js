import React, {Component} from "react";
import {Button, Grid, Typography, ButtonGroup} from "@material-ui/core";
import axios from "axios";
import Header from "../../containers/Header";
import SettingsIcon from '@material-ui/icons/Settings';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {addcomment} from "../../actions/auth";
import {createMessage} from "../../actions/messages";
import { Redirect } from "react-router-dom";
import Footer from "../../containers/Footer";

 class UserCabinet extends Component {
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

        isAuthenticated: PropTypes.bool,
        auth: PropTypes.object.isRequired,

    };


    sections = [
        {title: 'Дивлюсь', url: '/home'},
        {title: 'Подивився', url: '/home'},
        {title: 'Заплановано', url: '/home'},
    ];

    render() {
        return (
            <Grid>
                <Header/>
                {!this.props.auth.isAuthenticated ?<h1 align="center">Oops, Something Went Wrong</h1>:<>{this.props.auth.user.id==this.props.match.params.userID?<Grid container
                      spacing={1}
                      direction="column"
                      style={{
                          minHeight: '100vh',
                          align: 'center',
                          margin: 'auto',
                          width: '70%',
                          borderRadius: "7px"
                      }}>

                    <Grid item xs={12} style={{
                        display: 'flex',
                        padding: '5%',
                    }}>
                        {this.state.user.map(user => (
                            <img src={user.avatar} alt="avatar" width="130px" height="130"
                                 style={{borderRadius: "50%"}}/>
                        ))}
                        <Grid container style={{
                            width: '130px',
                            height: '130px',
                            marginLeft: '15px'
                        }}>
                            <Typography style={{
                                margin: 'auto',
                                fontSize: '30px'
                            }}>
                                {this.state.user.map(user => (
                                    user.user.username))}
                            </Typography>
                        </Grid>
                        <Grid style={{
                            marginLeft: 'auto',
                            marginTop: '10px'
                        }}>
                            <Button fullWidth={true} variant="outlined"
                                    href={`/cabinet/settings/${this.state.user.map(user => (
                                        user.user.id))}`}
                                    style={{
                                        maxWidth: '40px',
                                        maxHeight: '40px',
                                        minWidth: '40px',
                                        minHeight: '40px',
                                    }}>
                                <SettingsIcon style={{
                                    width: '30px',
                                    height: '30px',
                                }}/>
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <div>
                            <ButtonGroup component="nav" variant="dense" size={"large"}>
                                {this.sections.map((section) => (
                                    <Button
                                        href={section.url}
                                    >
                                        {section.title}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </div>
                    </Grid>
                </Grid>:<h1 align="center">Oops, Something Went Wrong</h1>}</>}
                <div style={{marginTop:500}}></div>
<Footer style={{marginTop:800}} title="Про нас" description="Усі права захищені Богом!"/>
            </Grid>
        );
    }
}
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    auth: state.auth,

});
export default connect(mapStateToProps)(UserCabinet);