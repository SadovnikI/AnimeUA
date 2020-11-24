import React from 'react';
import axios from 'axios';
import { Card } from 'antd';

class EpisodeDetail extends React.Component{
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
        const episodeID=this.props.match.params.episodeID;
        let Episode = String(this.state.movie.video_urls).split(",");

        return(
            <tbody>
                <a href={`/${movieID}`}>Return to list</a>
                <Card>
                     <video src={Episode[episodeID]} controls/>
                </Card>
            </tbody>
        )
    }
}
export default EpisodeDetail;