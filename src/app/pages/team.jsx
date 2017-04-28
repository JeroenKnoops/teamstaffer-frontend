import React from 'react';
import axios from 'axios';

export class Team extends React.Component {
    constructor(props) {
        super(props)
        this.state = {members: []}
    }

componentDidMount() {
    this.getSurveyList();
}

getSurveyList() {
    axios.get('http://localhost:8080/api/staff/member').then(result =>{
        this.setState({members: result.data});
    });
    }

render() {

        let members = this.state.members.map((d, i) =>{   
                return (
                    <div key={i}>{d.name} {d.surName}</div>
                )
        });


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12"><h2>Team</h2></div>

                {members}
            </div>
        </div>
    );
}

}