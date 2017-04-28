import React from 'react';
import { Router , Route, IndexRoute, hashHistory} from 'react-router';
import { Root } from './root';
import { Home } from './pages/home';
import { Team } from './pages/team';

export class Routes extends React.Component {
    

    
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <Router history={hashHistory} >
                <Route router={Router} path="/" component={Root} >
                    <IndexRoute component={Home} />
                    <Route path="/team" component={Team} />
                </Route>
            </Router>
        );
    }
}