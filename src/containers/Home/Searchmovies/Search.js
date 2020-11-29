import React, { Component } from 'react';
import {
    Container , Button, Row ,Col } from "react-bootstrap";
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import getCall from '../../../apiService'
import swal from '@sweetalert/with-react';
import * as actionTypes from '../../../store/actions';
import Table from '../../../components/Table/Table'



class Search extends Component{

    constructor(props) {
        super(props);
      
        this.state = {
          searchResult:[],
          totalPages:1,
          currentPage:0,
          totalResults:0,
          lastSearch:{}
        };
      }

    searchMovies = async (fields) => {
        let query = 's='+fields.movie+'&y='+fields.year+'&page='+(this.state.currentPage+1)
        const results = await getCall(query);
        if(results.status === 200){
            if(results.data.Response === "True"){                
                const totalPages = Math.ceil(results.data.totalResults/10)
                this.setState({searchResult:results.data.Search,
                               lastSearch:fields,totalPages:totalPages ,totalResults:results.data.totalResults})
            }
            else{
                swal({
                    title: results.data.Error,
                    text: "Error Fetching Result",
                    icon: "error"
                  });
                this.setState({searchResult:[],totalPages:1,totalResults:0,currentPage:0,lastSearch:{}})
            }
        }
        else{
            swal({
                title: "Try Again",
                text: "Error Fetching Result",
                icon: "error"
              });
            this.setState({searchResult:[],totalPages:1,totalResults:0,currentPage:0,lastSearch:{}})
        }
    }

    handleChangePage = (event,pageNumber) => {

        if(this.state.currentPage < pageNumber <= this.state.totalPages) {

            this.setState({
                currentPage:pageNumber
                }, () => {
                this.searchMovies(this.state.lastSearch);
            });

        }
        else{
            console.log("Invalid Page Number")
        }
    }
    
    

    render(){
        return (
            <Container >
            <Formik
                initialValues={{
                    movie: '',
                    year: ''
                    
                    }}
                validationSchema={Yup.object().shape({
                    name: Yup.string(),
                    year: Yup.number()
                        .typeError('Must be a valid year')
                        .min(4,'Must be a valid year')
                        .min(4,'Must be a valid year')
                        .integer()
                        .positive()
                })}
                onSubmit={fields => {
                    this.searchMovies(fields)
                }}>{({ errors, status, touched }) => (
              
                  <Form ncols={["col-md-6","col-md-6"]} >

                    <Row>
                        <Col xs lg="5">
                            <div className="form-group">
                                <Field placeholder="Search a movie" name="movie" type="text" className={'form-control' + (errors.movie && touched.movie ? ' is-invalid' : '')} />
                                <ErrorMessage name="movie" component="div" className="invalid-feedback" />
                            </div>
                        </Col>
                        <Col xs lg="5">
                            <div className="form-group">
                                <Field placeholder="Enter a valid Year" name="year" type="text" className={'form-control' + (errors.year && touched.year ? ' is-invalid' : '')} />
                                <ErrorMessage name="year" component="div" className="invalid-feedback" />
                            </div>
                        </Col>
                        <Col xs lg="2">
                            <div className="form-group">
                                <Button type="submit" >
                                    Search
                                </Button>
                        </div>
                        </Col>
                    </Row>
                  </Form>
              )}
            </Formik>
            {this.state.totalResults ? <Table 
                                                movies={this.state.searchResult} 
                                                changePage={this.handleChangePage}
                                                totalResults={this.state.totalResults}
                                                currentPage={this.state.currentPage}
                                                onAdd={this.props.onAddMovie} 
                                                onRemove={this.props.onRemoveMovie}
                                                myWatchlist={this.props.myWatchlist}/> 
                                            : null
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

export default connect(mapStateToProps, mapDispatchToProps)(Search);