import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import FeaturedPost from './FeaturedPost';
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Hidden from "@material-ui/core/Hidden";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Comments from "./CommentSection";
import Rating from "@material-ui/lab/Rating";
import Media from 'react-media';
import CustomizedAddMenu from './DropDownChoice';
import UserForDrop from "./UserForDrop";
import MenuListComposition from "./DropDownChoice";
import Watching from "./Watching";


const useStyles = makeStyles((theme) => ({
    card: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        justifyContent: 'center',

        boxShadow: 'none',
        backgroundColor: 'inherit',
        marginTop: 50,
        marginBottom: 50,


    },
    cardDetails: {

        display: 'flex',
        flexWrap: 'wrap',
        marginLeft: 30,
        justifyContent: 'center',
        //flex: 1,
        lineHeight:2,
        width: 1030,
        height: "100%",
        paddingTop: 20,
        background: 'rgba(255,255,255,0.65)',
        borderRadius: '5px',


    },
    cardMedia: {
        marginLeft: 50,
        backgroundSize:'cover',
        marginRight: 10,
        borderRadius: '5px',
        width: 200,
        height: 280,
        display: 'flex',
        flexWrap: 'wrap',

    },
}));


const posts = [];


export default function AnimeInfo(props) {
    const classes = useStyles();
    const {post, flag} = props;
    let Genre = String(post.genres).split(",");

    return (
        <Hidden xsDown>
            <Card className={classes.card}>
                <div className={classes.cardDetails}>


                    <CardContent style={{
                        display: 'flex',
                        alignContent: 'flex-end',
                        justifyItems: 'space-between',
                        flexWrap: 'wrap'
                    }}>
                        <Media query={{minWidth: 1100}}>
                            {matches =>
                                matches ? (
                                    <div style={{
                                        width: 600,
                                        height: 'inherit',
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}>

                                        <Typography style={{fontWeight: '600'}} component="h4" variant="h5">
                                            {post.title}
                                        </Typography>
                                        {flag?<Watching updateChoice={props.updateChoice} movie={post}/>:''}
                                        <br/>
                                        <br/>
                                        <br/>

                                        <Typography component="h3" variant="h8 ">
                                            <span style={{
                                                color: 'black',
                                                fontWeight: '600'
                                            }}>Країна:</span> <span style={{
                                                color: 'black',
                                                fontWeight: '400'
                                        }}>{post.country}</span>
                                        </Typography>
                                        <Typography component="h3" variant="h8 ">
                                            <span style={{color: 'black', fontWeight: '600'}}> Рік: </span><span style={{
                                                color: 'black',
                                                fontWeight: '400'
                                        }}>{post.year}</span>
                                        </Typography>
                                        <Typography component="h3" variant="h8 ">
                                            <span style={{
                                                color: 'black',
                                                fontWeight: '600'
                                            }}> Жанр:</span> <span style={{
                                                color: 'black',
                                                fontWeight: '400'
                                        }}>{Genre.join(", ")}</span>
                                        </Typography>
                                        <Typography component="h3" variant="h8 ">
                                            <span style={{
                                                color: 'black',
                                                fontWeight: '600'
                                            }}> Рейтинг:</span><span style={{
                                                color: 'black',
                                                fontWeight: '400'
                                        }}> {post.rating}</span>
                                            <Rating style={{marginLeft: '5px', marginTop: '3px'}} size="small" value={post.rating / 2}
                                                    precision={0.5} readOnly/>
                                        </Typography>
                                        <br/>
                                         <br/>

                                        <Typography style={{width: '850px', display: 'flex', flexWrap: 'wrap'}}
                                                    component="h3" variant="h8 ">
                                            <p style={{fontSize: 15, marginBottom:30, lineHeight:1.5}}> <span style={{
                                                color: 'black',
                                                fontWeight: '400'
                                            }}>{post.description}</span></p>
                                        </Typography>
                                    </div>
                                ) : (
                                    <Media query={{minWidth: 600}}>
                                        {matches =>
                                            matches ? (
                                                <div style={{
                                                    width: 300,
                                                    height: 'inherit',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    marginRight:50
                                                }}>

                                                    <Typography component="h2" variant="h5">
                                                          {String(post.title).slice(0, 20)}
                                                    </Typography>

                                                    <Typography component="h3" variant="h8 ">
                                                        <span style={{   color: 'black',
                                                                fontWeight: '600'}}>країна:</span>
                                                        <span style={{
                                                                                color: 'black',
                                                                                fontWeight: '400'
                                                        }}>{post.country}</span>
                                                    </Typography>
                                                    <Typography component="h3" variant="h8 ">
                                                        <span style={{   color: 'black',
                                                                fontWeight: '600'}}> рік: </span>
                                                        <span style={{
                                                                            color: 'black',
                                                                            fontWeight: '400'
                                                        }}>{post.year}</span>
                                                    </Typography>
                                                    <Typography component="h3" variant="h8 ">
                                                        <span style={{   color: 'black',
                                                                fontWeight: '600'}}> рейтинг:</span> <span style={{
                                                                color: 'black',
                                                                fontWeight: '400'
                                                    }}>{post.rating}</span>
                                                        <Rating size="small" value={post.rating} precision={0.5}
                                                                readOnly/>
                                                    </Typography>
                                                    <Typography component="h3" variant="h8 ">
                                                            <span
                                                                style={{   color: 'black',
                                                                fontWeight: '600'}}> жанр:</span><span style={{
                                                                                color: 'black',
                                                                                fontWeight: '400'
                                                    }}> {Genre.join(", ")}</span>
                                                    </Typography>
                                                    <br/>
                                                     <br/>
                                                    <Typography
                                                        style={{
                                                            width: '600px',
                                                            display: 'flex',
                                                            flexWrap: 'wrap'
                                                        }}
                                                        component="h3" variant="h8 ">
                                                        <p style={{
                                                            fontSize: 15,
                                                            marginBottom: 10,
                                                            lineHeight:1.5
                                                        }}> <span style={{
                                                color: 'black',
                                                fontWeight: '400'
                                                        }}>{post.description}</span></p>
                                                    </Typography>
                                                </div>) : (
                                                <div style={{
                                                    width: 250,
                                                    height: 'inherit',
                                                    display: 'flex',
                                                    flexDirection: 'column'
                                                }}>

                                                    <Typography component="h2" variant="h5">
                                                          {String(post.title).slice(0, 20)}
                                                    </Typography>

                                                    <Typography component="h3" variant="h8 ">
                                                        <span style={{   color: 'black',
                                                                fontWeight: '600'}}>країна:</span> <span style={{
                                                                        color: 'black',
                                                                        fontWeight: '400'
                                                    }}>{post.country}</span>
                                                    </Typography>
                                                    <Typography component="h3" variant="h8 ">
                                                        <span style={{   color: 'black',
                                                                fontWeight: '600'}}> рік: </span><span style={{
                                                                color: 'black',
                                                                fontWeight: '400'
                                                    }}>{post.year}</span>
                                                    </Typography>
                                                    <Typography component="h3" variant="h8 ">
                                                        <span style={{   color: 'black',
                                                                fontWeight: '600'}}> рейтинг:</span> <span style={{
                                                                        color: 'black',
                                                                        fontWeight: '400'
                                                    }}>{post.rating}</span>
                                                        <Rating size="small" value={post.rating} precision={0.5}
                                                                readOnly/>
                                                    </Typography>
                                                    <Typography component="h3" variant="h8 ">
                                                            <span
                                                                style={{   color: 'black',
                                                                fontWeight: '600'}}> жанр:</span><span style={{
                                                                        color: 'black',
                                                                        fontWeight: '400'
                                                    }}> {Genre.join(", ")}</span>
                                                    </Typography>
                                                    <br/>
                                         <br/>
                                                    <Typography
                                                        style={{
                                                            width: '250px',
                                                            display: 'flex',
                                                            flexWrap: 'wrap'
                                                        }}
                                                        component="h3" variant="h8 ">
                                                        <p style={{
                                                            fontSize: 15,
                                                            marginBottom: 10,
                                                            lineHeight:1.5
                                                        }}> <span style={{
                                                color: 'black',
                                                fontWeight: '400'
                                                        }}>{post.description}</span></p>
                                                    </Typography>
                                                </div>
                                            )}
                                    </Media>
                                )
                            }
                        </Media>
                        <Media query={{minWidth: 1100}}>
                            {matches =>
                                matches ? (
                                        <CardMedia className={classes.cardMedia} image={post.poster}/>) :
                                    (

                                        <CardMedia style={{width: 150, height: 250, marginLeft: 50, marginRight: 0}}
                                                   className={classes.cardMedia} image={post.poster}/>
                                    )
                            }
                        </Media>
                    </CardContent>
                    <Media query={{minWidth: 800}}>
                        {matches =>
                            matches ? (
                                <div style={{width: 800, marginTop: 50,marginRight:50}}>
                                    <Grid container style={{
                                        marginBottom: 10,

                                    }}>
                                        <div style={{height: '100%'}}>
                                            {props.rows}
                                        </div>
                                    </Grid>
                                    <video background-color={'black'} margin-top={'10px'} style={{marginRight:180}} width={'855px'} height={'480px'}
                                           src={props.episodeurl} controls/>
                                    <Comments movie={props.post} comments={props.comments}/>
                                </div>) : (
                                <div style={{width: 500, marginTop: 50}}>

                                    <video background-color={'black'} margin-top={'80px'} margin-right={'80px'} width={'500px'}
                                           src={props.episodeurl} controls/>
                                    <Grid container style={{marginBottom: 50}} justify="center">
                                        <div style={{height: '100%', width: 400}}>
                                            {props.rows}
                                        </div>
                                    </Grid>
                                </div>
                            )}
                    </Media>
                </div>
            </Card>
        </Hidden>
    );
}

FeaturedPost.propTypes = {
    post: PropTypes.object,
};