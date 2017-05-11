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
        this.state = {assignments: []};
    }

    componentDidMount() {
        this.getAssignments();
    }

    handleInputChange(e) {
        let id = e.target.getAttribute('id');
        this.formData[id] = e.target.value;
    }

    handleSubmit(e) {
        e.preventDefault();

        let assignments = this.state.assignments;

        axios.post('http://localhost:8080/api/assignment', this.formData, {timeout: 60000}).then(result => {
            this.getAssignments();
        }).catch(error => {
            console.log(error);
        });
    }

    getAssignments() {

        axios.get('http://localhost:8080/api/assignment').then(result => {
            this.setState({assignments: result.data});

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
                        label="User Name"
                        placeholder="Enter user name"
                        name="userName"
                        onChange={this.handleInputChange.bind(this)}
                    />
                    <TextInput
                        label="Activity Name"
                        placeholder="Enter activity name"
                        name="activiyName"
                        onChange={this.handleInputChange.bind(this)}
                    />
                    <TextInput
                        label="Commitment"
                        placeholder="exploration, advance development, development"
                        name="commitment"
                        onChange={this.handleInputChange.bind(this)}
                    />
                    <TextInput
                        label="FTE allocation"
                        placeholder="Enter allocation"
                        name="fteAssignment"
                        onChange={this.handleInputChange.bind(this)}
                    />
                    <TextInput
                        label="Start date"
                        placeholder="Enter start date"
                        name="startAssignment"
                        onChange={this.handleInputChange.bind(this)}
                    />
                    <TextInput
                        label="End date"
                        placeholder="Enter end date"
                        name="endAssignment"
                        onChange={this.handleInputChange.bind(this)}
                    />
                    <TextInput
                        label="Change date"
                        placeholder="Enter change date"
                        name="changeDate"
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