import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import {connect} from "react-redux";
import {logout} from '../actions/auth';
import {MuiThemeProvider} from '@material-ui/core/styles';
import {createMuiTheme} from '@material-ui/core/styles';
import * as MaterialUI from "@material-ui/core";
import {ButtonGroup} from "@material-ui/core";
import axios from "axios";

const useStyles = MaterialUI.withStyles((theme) => ({
    toolbar: {
        backgroundColor: theme.palette.common.white,
    },
    toolbarTitle: {
        background: 'linear-gradient(-45deg, #EE7752, #E73C7E, #23A6D5, #23D5AB)',
        backgroundSize: '400% 400%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        animation: '$gradient 15s ease infinite'

    },
    toolbarSecondary: {
        justifyContent: 'space-between',
        overflowX: 'auto',
        backgroundColor: theme.palette.grey[200],
    },
    toolbarLink: {
        marginLeft: theme.spacing(3),
        flex: 1
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
}), {withTheme: true});


const Header = useStyles(class extends React.Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired,
    };
    sections = [
        {title: 'Головна', url: '/home'},
        {title: 'Каталог', url: '/home'},
        {title: 'Новини', url: '/home'},
    ];
    state={
        user:[]
    }
    componentDidMount() {


        if(this.props.auth.isAuthenticated){
            const user_id = this.props.auth.user.id;
            axios.get(`http://127.0.0.1:8000/api/cabinet/${user_id}`)
            .then(res => {
                this.setState({
                    user: res.data
                });
            })

        }
    }

    render() {
        const {isAuthenticated, user} = this.props.auth;
        if(isAuthenticated){

            this.componentDidMount()
        }
        const {classes} = this.props

        const authLinks = (
            <div style={{}}>
                <strong>{user ? <a style={{
                    textDecoration: 'none',
                    color: 'black',
                    margin: '0 20px 0 0'
                }} href={`/cabinet/${user.id}`}><img height={ 50} width={50} src={this.state.user.map(item=>(
                    item.avatar
                ))}/></a> : ''}</strong>

                <Button onClick={this.props.logout} variant="outlined" color={"secondary"} size="small">
                    Вийти
                </Button>


            </div>
        );

        const guestLinks = (
            <div>
                <ButtonGroup>
                    <Button href={'/register'} variant="outlined" color={"primary"} size="small" disableElevation>
                        Зареєструватися
                    </Button>
                    <Button href={'/login'} variant="contained" color={"primary"} size="small" disableElevation>
                        Увійти
                    </Button>
                </ButtonGroup>
            </div>

        );

        return (
            <React.Fragment>
                <Toolbar className={classes.toolbar}>
                    <Typography
                        component="h2"
                        variant="h5"
                        color="inherit"
                        align="left"
                        noWrap
                        className={classes.toolbarTitle}
                    >
                        Анімє-UA

                    </Typography>
                    <ButtonGroup component="nav" variant="dense" size={"large"} className={classes.toolbarLink}>
                        {this.sections.map((section) => (
                            <Button
                                key={section.title}
                                href={section.url}
                            >
                                {section.title}
                            </Button>
                        ))}
                    </ButtonGroup>
                    {isAuthenticated ? authLinks : guestLinks}

                </Toolbar>
                <div className={classes.toolbarSecondary}>

                </div>
            </React.Fragment>
        );
    }
});

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {logout})(Header);