import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import yellow from "@material-ui/core/colors/yellow";

const useStyles = makeStyles({
  card: {
    display: 'flex',
    flexDirection: "column",
    alignItems:"center",
    justifyContent:"center"
  },
  cardDetails: {

    flex: 1,
    backgroundColor: 'rgba(256, 256, 256, 0.7)',
    borderRadius:50,


  },
  cardMedia: {

    width: '100%',
    height: 340

  },
});

export default function FeaturedPost(props) {
  const classes = useStyles();
  const { post } = props;

  return (
    <Grid item xs={6} md={3}>
      <CardActionArea component="a" href={`home/${post.id}/0`}>
        <Card className={classes.card}>

          <Hidden xsDown>
            <CardMedia className={classes.cardMedia} image={post.poster} />

          </Hidden>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography  component="h3" variant="h6">
                {post.title}

              </Typography>

              {post.url}


            </CardContent>
          </div>
        </Card>
      </CardActionArea>
    </Grid>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.object,
};