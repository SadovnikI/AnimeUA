import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import Watching from "./Watching";

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
  const {user_cabinet, movie} = props;

  const movie_id = movie.movie_id;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let is_watching = false;
  let is_completed = false;
  let is_planning = false;
  let is_dropped = false;


  function check() {


        user_cabinet.map(item=>(

            item.watching.map(item => (item.id == movie_id ?  is_watching = true  : '')),
            item.completed.map(item => (item.id == movie_id ? is_completed = true : '')),
      item.planning.map(item => (item.id == movie_id ? is_planning = true : '')),
      item.dropped.map(item => (item.id == movie_id ? is_dropped = true : ''))
        ))

  }


  return (
    <div>
        { user_cabinet.length?check():''}
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Додати <AddIcon />
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Watching type={'watching'} movie={movie} is_watching={is_watching}/>
        <StyledMenuItem>
          <ListItemIcon>
            {is_completed ? <DoneIcon /> : ''}
          </ListItemIcon>
          <ListItemText primary="Закінчено" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            {is_planning ? <DoneIcon /> : ''}
          </ListItemIcon>
          <ListItemText primary="Заплановано" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            {is_dropped ? <DoneIcon /> : ''}
          </ListItemIcon>
          <ListItemText primary="Закинуто" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}