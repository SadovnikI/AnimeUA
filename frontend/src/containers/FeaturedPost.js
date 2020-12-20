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
        maxHeight: 240
    },
    content: {
        justifyContent: "center",
        width: 220,
    },
    cover: {
        flex: '0 0 auto',
        width: 180,
        height: 240,
    },
    fadeout : {
        position: "absolute",
        top: 0,
        width: "100%",
        margin: 0,
        padding: '60px 0',
        backgroundImage: 'linear-gradient(to bottom, transparent, white)'
    },
    section: {
        position: "relative",
    }
}));

export default function FeaturedPost(props) {
    const theme = useTheme();
    const classes = useStyles();
    const {post} = props;

    return (
        <Grid item xs={6} md={4}>
            <CardActionArea component="a" href={`home/${post.url}`}>
                <Card className={classes.root}>
                    <CardMedia
                        className={classes.cover}
                        image={post.poster}
                        title="Live from space album cover"
                    />
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            <Typography component="h6" variant="h6" noWrap>
                                {post.title}
                            </Typography>

                            <Box component="fieldset" borderColor="transparent">
                                <Rating size="small" value={post.rating / 2} precision={0.5} readOnly/>
                                <br/>
                                <Typography variant="subtitle3" color="textSecondary">
                                    {post.genres.slice(0, 4).join(', ')}
                                </Typography>
                                <br/>
                                <Typography variant="subtitle3" color="textSecondary">
                                    Year: {post.year}
                                </Typography>
                            </Box>
                            <div className={classes.section}>
                            <Typography variant="body2">
                                {post.description}
                            </Typography>
                            <p className={classes.fadeout}></p>
                            </div>
                        </CardContent>
                    </div>
                </Card>
            </CardActionArea>
        </Grid>
    );
}

