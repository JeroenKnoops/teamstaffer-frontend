import React from 'react';
import axios from 'axios';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import DatePicker from 'react-bootstrap-date-picker';

const DateInput = (props) => (
    <div className="form-group">
        <label className="control-label col-sm-2" for="name">{props.label}:</label>
        <div className="col-sm-10">
            <DatePicker
                name={props.name} 
                className="form-control" 
                id={props.name}
                placeholder={props.placeholder} 
                onChange={props.onChange}
            />
        </div>
    </div>
)

const TextInput = (props) => (
    <div className="form-group">
        <label className="control-label col-sm-2" for="name">{props.label}:</label>
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

const contractTypes = ["Payroll","Contractor","Student"];

const cellEditProp = {
    mode: 'click'
};

export class TeamMember extends React.Component {
    constructor(props) {
        super(props)
        this.formData = {};
        this.state = {teamMembers: []};
    }

componentDidMount() {
    this.getTeamMembers();
}

    handleInputChange(e) {
        let id = e.target.getAttribute('id');
        this.formData[id] = e.target.value;
    }

    handleSubmit(e) {
        e.preventDefault();

        let teamMembers = this.state.teamMembers;

        axios.post('http://localhost:8080/api/staff/member', this.formData, {timeout: 60000}).then(result => {
            this.getTeamMembers();
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

    render() {
        
        const contractTypeOptions = contractTypes.map((contractType) => {
            return (<option>
                {contractType}
                </option>)
        });

        return (

            <div className="container">

                <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
                    <TextInput
                        label="User Name"
                        placeholder="User name"
                        name="userName"
                        onChange={this.handleInputChange.bind(this)}
                    />
                    <TextInput
                        label="Organisation"
                        placeholder="Enter organisation"
                        name="organisation"
                        onChange={this.handleInputChange.bind(this)}
                    />
                    <SelectInput
                        label="Contract Type"
                        options={contractTypeOptions}
                        placeholder="contract type"
                        name="contractType"
                        onChange={this.handleInputChange.bind(this)}
                    />
                    <TextInput
                        label="Available from"
                        placeholder="Available from"
                        name="startAvail"
                        onChange={this.handleInputChange.bind(this)}
                    />
                    <TextInput
                        label="Available till"
                        placeholder="Available till"
                        name="endAvail"
                        onChange={this.handleInputChange.bind(this)}
                    />
                    <TextInput
                        label="Hours available"
                        placeholder="Hours available"
                        name="hoursAvail"
                        onChange={this.handleInputChange.bind(this)}
                    />
                    <input type="submit" className="btn btn-primary" value="Create staff member"/>
                </form>

                <form className="form-horizontal">
                    <br/>
                    <BootstrapTable data={this.state.teamMembers} cellEdit={cellEditProp}>
                        <TableHeaderColumn dataField="userName" isKey={true} width="17%">User name</TableHeaderColumn>
                        <TableHeaderColumn dataField="organisation" width="17%">Department</TableHeaderColumn>
                        <TableHeaderColumn dataField="contractType" width="17%">Contract Type</TableHeaderColumn>
                        <TableHeaderColumn dataField="startAvail" width="17%">Contract Type</TableHeaderColumn>
                        <TableHeaderColumn dataField="endAvail" width="17%">Contract Type</TableHeaderColumn>
                        <TableHeaderColumn dataField="hoursAvail" width="17%">Contract Type</TableHeaderColumn>
                    </BootstrapTable>
                </form>
            </div>
        );
    }
}