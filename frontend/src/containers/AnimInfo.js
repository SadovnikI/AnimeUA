import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FeaturedPost from './FeaturedPost';
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Hidden from "@material-ui/core/Hidden";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Comments from "./CommentSection";





const useStyles = makeStyles((theme) => ({
    card: {
    display: 'flex',
        flexWrap:'wrap',
    width:'100%',
    justifyContent:'center',

    boxShadow:'none',
        backgroundColor:'inherit',
        marginTop:50,
        marginBottom:50,


    },
      cardDetails: {

          display:'flex',
          flexWrap:'wrap',

          justifyContent:'center',
        //flex: 1,
        backgroundColor: '#e0e0e0',
          width: 1230,
        height: "100%",
           paddingTop:20,




      },
      cardMedia: {marginLeft:20,
          marginTop:20,
          marginRight:25,
        borderRadius:'5px',
        width: 190,
        height: 200,
            display: 'flex',
        flexWrap:'wrap',

      },
}));



const posts = [];


export default function AnimeInfo(props) {
  const classes = useStyles();
  const { post } = props;
let Genre = String(post.genres).split(",");

  return (


 <Hidden xsDown>
        <Card className={classes.card}>

            <div className={classes.cardDetails}>

                      <CardMedia className={classes.cardMedia} image={post.poster} />
            <CardContent style={{display:'flex',flexDirection:'column', alignContent:'flex-end',}}>
              <Typography  component="h2" variant="h5">
                {post.title}
              </Typography>

                 <Typography  component="h3" variant="h8 ">
                     <span style={{color:'grey'}}>країна:</span> {post.country}
              </Typography>
                     <Typography  component="h3" variant="h8 ">
                    <span style={{color:'grey'}}> рік: </span>{post.year}
              </Typography>
                <Typography  component="h3" variant="h8 ">
                   <span style={{color:'grey'}}> рейтинг:</span> {post.rating}
              </Typography>
                <Typography  component="h3" variant="h8 ">
                   <span style={{color:'grey'}}> Жанр:</span> {Genre.join(", ")}
              </Typography>

                    <Typography  style={{width:450,display:'flex',flexWrap:'wrap'}} component="h3" variant="h8 ">
                        <span style={{color:'grey'}}>  опис:</span>
                      <p  style={{fontSize:15, marginBottom:10}}>{post.description}</p>
              </Typography>


            </CardContent>
                <div style={{width:800, marginTop:50}}>

                    <video background-color={'black'} margin-top={'80px'}  width={'800px'} src={props.episodeurl} controls/>
                <Grid container container  style={{ marginBottom: 50 }} justify="center" >
                    <div style={{  height:'100%',  width:400 }}>
                        {props.rows}
                    </div>
                </Grid>
                    <Comments comments={props.comments}/>
                </div>
            </div>





        </Card>
 </Hidden>

  );
}
FeaturedPost.propTypes = {
  post: PropTypes.object,
};