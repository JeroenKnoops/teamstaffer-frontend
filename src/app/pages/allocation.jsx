import React from 'react';
import axios from 'axios';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';


const TextInput = (props) => (
    <div className="form-group">
        <label className="control-label col-sm-2" for="activityName">{props.label}:</label>
        <div className="col-sm-10">
            <input type="text" name={props.name} className="form-control" id={props.name}
                   placeholder={props.placeholder} onChange={props.onChange}/>
        </div>
    </div>
)

const SelectInput = (props) => (
    <div className="form-group">
        <label className="control-label col-sm-2" for="">{props.label}:</label>
        <div className="col-sm-10">
            <select type="text" name={props.name} className="form-control" id={props.name}
                   placeholder={props.placeholder} onChange={props.onChange}>
                        <option>Lead</option>
                        <option>Expected</option>
                        <option>Committed</option>
            </select>
        </div>
    </div>
)

const cellEditProp = {
    mode: 'click'
};

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
                    <SelectInput
                        label="Commitment"
                        placeholder=""
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
                        <BootstrapTable data={this.state.allocations} cellEdit={cellEditProp}>
                            <TableHeaderColumn dataField="userName" isKey={true} width="14.3%">User name</TableHeaderColumn>
                            <TableHeaderColumn dataField="activityName" width="14.3%" >Activity name</TableHeaderColumn>
                            <TableHeaderColumn dataField="commitment" width="14.3%" >Commitment</TableHeaderColumn>
                            <TableHeaderColumn dataField="fteAllocation" width="14.3%">Allocation(FTE)</TableHeaderColumn>
                            <TableHeaderColumn dataField="startAssignment" width="14.3%" >Start of Assignment</TableHeaderColumn>
                            <TableHeaderColumn dataField="endAssignment" width="14.3%" >End of Assignment</TableHeaderColumn>
                            <TableHeaderColumn dataField="changeDate" width="14.3%" >Change Date</TableHeaderColumn>
                        </BootstrapTable>
                    </form>
            </div>
        );
    }

}