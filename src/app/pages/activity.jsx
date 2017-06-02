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

const phaseTypes = ["Exploration","Concept","Development"];

export class Activity extends React.Component {
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
       const phaseTypeOptions = phaseTypes.map((phaseType) => {
            return (<option>
                {phaseType}
                </option>)
        });

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
                        label="Activity Number"
                        placeholder="Activity Number"
                        name="activityNumber"
                        onChange={this.handleInputChange.bind(this)}
                    />
                    <TextInput
                        label="Domain"
                        placeholder="Enter domain"
                        name="domain"
                        onChange={this.handleInputChange.bind(this)}
                    />
                    <SelectInput
                        label="Phase"
                        options={phaseTypeOptions}
                        placeholder="activity phase"
                        name="phase"
                        onChange={this.handleInputChange.bind(this)}
                    />
                    <TextInput
                        label="Change Date"
                        placeholder="Change date"
                        name="changeDate"
                        onChange={this.handleInputChange.bind(this)}
                    />
                    <input type="submit" className="btn btn-primary" value="Create activity"/>
                </form>

                <form className="form-horizontal">
                    <br/>
                    <BootstrapTable data={this.state.activities} cellEdit={cellEditProp}>
                        <TableHeaderColumn dataField="activityName" isKey={true} width="20%">Activity Name</TableHeaderColumn>
                        <TableHeaderColumn dataField="activityNumber" width="20%" >Activity Number</TableHeaderColumn>
                        <TableHeaderColumn dataField="domain" width="20%" >Domain</TableHeaderColumn>
                        <TableHeaderColumn dataField="phase" width="20%" >Phase</TableHeaderColumn>
                        <TableHeaderColumn dataField="changeDate" width="20%" >Change Date</TableHeaderColumn>
                    </BootstrapTable>
                </form>
            </div>
        );
    }

}