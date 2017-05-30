import React from 'react';
import axios from 'axios';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';


const StaffMemberRow = (props) => (
    <tr>
        <td>{props.userName}</td>
        <td>{props.department}</td>
        <td>{props.contractType}</td>
    </tr>
)

const StaffMemberTable = (props) => (
    <table className={"table table-striped"}>
        <tbody>
        <tr>
            <th>User name</th>
            <th>Deparment</th>
            <th>Contract type</th>
        </tr>
        {props.children}
        </tbody>
    </table>
)

const ProductyRow = (props) => (
    <tr>
        <td>{props.userName}</td>
        <td>{props.department}</td>
        <td>{props.contractType}</td>
    </tr>
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

const cellEditProp = {
    mode: 'click'
};

export class StaffMember extends React.Component {
    constructor(props) {
        super(props)
        this.formData = {};
        this.state = {members: [], avail: []};
    }

componentDidMount() {
    this.getStaffMembers();
}

    handleInputChange(e) {
        let id = e.target.getAttribute('id');
        this.formData[id] = e.target.value;
    }

    handleSubmit(e) {
        e.preventDefault();

        let members = this.state.members;

        axios.post('http://localhost:8080/api/staff/member', this.formData, {timeout: 60000}).then(result => {
            this.getStaffMembers();
        }).catch(error => {
            console.log(error);
        });
    }

    getStaffMembers() {

        axios.get('http://localhost:8080/api/staff/member').then(result => {
            this.setState({members: result.data});

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
                        placeholder="User name"
                        name="userName"
                        onChange={this.handleInputChange.bind(this)}
                    />
                    <TextInput
                        label="Department"
                        placeholder="Enter department"
                        name="department"
                        onChange={this.handleInputChange.bind(this)}
                    />
                    <TextInput
                        label="Contract Type"
                        placeholder="Enter contract type"
                        name="contractType"
                        onChange={this.handleInputChange.bind(this)}
                    />
                    <input type="submit" className="btn btn-primary" value="Create staff member"/>
                </form>

                <form className="form-horizontal">
                    <br/>
                    <BootstrapTable data={this.state.members} cellEdit={cellEditProp} insertRow={true}>
                        <TableHeaderColumn dataField="userName" isKey={true}>User name</TableHeaderColumn>
                        <TableHeaderColumn dataField="department" >Department</TableHeaderColumn>
                        <TableHeaderColumn dataField="contractType" >Contract Type</TableHeaderColumn>
                    </BootstrapTable>
                </form>
            </div>
        );
    }
}