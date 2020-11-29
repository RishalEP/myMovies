import React, { Component } from 'react';
// import axios from 'axios';
import { Route, Switch} from 'react-router-dom';

import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import routes from '../../routes'

class Home extends Component {

    constructor(props) {
        super(props);
      
        this.state = {
          user:{name:'',email:''}
        };
      }
    
    componentDidMount(){
        const user =  localStorage.getItem("user")
        if (user)
            this.setState({user:JSON.parse(user)})
    }

    logout = () => {
        localStorage.clear()
        this.props.history.replace('/')
    }

    render () {
        const routeComponents = routes.map((route) => <Route exact path={route.layout+route.path} component={route.component} name={route.name} key={route.key} />);
        return (
            <div>
                
                <Navbar 
                  user={this.state.user}
                  routes={routes}
                  logout={this.logout}
                  />  
                  <Switch>
                    {routeComponents}
                 </Switch> 
            </div>
        );
    }
}

export default Home;