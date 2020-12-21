import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
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
import Paper from "@material-ui/core/Paper";


const useStyles = makeStyles((theme) => ({
    main: {
        background: 'linear-gradient(-45deg, #EE7752, #E73C7E, #23A6D5, #23D5AB)',
        backgroundSize: '400% 400%',
        animation: '$gradient 15s ease infinite'
    },
    movieBox: {
        padding: theme.spacing(2),
        background: 'rgba(255,255,255,0.65)',
        marginBottom: theme.spacing(3)
    },
    '@keyframes gradient': {
        '0%': {
            backgroundPosition: '0% 50%'
        },
        '50%': {
            backgroundPosition: '100% 50%'
        },
        '100%': {
            backgroundPosition: '0% 50%'
        },
    },
}));


const mainFeaturedPost = {
    title: 'Дивись Аніме українською',
    description:
        "Відкрий для себе сотні нових тайтлів разом з Анімє-UA.",
    image: 'https://funart.pro/uploads/posts/2020-03/1584644653_21-p-foni-s-tyan-iz-anime-55.png',
    imgText: 'main image dedddscription',

};

const posts = [];


export default function Home() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <div className={classes.main}>
                <CssBaseline/>
                <Header/>
                <Container maxWidth="lg">
                    <main>
                        <MainFeaturedPost post={mainFeaturedPost} className={classes.mainGrid}/>
                        <Paper elevation={0} className={classes.movieBox}>
                            <MovieList/>
                        </Paper>
                    </main>
                </Container>
                <Footer title="Про нас" description="Усі права захищені Богом!"/>
            </div>
        </React.Fragment>
    );
}