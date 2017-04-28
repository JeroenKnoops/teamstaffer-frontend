import React from 'react';
import { Router } from 'react-router';
import { Menu } from './components/menu';
import axios from 'axios';

export class Root extends React.Component {
        
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div>
                <Menu title="Team Staffer" />
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}