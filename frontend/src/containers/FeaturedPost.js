import React from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import CardActionArea from "@material-ui/core/CardActionArea";
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
        justifyContent: "center",
        width: 220,
    },
    cover: {
        width: 180,
        height: 240

    },
}));

export default function FeaturedPost(props) {
    const theme = useTheme();
    const classes = useStyles();
    const {post} = props;

    return (
        <Grid item xs={6} md={4}>
            <CardActionArea component="a" href={`home/${post.id}/1`}>
                <Card className={classes.root}>
                    <CardMedia
                        className={classes.cover}
                        image={post.poster}
                        title="Live from space album cover"
                    />
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            <Typography component="h5" variant="h5">
                                {post.title}
                            </Typography>

                            <Box component="fieldset" mb={3} borderColor="transparent">
                                <Rating size="small" value={post.rating} precision={0.5} readOnly/>
                                <br/>
                                <Typography variant="subtitle3" color="textSecondary">
                                    Жанр, Жанр, Жанр
                                </Typography>
                            </Box>
                            <Typography variant="subtitle3" color="text">
                                Діскріпшн який я не можу витягнути
                            </Typography>
                        </CardContent>
                    </div>
                </Card>
            </CardActionArea>
        </Grid>
    );
}

