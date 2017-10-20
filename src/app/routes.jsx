import React from 'react';
import { Router , Route, IndexRoute, hashHistory} from 'react-router';
import { Root } from './root';
import { Activity } from './pages/activity';
import { Allocation } from './pages/allocation';
import { TeamMember } from './pages/teammember';
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
                    <Route path="/activity" component={Activity} />
                    <Route path="/teammember" component={TeamMember} />
                    <Route path="/charts" component={Charts} />
                    <Route path="/allocation" component={Allocation} />
                </Route>
            </Router>
        );
    }
}