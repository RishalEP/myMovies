
import React, { Component } from "react";
import { Navbar,Nav, Button} from "react-bootstrap";
import { Link } from 'react-router-dom';


class Header extends Component {
  constructor(props) {
    super(props);
    this.mobileSidebarToggle = this.mobileSidebarToggle.bind(this);
    this.state = {
      sidebarExists: false
    };
  }
  mobileSidebarToggle(e) {
    if (this.state.sidebarExists === false) {
      this.setState({
        sidebarExists: true
      });
    }
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function() {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  }
  render() {
   const navComponents = this.props.routes.map((route) =>  <Nav.Link as={Link} to={route.layout+route.path} >{route.name}</Nav.Link>);
  //<Link to={route.layout+route.path}>{route.name}</Link>) 
  // <Nav.Link href={route.layout+route.path} >{route.name}</Nav.Link>);
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
             <Navbar.Brand >{this.props.user.name} </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    {navComponents}
                </Nav>
                <Nav>
                    {/* <Button size='lg' disabled={true}>{this.props.user.name}</Button> */}
                    <Button size='lg' onClick={this.props.logout}>Log Out</Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
  }
}

export default Header;
