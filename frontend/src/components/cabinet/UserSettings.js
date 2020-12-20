import React from "react";
import {Button, Grid, Typography, ButtonGroup} from "@material-ui/core";
import axios from "axios";
import Header from "../../containers/Header";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {updateuser} from "../../actions/auth";
import {createMessage} from "../../actions/messages";
import Footer from "../../containers/Footer";
import * as MaterialUI from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
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


const UserSettings = useStyles(class extends React.Component {
    state = {
        user: [],
        username: '',
        old_password: '',
        password1: '',
        new_password: '',
    }


    onSubmit = (e) => {
        e.preventDefault();
        const {username, old_password, password1, new_password} = this.state;
        const id = this.props.user.id;
        if ((!password1.length) && (!new_password.length) && (!old_password.length)) {
            const newUser = {
                id,
                username,
                old_password,
                new_password,
            };
            this.props.updateuser(newUser);
            this.setState({
                username: '',
                old_password: '',
                password1: '',
                new_password: '',
            })
            this.refreshPage()
        } else {
            if (!(password1 == new_password && password1.length && old_password.length)) {

                this.props.createMessage({passwordNotMatch: 'Passwords do not match'});

            } else {
                const newUser = {
                    id,
                    username,
                    old_password,
                    new_password,
                };
                this.props.updateuser(newUser);
                this.setState({
                    username: '',
                    old_password: '',
                    password1: '',
                    new_password: '',
                })


            }
        }


    };

    refreshPage() {
        window.location.reload();
    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value});

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
        updateuser: PropTypes.func.isRequired,

    };


    sections = [
        {title: 'Дивлюсь', url: '/home'},
        {title: 'Подивився', url: '/home'},
        {title: 'Заплановано', url: '/home'},
    ];

    render() {
        const {username, old_password, password1, new_password} = this.state;
        const {classes} = this.props
        return (
            <Grid className={classes.main}>

                <Header/>
                {!this.props.auth.isAuthenticated ? <h1 align="center">Oops, Something Went
                    Wrong</h1> : <>{this.props.auth.user.id == this.props.match.params.userID ? <Grid container
                                                                                                      spacing={1}
                                                                                                      direction="column"
                                                                                                      style={{
                                                                                                          minHeight: '100vh',
                                                                                                          align: 'center',
                                                                                                          margin: 'auto',
                                                                                                          width: '70%',
                                                                                                          borderRadius: "7px"
                                                                                                      }}>
                    <Grid justify="center" style={{
                        background: 'rgba(255,255,255,0.80)',
                        borderRadius: '5px',
                        marginTop: '20px',
                        padding: '20px 40px'
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
                                marginLeft: '15px'
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
                        </Grid>
                    </Grid>
                    <Grid style={{
                        background: 'rgba(255,255,255,0.80)',
                        borderRadius: '5px',
                        marginTop: '20px',
                        padding: '40px 40px',
                        height: '100%'
                    }}>
                        <Typography variant='h5' style={{marginBottom: '30px', fontWeight: "800"}}>
                            Налаштування
                        </Typography>
                        <form onSubmit={this.onSubmit} style={{marginLeft: '20px'}}>

                            <Grid>
                                <Grid style={{display: 'flex'}}>
                                    <Typography style={{
                                        fontSize: '20px',
                                        textAlign: 'left',
                                        paddingTop: '4px',
                                        marginRight: '10px',
                                        width: '80px'
                                    }}>
                                        Логін:
                                    </Typography>
                                    <TextField
                                        name="username"
                                        variant="outlined"
                                        size='small'
                                        label='Новий логін'
                                        id="username"
                                        onChange={this.onChange}
                                        value={username}
                                    >
                                    </TextField>
                                </Grid>
                                <Divider style={{margin: '30px 0'}}/>
                                <Grid style={{display: 'flex'}}>
                                    <Typography style={{
                                        fontSize: '20px',
                                        textAlign: 'left',
                                        paddingTop: '4px',
                                        marginRight: '10px',
                                        width: '80px'
                                    }}>
                                        Пароль:
                                    </Typography>
                                    <Grid>
                                        <TextField
                                            name="old_password"
                                            autoFocus
                                            variant="outlined"
                                            size='small'
                                            label="Пароль"
                                            id="old_password"
                                            onChange={this.onChange}
                                            value={old_password}
                                        >
                                        </TextField>
                                        <br/>
                                        <TextField
                                            style={{
                                                marginTop: '15px'
                                            }}
                                            name="password1"
                                            variant="outlined"
                                            size='small'
                                            label="Новий пароль"
                                            id="password1"
                                            onChange={this.onChange}

                                            value={password1}
                                        >
                                        </TextField>
                                        <br/>
                                        <TextField
                                            name="new_password"
                                            variant="outlined"
                                            size='small'
                                            style={{
                                                marginTop: '15px'
                                            }}
                                            id="new_password"
                                            label="Підтвердіть пароль"
                                            onChange={this.onChange}
                                            value={new_password}
                                        >
                                        </TextField>
                                    </Grid>
                                </Grid>
                                <Divider style={{margin: '30px 0'}}/>
                                <Grid style={{marginTop: '30px'}}>
                                    <Button variant="filled"
                                            type="submit"
                                            style={{
                                                fontSize: '15px',
                                                background: '#41B619',
                                                color: 'white',
                                                marginLeft: '84%',
                                            }}>
                                        Підтвердити
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
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
export default connect(mapStateToProps, {updateuser, createMessage})(UserSettings);