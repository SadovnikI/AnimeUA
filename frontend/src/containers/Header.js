import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import {connect} from "react-redux";

import { logout } from '../actions/auth';



export class Header extends React.Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired,
    };
sections = [
  { title: 'Головна', url: '/home' },


];
    render() {
        const { isAuthenticated, user } = this.props.auth;
        const authLinks = (
            <div>
                <strong>{user ? `Welcome ${user.username}` : ''}</strong>
                <Button onClick={this.props.logout} variant="outlined" size="small">
                        Вийти
                </Button>
            </div>

);

    const guestLinks = (
        <div>
            <Button href={'/login'} variant="outlined" size="small">
                Увійти
            </Button>
            <Button href={'/register'} variant="outlined" size="small">
                Зареєструватися
            </Button>
        </div>

    );

        return (
            <React.Fragment>
                <Toolbar>
                    <Typography
                        component="h2"
                        variant="h5"
                        color="inherit"
                        align="center"
                        noWrap

                    >

                    </Typography>
                        {isAuthenticated ? authLinks : guestLinks}

                </Toolbar>
                <Toolbar component="nav" variant="dense">
                    {this.sections.map((section) => (
                        <Link
                            color="inherit"
                            noWrap
                            key={section.title}
                            variant="body2"
                            href={section.url}

                        >
                            {section.title}
                        </Link>
                    ))}
                </Toolbar>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Header);