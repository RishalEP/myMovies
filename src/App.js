import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import {ProtectedRoute} from './ProtectedRoute'
import { BrowserRouter} from "react-router-dom";

import Home from './containers/Home/Home';
import Login from './containers/Login/Login';


import "./styles.css";


class App extends Component {

  render () {
    return (
      <div className="App">
        <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Login} /> 
          <ProtectedRoute path='/app' component={Home} />
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
        </BrowserRouter>
      </div>
        
   );
  }
}

export default App;
