import React, { Component } from 'react';
import {Card,ListGroup,ListGroupItem} from 'react-bootstrap';

class Moviecard extends Component {

  render() {
    return (
        
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={this.props.movie.Poster} />
        <Card.Body>
        <Card.Title >{this.props.movie.Title}</Card.Title>
          <Card.Text>
            {this.props.movie.Plot}
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
            <ListGroupItem>{this.props.movie.Language}</ListGroupItem>
            <ListGroupItem>{this.props.movie.Director}</ListGroupItem>
            <ListGroupItem>{this.props.movie.Released}</ListGroupItem>
            <ListGroupItem>{this.props.movie.imdbRating  + " * "}</ListGroupItem>

        </ListGroup>
      </Card>
      
    );
  }
}

export default Moviecard