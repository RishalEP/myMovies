
import React, { Component } from "react";
import {
    Container , Button ,Image
} from "react-bootstrap";
import swal from 'sweetalert';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { validusers } from '../../config/clientConfig'
import logo from "../../assets/img/reactlogo.png";
import { withRouter } from 'react-router-dom';
import auth from '../../Auth'

class Login extends Component {
    login = async (fields) => {
       const userLogin = await validusers.filter(user => {
                return(user.username === fields.email)
      });
      if(userLogin.length){
        if(userLogin[0].password === fields.password){
            const credentials = {
              email:userLogin[0].username,
              name:userLogin[0].name
            }
            localStorage.setItem('user', JSON.stringify(credentials));
            localStorage.setItem('loggedin', true);
            auth.login(() => {
                this.props.history.push("/app");
              });
        }
        else{
            console.log(auth.isAuthenticated())

            swal("Login Failed", "Incorrect Password", "error")
        }
      }
      else{
        swal("Login Failed", "User Not Found", "error")
      }
    }

  render() {
      return (
        <Container >
            
            <h1>
                Login Page

            </h1>

            <Image src={logo} width="400" height="400" rounded />            
            <Formik
                initialValues={{
                    email: 'rishal@gmail.com',
                    password: 'rishal@Test'
                    
                    }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email('Must be a valid mail')
                        .required('Email is required'),
                    password: Yup.string()
                        .min(6, 'Password must be at least 6 characters')
                        .max(12, 'Password could not be more than 12 charecters')
                        .matches('^(?=.*[a-z])','Must have one Lower Case Letter')
                        .matches('^(?=.*[A-Z])','Must have one upper Case Letter')
                        .matches('^(?=.*[@#$%^&+=])','Must have one Special Charecter')
                        .required('Password is required')
                })}
                onSubmit={fields => {
                    this.login(fields)
                }}>{({ errors, status, touched }) => (
                  <Form ncols={["col-md-6","col-md-6"]} >
                      <div className="form-group">
                          <label htmlFor="email">Email</label>
                          <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                          <ErrorMessage name="email" component="div" className="invalid-feedback" />
                      </div>
                      <div className="form-group">
                          <label htmlFor="password">Password</label>
                          <Field name="password" type="text" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                          <ErrorMessage name="password" component="div" className="invalid-feedback" />
                      </div>
                      <div className="form-group">
                        <Button type="submit" >
                          Login
                        </Button>
                      </div>
                  </Form>
              )}
            </Formik>
        </Container>

        

      )
  }
}

export default withRouter(Login);
