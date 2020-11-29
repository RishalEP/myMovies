import React, { Component } from 'react';
import Moviecard from '../../../components/Moviecard/Moviecard'
import { connect } from 'react-redux';
import getCall from '../../../apiService'
import * as actionTypes from '../../../store/actions';
import { Container } from '@material-ui/core';


class Movies extends Component {

    constructor(props) {
        super(props);
      
        this.state = {
          myMovies:[]
        };
      }

    getMovieInfo = async(id) => {
        let query = 'i='+id
        const results = await getCall(query)
        if(results.status === 200){
            if(results.data.Response === "True"){  
                console.log("RESULT",results.data)              
                return results.data
            }
            else{
                return null
            }
        }
        else{
            return null
        }
        
    }

    async componentDidMount(){
        await this.getMovie(this.props.myWatchlist)
    }

    async omponentDidUpdate(prevProps) {
        if (prevProps.text !== this.props.text) {
          await this.getMovie(this.props.myWatchlist)  ;
        }
      }

    getMovie = async(myWatchlist) => {
        const getData = async () => {
            return Promise.all(myWatchlist.map(id => this.getMovieInfo(id)))
        }
        getData().then(data => {
                this.setState({myMovies:data})
        })
    }

    
    render () {

      return (
            <Container style={{ display:"flex","flex-direction": "row", "flex-wrap": "wrap", justifyContent: "center",
                alignItems: "center"}}>
                {this.state.myMovies.length ? (this.state.myMovies.map(movie =>
                            <Moviecard movie={movie} key={movie.imdbID}/>
                        )) : <h3>No Movies In WatchList</h3>
                        
                    }
            </Container>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddMovie: (id) => dispatch({type: actionTypes.ADD_MOVIE, movieId:id}),
        onRemoveMovie: (id) => dispatch({type: actionTypes.REMOVE_MOVIE, movieId:id})
    }
};

const mapStateToProps = state => {
    return {
        myWatchlist: state.myWatchlist
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Movies);;