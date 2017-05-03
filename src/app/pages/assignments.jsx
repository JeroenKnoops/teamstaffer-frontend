import React from 'react';
import axios from 'axios';

const ActivityRow = (props) => (
    <tr>
        <td>{props.activityName}</td>
        <td>{props.projectNumber}</td>
        <td>{props.domain}</td>
        <td>{props.phase}</td>
    </tr>
)

const ActivityTable = (props) => (
    <table className={"table table-striped"}>
        <tbody>
        <tr>
            <th>Activity</th>
            <th>ProjectNumber</th>
            <th>Domain</th>
            <th>Phase</th>
        </tr>
        {props.children}
        </tbody>
    </table>
)

const ProductyRow = (props) => (
    <tr>
        <td>{props.activityName}</td>
        <td>{props.projectNumber}</td>
        <td>{props.domain}</td>
        <td style={{backgroundColor: props.phase === 'concept' ? 'red' : 'transparent'}}>{props.phase}</td>
    </tr>
)

const TextInput = (props) => (
    <div className="form-group">
        <label className="control-label col-sm-2" for="activityName">{props.label}:</label>
        <div className="col-sm-10">
            <input type="text" name={props.name} className="form-control" id={props.name}
                   placeholder={props.placeholder} onChange={props.onChange}/>
        </div>
    </div>
)
//
//
// class TextInput extends React.Component{
//     render(){
//         return (
//             <div className="form-group">
//                 <label className="control-label col-sm-2" for="activityName">{props.label}:</label>
//                 <div className="col-sm-10">
//                     <input type="text" name={props.name} className="form-control" id={props.name}
//                            placeholder={props.placeholder} onChange={props.onChange}/>
//                 </div>
//             </div>
//         )
//     }
// }

export class Assignments extends React.Component {
    constructor(props) {
        super(props)
        this.formData = {};
        this.state = {activities: []};
    }

    componentDidMount() {
        this.getActivities();
    }

    handleInputChange(e) {
        let id = e.target.getAttribute('id');
        this.formData[id] = e.target.value;
    }

    handleSubmit(e) {
        e.preventDefault();

        let activities = this.state.activities;

        axios.post('http://localhost:8080/api/staff/activity', this.formData, {timeout: 60000}).then(result => {
            this.getActivities();
        }).catch(error => {
            console.log(error);
        });
    }

    getActivities() {

        axios.get('http://localhost:8080/api/staff/activity').then(result => {
            this.setState({activities: result.data});

        }).catch(error => {
            console.log(error);
        });
    }

    render() {

        // let rows = this.state.activities.map((d, i) => {
        //     return (
        //         <tr key={i}>
        //             <td>{d.activityName}</td>
        //             <td>{d.projectNumber}</td>
        //             <td>{d.domain}</td>
        //             <td>{d.phase}</td>
        //         </tr>
        //     );
        // });


        return (
            <div className="container">
                <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
                    <TextInput
                        label="Activity Name"
                        placeholder="Enter activity name"
                        name="activityName"
                        onChange={this.handleInputChange.bind(this)}
                    />
                    <TextInput
                        label="Project Number"
                        placeholder="Enter project Number"
                        name="projectNumber"
                        onChange={this.handleInputChange.bind(this)}
                    />
                    <TextInput
                        label="Innovation Domain"
                        placeholder="Enter innovation domain"
                        name="domain"
                        onChange={this.handleInputChange.bind(this)}
                    />
                    <TextInput
                        label="Phase"
                        placeholder="Enter activity phase"
                        name="phase"
                        onChange={this.handleInputChange.bind(this)}
                    />
                    <input type="submit" className="btn btn-primary" value="Create activity"/>
                </form>

                <form className="form-horizontal">
                    <br/>
                    <ActivityTable>
                        {this.state.activities.map((activity, index) => (
                            <ProductyRow key={index} {...activity}/>
                        ))}
                    </ActivityTable>
                </form>
            </div>
        );
    }

}