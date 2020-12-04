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




const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));



const mainFeaturedPost = {
  title: 'Дивись Аніме українською',
  description:
    "Відкрий для себе сотні нових тайтлів разом з Анімє-UA.",
  image: 'https://funart.pro/uploads/posts/2020-03/1584644653_21-p-foni-s-tyan-iz-anime-55.png',
  imgText: 'main image dedddscription',
  linkText: 'Читати далі…',
};

const posts = [];



export default function Home() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <MovieList />

        </main>
      </Container>
      <Footer title="Про нас" description="Усі права захищені Богом!"/>
    </React.Fragment>
  );
}