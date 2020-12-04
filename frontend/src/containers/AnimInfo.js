import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import Footer from './Footer';
import axios from "axios";
import MovieList from "./MovieListView";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import MovieDetail from "./MovieDetailView";
import CardActionArea from "@material-ui/core/CardActionArea";
import Card from "@material-ui/core/Card";
import Hidden from "@material-ui/core/Hidden";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import PropTypes from "prop-types";





const useStyles = makeStyles((theme) => ({
    card: {
    display: 'flex',
    width:'100%',
    justifyContent:"center",
    boxShadow:'none',
        backgroundColor:'inherit'

    },
      cardDetails: {

        //flex: 1,
       // backgroundColor: 'rgba(256, 256, 256, 0.7)',
          width: '40%',
        height: 340,
        marginLeft:50,
          display:"flex",
          alignItems:"center"

      },
      cardMedia: {

        width: '33%',
        height: 340

      },
}));



const posts = [];


export default function AnimeInfo(props) {
  const classes = useStyles();
  const { post } = props;

  return (

 <Hidden xsDown>
        <Card className={classes.card}>


            <CardMedia className={classes.cardMedia} image={post.poster} />


            <div className={classes.cardDetails}>
            <CardContent>
              <Typography  component="h2" variant="h6">
                {post.title}
              </Typography>
                <Typography  component="h3" variant="h8 ">
                    {post.description}
              </Typography>

            </CardContent>
             </div>

        </Card>
 </Hidden>

  );
}
FeaturedPost.propTypes = {
  post: PropTypes.object,
};