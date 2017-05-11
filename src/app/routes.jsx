import React from 'react';
import { Router , Route, IndexRoute, hashHistory} from 'react-router';
import { Root } from './root';
import { Activities } from './pages/activities';
import { Assignments } from './pages/assignments';
import { Team } from './pages/team';
import { Charts } from './pages/charts';

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
                    <Route path="/activities" component={Activities} />
                    <Route path="/team" component={Team} />
                    <Route path="/charts" component={Charts} />
                    <Route path="/assignments" component={Assignments} />
                </Route>
            </Router>
        );
    }
}