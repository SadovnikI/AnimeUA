import React from 'react'
import Movies from "../components/Movie";
import axios from 'axios';


class MovieList extends React.Component{
    state={
        movies: []
    }
    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api')
            .then(res=> {
                this.setState({
                    movies: res.data
                });
                console.log(res.data);
            })
    }

    render(){
        return(
            <Movies data={this.state.movies}/>
        )
    }
}

export default MovieList;