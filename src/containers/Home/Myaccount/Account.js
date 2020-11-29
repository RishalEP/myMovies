import React, { Component } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
    Container , Button, Row ,Col
} from "react-bootstrap";
import PhoneInput from '../../../components/PhoneInput/PhoneInput'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import swal from '@sweetalert/with-react';

class Account extends Component {

    constructor(props) {
        super(props);
      
        this.state = {
          phone:'',
          country:'India',
          region:'Kerala',
          show:true
        };
      }
      
    handleOnChangePhone = value => {
        this.setState({ phone: value })
      };

    handleChangeCountry = value => {
        this.setState({country:value})
    }

    handleChangeState = value => {
        this.setState({region:value})
    }

    toggleShow = () => {
        return(!this.state.show)
    }

    handleSubmit = fields => {
        
        if(this.state.phone !== ''){
            swal({
                content: <div>
                    <h3>Name : {fields.firstname +' '+ fields.lastname} </h3>
                    <h3>Address: {fields.address} </h3>
                    <h3>Date of Birth: {fields.date} </h3>
                    <h3>Phone: {this.state.phone} </h3>
                    <h3>Country: {this.state.country} </h3>
                    <h3>State: {this.state.region} </h3>
                </div>,
                icon: "success",
                title: "Successfully Updated",
              });
        }
        else{
            swal({
                title: "Phone Number Missing",
                text: "Enter a Valid Phone Number",
                icon: "error"
              });
        }

        
    }

    render () {
        return (
            <Container >
            
            <h1>
                My Account
            </h1>

            <Formik
                initialValues={{
                        firstname: '',
                        lastname:'',
                        address:'',
                        date:''
                    }}
                validationSchema={Yup.object().shape({
                    firstname:Yup.string()
                        .matches('^(?=.*[A-Za-z ])','Alphabets Only')
                        .required('Firstname is mandatory'),
                    lastname:Yup.string()
                        .matches('^(?=.*[A-Za-z ])','Alphabets Only')
                        .required('Lastname is mandatory'),
                    address: Yup.string(),
                    date:Yup.date()
                         .required('Date of Birth is Mandatory')

                })}
                onSubmit={fields => {
                    // this.login(fields)
                    console.log("Fieldsss",fields)
                    this.handleSubmit(fields)
                    
                }}>{({ errors, status, touched }) => (
                  <Form >
                      <Row>
                        <Col>
                            <div className="form-group">
                            <label htmlFor="firstname">FirstName</label>
                            <Field name="firstname" type="text" className={'form-control' + (errors.firstname && touched.firstname ? ' is-invalid' : '')} />
                            <ErrorMessage name="firstname" component="div" className="invalid-feedback" />
                        </div>
                        </Col>
                        <Col>
                            <div className="form-group">
                                <label htmlFor="lastname">LastName</label>
                                <Field name="lastname" type="text" className={'form-control' + (errors.lastname && touched.lastname ? ' is-invalid' : '')} />
                                <ErrorMessage name="lastname" component="div" className="invalid-feedback" />
                            </div>
                        </Col>
                     </Row>

                     <Row>
                         <Col>
                            <div className="form-group">
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <Field name="phoneNumber" type="text" component={PhoneInput} handleOnChange = {this.handleOnChangePhone}
                                    phone = {this.state.phone} className={'form-control' + (errors.phoneNumber && touched.phoneNumber ? ' is-invalid' : '')} />
                                <ErrorMessage name="phoneNumber" component="div" className="invalid-feedback" />
                            </div>
                         </Col>
                         <Col>
                            <div className="form-group">
                                <label htmlFor="date">Date of Birth</label>
                                <Field name="date" type="date" className={'form-control' + (errors.lastname && touched.lastname ? ' is-invalid' : '')} />
                                <ErrorMessage name="date" component="div" className="invalid-feedback" />
                            </div>
                        </Col>
                         
                     </Row>

                     <Row>
                         <Col>
                            <div className="form-group">
                                <label htmlFor="country">Country</label>
                                <br />
                                <CountryDropdown name="country" value={this.state.country}
				                    onChange={this.handleChangeCountry} />
                                <ErrorMessage name="country" component="div" className="invalid-feedback" />
                            </div>
                         </Col>
                         <Col>
                            <div className="form-group">
                            <label htmlFor="state">State</label>  
                            <br />
        
                            <RegionDropdown name="region" country={this.state.country} value={this.state.region}
	                            onChange={this.handleChangeState} />
                                <ErrorMessage name="region" component="div" className="invalid-feedback" />
                            </div>
                         </Col>
                     </Row>
                     <Row>
                        <Col>
                            <div className="form-group">
                                <label htmlFor="address">Address</label>
                                <Field name="address" type="text" className={'form-control' + (errors.address && touched.address ? ' is-invalid' : '')} />
                                <ErrorMessage name="address" component="div" className="invalid-feedback" />
                            </div>
                         </Col>
                     </Row>

                      <div className="form-group">
                        <Button type="submit" >
                          Submit
                        </Button>
                      </div>
                  </Form>
              )}
            </Formik>
        </Container>
        );
    }
}

export default Account