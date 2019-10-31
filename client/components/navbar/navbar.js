import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

import { Link } from 'react-router-dom'

import classNames from 'classnames'

export default class NavBar extends React.Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <Navbar color="dark" dark expand="false">
        <NavbarBrand tag={Link} to="/">
          <img src="https://www.ciena.com/includes/prx-logo.svg" /> CENI
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/performance-status" onClick={this.toggle}>PERFORMANCE-STATUS</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/network-insight" onClick={this.toggle}>NETWORK INSIGHTS</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/performance-status" onClick={this.toggle}>ALARMS AND FAULTS</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/performance-status" onClick={this.toggle}>ML MODELS</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/performance-status" onClick={this.toggle}>CORELIGHT SENSOR</NavLink>
            </NavItem>
            <NavItem>
              <NavLink target="_blank" href="http://10.181.39.1" onClick={this.toggle}>BP-ANALYTICS</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}
