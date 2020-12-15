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

const useStyles = MaterialUI.withStyles((theme) => ({
    toolbar: {
        backgroundColor: theme.palette.common.white,
    },
    toolbarTitle: {
        backgroundImage: 'url(https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80)',
        backgroundSize: '20% 100%',
        backgroundClip: 'text',
        color: 'transparent',
        flex: 1,
    },
    toolbarSecondary: {
        justifyContent: 'space-between',
        overflowX: 'auto',
        backgroundColor: theme.palette.grey[200],
    },
    toolbarLink: {
        marginLeft: theme.spacing(3),
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

    render() {
        const {isAuthenticated, user} = this.props.auth;

        const {classes} = this.props

        const authLinks = (
            <div>
                <strong>{user ? `Welcome, ${user.username}!` : ''} </strong>
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
                    </Typography>

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