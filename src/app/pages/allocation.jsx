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
                   <option>select {props.placeholder}</option>
                   {props.options}     
            </select>
        </div>
    </div>
)


const cellEditProp = {
    mode: 'click'
};

const commitments = ["Lead","Expectation","Committed"];

export class Allocation extends React.Component {
    constructor(props) {
        super(props)
        this.formData = {};
        this.state = {
            allocations: [],
            activities: [],
            teamMembers: [],
            availabilities: []
        };
    }

    componentDidMount() {
        this.getAllocations();
        this.getActivities();
        this.getTeamMembers();
        this.getAvailability();
        this.loadAllocationIntoWeeks();
        
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

    getAvailability() {

        axios.get('http://localhost:8080/api/availability').then(result => {
            this.setState({availabilities: result.data});

        }).catch(error => {
            console.log(error);
        });
    }

    getTeamMembers() {

        axios.get('http://localhost:8080/api/staff/member').then(result => {
            this.setState({teamMembers: result.data});

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

        const userNameOptions = this.state.teamMembers.map((teamMember) => {
            return (<option>
                {teamMember.userName}
                </option>)
        });

        const activityOptions = this.state.activities.map((activity) => {
            return (<option>
                {activity.activityName}
                </option>)
        });

        const commitmentOptions = commitments.map((commitment) => {
            return (<option>
                {commitment}
                </option>)
        });

        const allocationsInWeeks = this.state.allocations.filter(function(user){
              console.log(user.userName);
        });

        return (
            <div className="container">
                <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
                    <SelectInput
                        label="User Name"
                        options={userNameOptions}
                        placeholder="user name"
                        name="userName"
                        onChange={this.handleInputChange.bind(this)}
                    />
                    <SelectInput
                        label="Activity Name"
                        options={activityOptions}
                        placeholder="activity name"
                        name="activityName"
                        onChange={this.handleInputChange.bind(this)}
                    />
                    <SelectInput
                        label="Commitment"
                        placeholder="commitment level"
                        options={commitmentOptions}
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
                    <input type="submit" className="btn btn-primary" value="Create allocation"/>
                </form>
                <form className="form-horizontal">
                        <br/>
                        <BootstrapTable data={this.state.allocations} cellEdit={cellEditProp}>
                            <TableHeaderColumn dataField="userName" width="12,5%">User name</TableHeaderColumn>
                            <TableHeaderColumn dataField="activityName" width="12.5%" >Activity name</TableHeaderColumn>
                            <TableHeaderColumn dataField="commitment" width="12.5%" >Commitment</TableHeaderColumn>
                            <TableHeaderColumn dataField="fteAssignment" width="12.5%">Allocation(FTE)</TableHeaderColumn>
                            <TableHeaderColumn dataField="startAssignment" width="12.5%" >Start of Assignment</TableHeaderColumn>
                            <TableHeaderColumn dataField="endAssignment" width="12.5%" >End of Assignment</TableHeaderColumn>
                            <TableHeaderColumn dataField="changeDate" width="12.5%" >Change Date</TableHeaderColumn>
                            <TableHeaderColumn dataField="id" isKey={true} width="12.5%">ID</TableHeaderColumn>
                        </BootstrapTable>
                    </form>
            </div>
        );
    }

}