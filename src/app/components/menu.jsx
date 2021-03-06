import React from 'react';
import {Nav, Navbar, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import { hashHistory } from 'react-router';

export class Menu extends React.Component {
    constructor(props) {
        super(props);
    }

    hrefClick(e) {
        let href = e.target.getAttribute('href');

        if(hashHistory.getCurrentLocation().pathname != href);
            hashHistory.push(href);
    }

    render() {
        return (
              <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                <Navbar.Brand >
                    <div>{this.props.title}</div>
                </Navbar.Brand>
                <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                <Nav>
                    <NavItem eventKey={1} onClick={this.hrefClick.bind(this)} href="/activity">Activities</NavItem>
                    <NavItem eventKey={2} onClick={this.hrefClick.bind(this)} href="/teammember">Team Members</NavItem>
                    <NavItem eventKey={3} onClick={this.hrefClick.bind(this)} href="/allocation">Allocations</NavItem>
                    <NavItem eventKey={4} onClick={this.hrefClick.bind(this)} href="/charts">Charts</NavItem>

                </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}