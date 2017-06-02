import React from 'react';
import axios from 'axios';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

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


const cellEditProp = {
    mode: 'click'
};

export class Availability extends React.Component {
    constructor(props) {
        super(props)
        this.formData = {};
        this.state = {
            teamMembers: [], 
            availability: []
        };
    }

componentDidMount() {
    this.getAvailability();
    this.getTeamMembers();
}

    handleInputChange(e) {
        let id = e.target.getAttribute('id');
        this.formData[id] = e.target.value;
    }

    handleSubmit(e) {
        e.preventDefault();

        let availability = this.state.availablity;

        axios.post('http://localhost:8080/api/availability', this.formData, {timeout: 60000}).then(result => {
            this.getAvailability();
        }).catch(error => {
            console.log(error);
        });
    }

    getAvailability() {

        axios.get('http://localhost:8080/api/availability').then(result => {
            this.setState({availability: result.data});

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
       
        const options = this.state.teamMembers.map((teamMember) => {
            return (<option>
                {teamMember.userName}
                </option>)
        });

        return (

            <div className="container">

                <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
                   <SelectInput
                        label="User Name"
                        placeholder="user name"
                        name="userName"
                        options={options}
                        onChange={this.handleInputChange.bind(this)}
                    />
                   <TextInput
                        label="Availability"
                        placeholder="Enter FTE availability"
                        name="fteAvailability"
                        onChange={this.handleInputChange.bind(this)}
                    />
                    <TextInput
                        label="Start date"
                        placeholder="Enter start date"
                        name="startDate"
                        onChange={this.handleInputChange.bind(this)}
                    />
                    <TextInput
                        label="End date"
                        placeholder="Enter end date"
                        name="endDate"
                        onChange={this.handleInputChange.bind(this)}
                    />
                    <input type="submit" className="btn btn-primary" value="Add availability"/>
                </form>
                <form className="form-horizontal">
                    <br/>
                    <BootstrapTable data={this.state.availability} cellEdit={cellEditProp}>
                        <TableHeaderColumn dataField="userName" isKey={true} width="25%">User name</TableHeaderColumn>
                        <TableHeaderColumn dataField="fteAvailability" width="25%" >% Availability</TableHeaderColumn>
                        <TableHeaderColumn dataField="startDate" width="25%" >Start date</TableHeaderColumn>
                        <TableHeaderColumn dataField="endDate" width="25%" >End date</TableHeaderColumn>
                    </BootstrapTable>
                </form>
            </div>
        );
    }
}