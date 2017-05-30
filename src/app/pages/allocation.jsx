import React from 'react';
import axios from 'axios';

const AllocationsRow = (props) => (
    <tr>
        <td>{props.userName}</td>
        <td>{props.activityName}</td>
        <td>{props.commitment}</td>
        <td>{props.fteAssignment}</td>
        <td>{props.startAssignment}</td>
        <td>{props.endAssignment}</td>
        <td>{props.changeDate}</td>
    </tr>
)

const AllocationsTable = (props) => (
    <table className={"table table-striped"}>
        <tbody>
        <tr>
            <th>User Name</th>
            <th>Activity Name</th>
            <th>Commitment</th>
            <th>FTE allocation</th>
            <th>Start date</th>
            <th>End date</th>
            <th>Change date</th>
        </tr>
        {props.children}
        </tbody>
    </table>
)

const ProductyRow = (props) => (
    <tr>
        <td>{props.userName}</td>
        <td>{props.activityName}</td>
        <td>{props.commitment}</td>
        <td>{props.fteAssignment}</td>
        <td>{props.startAssignment}</td>
        <td>{props.endAssignment}</td>
        <td>{props.changeDate}</td>
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

export class Allocation extends React.Component {
    constructor(props) {
        super(props)
        this.formData = {};
        this.state = {allocations: []};
    }

    componentDidMount() {
        this.getAllocations();
    }

    handleInputChange(e) {
        let id = e.target.getAttribute('id');
        this.formData[id] = e.target.value;
    }

    handleSubmit(e) {
        e.preventDefault();

        let allocations = this.state.allocations;

        axios.post('http://localhost:8080/api/assignment', this.formData, {timeout: 60000}).then(result => {
            this.getAllocations();
        }).catch(error => {
            console.log(error);
        });
    }

    getAllocations() {

        axios.get('http://localhost:8080/api/assignment').then(result => {
            this.setState({allocations: result.data});

        }).catch(error => {
            console.log(error);
        });
    }

    render() {


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
                        name="activityName"
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
                    <AllocationsTable>
                        {this.state.allocations.map((allocation, index) => (
                            <ProductyRow key={index} {...allocation}/>
                        ))}
                    </AllocationsTable>
                </form>
            </div>
        );
    }

}