import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import {makeStyles} from '@material-ui/core/styles';
import DoneIcon from "@material-ui/icons/Done";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    paper: {
        marginRight: theme.spacing(2),
    },
}));
let is_watching = false;
    let is_completed = false;
    let is_planning = false;
    let is_dropped = false;
    let count =0;
export default function MenuListComposition(props) {
    const [ value, setValue] = useState();


    const {user_cabinet, movie} = props;

    const movie_id = movie.movie_id;




    function check() {
        console.log("check")
        console.log(is_watching||is_completed||is_planning||is_dropped)

if(!(is_watching||is_completed||is_planning||is_dropped)){
    console.log("check vnutoi")
    count +=1;
        user_cabinet.map(item => (

            item.watching.map(item => (item.id == movie_id ? is_watching = true : '')),
                item.completed.map(item => (item.id == movie_id ? is_completed = true : '')),
                item.planning.map(item => (item.id == movie_id ? is_planning = true : '')),
                item.dropped.map(item => (item.id == movie_id ? is_dropped = true : ''))
        ))}

    }

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setValue({})
        setOpen(false);
    };
    const handle = (event) => {
        const movie_url = props.movie.url;
        let cabinet_id = 0;
        user_cabinet.map(item => (
            cabinet_id = item.id
        ))
        {
            let flag = false
            let type
            if (is_watching && is_watching !== event) {
                type = 'watching'
                console.log('delete', type)
                flag = true
            } else if (is_planning && is_planning !== event) {
                type = 'planning'
                console.log('delete', type)
                flag = true
            } else if (is_dropped && is_dropped !== event) {
                type = 'dropped'
                console.log('delete', type)
                flag = true
            } else if (is_completed && is_completed !== event) {
                type = 'completed'
                console.log('delete', type)
                flag = true
            }
            if (flag) {
                flag = false
                const newWatching = {
                    type,
                    movie_url,
                    cabinet_id
                };
                props.deleteChoice(newWatching)

            }
        }


        const type = event

        const newWatching = {
            type,
            movie_url,
            cabinet_id
        };
        props.updateChoice(newWatching)
        setOpen(false);
if (event == 'watching') {
            is_watching = true
            is_completed = false
            is_dropped = false
            is_planning = false

        }
        if (event == 'completed') {
            is_watching = false
            is_completed = true
            is_dropped = false
            is_planning = false
        }
        if (event == 'dropped') {
            is_watching = false
            is_completed = false
            is_dropped = true
            is_planning = false
        }
        if (event == 'planning') {
            is_watching = false
            is_completed = false
            is_dropped = false
            is_planning = true
        }


        setValue({})
        console.log("setValue")



    };



    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <div id={"reload"} className={classes.root}>
            {check()}
            <div>
                <Button

                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                >
                    Toggle Menu Grow
                </Button>
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({TransitionProps, placement}) => (
                        <Grow
                            {...TransitionProps}
                            style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                        <MenuItem  onClick={() => handle('watching')}>
                                            {is_watching ? <DoneIcon/> : ''}
                                            watching
                                        </MenuItem>
                                        <MenuItem onClick={() => handle('completed')}>
                                            {is_completed ? <DoneIcon/> : ''}
                                            completed
                                        </MenuItem>
                                        <MenuItem onClick={() => handle('planning')}>
                                            {is_planning ? <DoneIcon/> : ''}
                                            planning
                                        </MenuItem>
                                        <MenuItem onClick={() => handle('dropped')}>
                                            {is_dropped ? <DoneIcon/> : ''}
                                            dropped
                                        </MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        </div>
    );
}