import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DraftsIcon from '@material-ui/icons/Drafts';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

export default function CustomizedMenus(props) {
    const {user_cabinet, logout_user} = props;
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button style={{
                borderRadius: '50%'
            }}
                    onClick={handleClick}
            >{user_cabinet.map(item => (
                <img height={50} width={50}
                     src={item.avatar}/>
            ))}

            </Button>
            {user_cabinet.map(item => (
                <StyledMenu
                    id="customized-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <a style={{
                        textDecoration: 'none',
                    }} href={`/cabinet/${item.user.id}`}>
                        <StyledMenuItem>
                            <ListItemIcon>
                                <PersonIcon style={{fontSize: '30px'}}/>
                            </ListItemIcon>
                            <ListItemText style={{color: 'black'}} primary="Кабінет"/>
                        </StyledMenuItem>
                    </a>
                    <a style={{
                        textDecoration: 'none',
                    }} href={`/cabinet/settings/${item.user.id}`}>
                        <StyledMenuItem>
                            <ListItemIcon>
                                <SettingsIcon style={{fontSize: '30px'}}/>
                            </ListItemIcon>
                            <ListItemText style={{color: 'black'}} primary="Налаштування"/>
                        </StyledMenuItem>
                    </a>
                    <a style={{
                        textDecoration: 'none',
                    }} href={`/home`}>
                        <StyledMenuItem onClick={logout_user}>
                                <ListItemIcon>
                                    <ExitToAppIcon style={{fontSize: '30px'}} />
                                </ListItemIcon>
                                <ListItemText style={{color: 'red'}} primary="Вийти"/>
                        </StyledMenuItem>
                    </a>
                </StyledMenu>
            ))}
        </div>
    );
}