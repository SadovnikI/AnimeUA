import React, {Component} from "react";
import {Button, Grid, Typography, ButtonGroup} from "@material-ui/core";
import axios from "axios";
import Header from "../../containers/Header";
import SettingsIcon from '@material-ui/icons/Settings';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Footer from "../../containers/Footer";
import * as MaterialUI from "@material-ui/core";
import FullWidthTabs from "../../containers/CollLookingMenuZbs";



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


const UserCabinet = useStyles(class extends React.Component {

    componentDidMount() {
        const user_id = this.props.match.params.userID;
        axios.get(`http://127.0.0.1:8000/api/cabinet/${user_id}`)
            .then(res => {
                this.setState({
                    user: res.data
                });
            })
    }

    state = {
        user: [],
    }


    static propTypes = {

        isAuthenticated: PropTypes.bool,
        auth: PropTypes.object.isRequired,

    };

    render() {
        const {classes} = this.props

        return (
            <Grid className={classes.main}>
                <Header/>
                {!this.props.auth.isAuthenticated ? <h1 align="center">Oops, Something Went
                    Wrong</h1> : <>{this.props.auth.user.id == this.props.match.params.userID ? <Grid container
                                                                                                      spacing={1}
                                                                                                      direction="column"
                                                                                                      style={{
                                                                                                          minHeight: '80vh',
                                                                                                          align: 'center',
                                                                                                          margin: 'auto',
                                                                                                          width: '70%',
                                                                                                          borderRadius: "7px",
                                                                                                      }}>
                    <Grid justify="center" style={{
                        background: 'rgba(255,255,255,0.65)',
                        borderRadius: '5px',
                        marginTop: '20px',
                        marginLeft: '4px',
                        padding: '20px 40px',
                        marginRight: '4px',
                    }}>
                        <Grid item xs={12} style={{
                            display: 'flex',
                        }}>
                            {this.state.user.map(user => (
                                <img src={user.avatar} alt="avatar" width="130px" height="130"
                                     style={{borderRadius: "50%"}}/>
                            ))}
                            <Grid container style={{
                                width: '130px',
                                height: '130px',
                                marginLeft: '15px',
                            }}>
                                <Typography style={{
                                    fontSize: '30px',
                                    marginLeft: '20px',
                                    marginTop: '23px',
                                    fontWeight: '800',
                                }}>
                                    {this.state.user.map(user => (
                                        user.user.username))}
                                    <div style={{fontWeight: '400', fontSize: '20px'}}>{this.state.user.map(user => (
                                        user.user.email))}</div>
                                </Typography>
                            </Grid>
                            <Grid style={{
                                display: 'block',
                                marginLeft: 'auto',
                                marginTop: '10px'
                            }}>
                                <Button height={40} width={40} href={'https://t.me/AnimeUaTestBot'}>
                                    <img height={40} width={40} src = {'https://xn--80affa3aj0al.xn--80asehdb/img/logo_share.png'}/>
                                </Button>
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
                    </Grid>
                    <Grid item xs={12} style={{marginBottom: '20px', marginTop: '20px'}}>
                        <FullWidthTabs user={this.state.user}/>
                    </Grid>
                </Grid> : <h1 align="center">Oops, Something Went Wrong</h1>}</>}
                <Footer title="Про нас" description="Усі права захищені Богом!"/>
            </Grid>
        );
    }
});

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    auth: state.auth,

});
export default connect(mapStateToProps)(UserCabinet);