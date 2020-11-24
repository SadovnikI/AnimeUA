import React from 'react';
import axios from 'axios';


class MovieDetail extends React.Component{
    state={
        movie: {}
    }

    componentDidMount() {
    const movieID=this.props.match.params.movieID;

        axios.get(`http://127.0.0.1:8000/api/${movieID}`)
            .then(res=> {
                this.setState({
                    movie: res.data
                });
            })

    }

    render(){
        const movieID=this.props.match.params.movieID;
        let Episode = String(this.state.movie.video_urls).split(",");
        var rows = [];
        for (let i = 0; i <Episode.length ; i++) {
            rows.push(<a href={`/${movieID}/${i}`}>Episode {i+1}: {"(Чекаю на імена епізодів)"}</a>,<div/>);
        }

        return (
            <tbody>{rows}</tbody>
        );

    }
}

export default MovieDetail;