import React from 'react'
import Movies from "../components/Movie";
import axios from 'axios';


const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'https://ant.design',
    title: `ant design part ${i}`,

    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

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