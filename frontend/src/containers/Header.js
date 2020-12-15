import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {connect} from "react-redux";
import {logout} from '../actions/auth';
import * as MaterialUI from "@material-ui/core";
import {ButtonGroup} from "@material-ui/core";

const useStyles = MaterialUI.withStyles((theme) => ({
    toolbar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbarTitle: {
        flex: 1,
    },
    toolbarSecondary: {
        justifyContent: 'space-between',
        overflowX: 'auto',
    },
    toolbarLink: {
        padding: theme.spacing(1),
        flexShrink: 0,
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
                <strong>{user ? <a href={`/cabinet/${user.id}`} style={{
                    textDecoration: 'none',
                    color: 'white',
                    margin: '0 20px 0 0'
                }}>Welcome, {user.username}!</a> : ''}</strong>
                <Button onClick={this.props.logout} variant="outlined" size="small" style={{color:"white"}}>
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
                    {isAuthenticated ? authLinks : guestLinks}
                </Toolbar>
                <div className={classes.toolbarSecondary}>
                    <ButtonGroup component="nav" variant="dense" size={"large"}>
                        {this.sections.map((section) => (
                            <Button
                                key={section.title}
                                href={section.url}
                                className={classes.toolbarLink}
                            >
                                {section.title}
                            </Button>
                        ))}
                    </ButtonGroup>
                </div>
            </React.Fragment>
        );
    }
});

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {logout})(Header);