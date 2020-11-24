import React from 'react';
import axios from 'axios';
import but from '../butons.js'
import { Card } from 'antd';

class SeriaDetail extends React.Component{
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
const seriaID=this.props.match.params.seriaID;
var myString = String(this.state.movie.video_urls);
var Seria = new Array();
Seria = myString.split(",");
var numbs = Seria.length;
        var numb=0;

        return(

            <Card>

                 <video src={Seria[seriaID]} width="750" height="480" controls>
                </video>
                <p>{seriaID}</p>
            </Card>
        )
    }
}
export default SeriaDetail;