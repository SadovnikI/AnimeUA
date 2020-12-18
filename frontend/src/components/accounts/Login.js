import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Header from "../../containers/Header";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {login} from "../../actions/auth"
import * as MaterialUI from "@material-ui/core";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Усі права захищені Богом © '}

            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
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

const Login = useStyles(class extends React.Component {

    state = {
        username: '',
        password: '',
    }
    static propTypes = {
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    }
    onSubmit = e => {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password)
    }
    onChange = e => this.setState({[e.target.name]: e.target.value})
    render() {
        const {classes} = this.props
        if (this.props.isAuthenticated) {
            return <Redirect to="/home"/>;
        }
        const {username, password} = this.state;
        return (
            <React.Fragment>
            <div >
            <Container component="main" maxWidth="xs">

                <div>
                    <h2 className="text-center">Login</h2>
                    <form onSubmit={this.onSubmit} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="fname"
                                    name="username"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="username"
                                    label="User Name"
                                    autoFocus
                                    onChange={this.onChange}
                                    value={username}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={this.onChange}
                                    value={password}
                                />
                            </Grid>
                            <div className="form-group">
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="outlined"
                                    color="primary"
                                >
                                    Login
                                </Button>
                            </div>
                        </Grid>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link to={'/register'} variant="body2">
                                    Don't have an account? Register
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
            </div>
            </React.Fragment>
        );
    }
})

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, {login})(Login);