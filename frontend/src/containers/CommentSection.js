import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Moment from 'moment';
import {
    List,
    ListItem,
    Divider,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Typography
} from "@material-ui/core";
import Faker from "faker";
import Box from "@material-ui/core/Box";


const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        backgroundColor: theme.palette.background.paper
    },
    fonts: {
        fontWeight: "bold"
    },
    inline: {
        display: "inline"
    }
}));

const Comments = ({comments}) => {
    const classes = useStyles();
    return (
        <List className={classes.root}>
            {comments.map(comment => {
                // console.log("Comment", comment);
                return (
                    <React.Fragment key={comment.id}>
                        <ListItem key={comment.id} alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="avatar" src={Faker.image.avatar()}/>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Box display="flex">
                                        <Typography className={classes.fonts}>
                                            {comment.user_id.username}
                                        </Typography>
                                        <div style={{ marginLeft: "auto" }}>
                                            {Moment(comment.date).format('dd, mm, yyyy',)}
                                        </div>
                                    </Box>


                                }
                                secondary={
                                    <div>
                                        {comment.text}
                                    </div>

                                }
                            />
                        </ListItem>
                        <Divider/>
                    </React.Fragment>
                );
            })}
        </List>
    );
};

export default Comments;

