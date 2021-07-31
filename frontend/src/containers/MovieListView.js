import React from 'react'
import axios from 'axios';
import FeaturedPost from "./FeaturedPost";
import Grid from "@material-ui/core/Grid";


class MovieList extends React.Component {
    state = {
        movies: []
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api')
            .then(res => {
                this.setState({
                    movies: res.data
                });
                console.log(res.data);
            })
    }

    render() {

        return (

            <Grid container spacing={2}>
                {this.state.movies.map((post) => (
                    <FeaturedPost post={post}/>
                ))}
            </Grid>

        )
    }
}


export default MovieList;