import React from 'react';
import axios from 'axios';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const data = [
    {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
    {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
    {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
    {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
    {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
    {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
    {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];

const StaffMemberRow = (props) => (
    <tr>
        <td>{props.name}</td>
        <td>{props.surName}</td>

    </tr>
)

const StaffMemberTable = (props) => (
    <table className={"table table-striped"}>
        <tbody>
        <tr>
            <th>First name</th>
            <th>Last Name</th>
        </tr>
        {props.children}
        </tbody>
    </table>
)

const ProductyRow = (props) => (
    <tr>
        <td>{props.name}</td>
        <td>{props.surName}</td>
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

export class Team extends React.Component {
    constructor(props) {
        super(props)
        this.formData = {};
        this.state = {members: []};
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
                        label="First Name"
                        placeholder="Enter first name"
                        name="name"
                        onChange={this.handleInputChange.bind(this)}
                    />
                    <TextInput
                        label="Last Number"
                        placeholder="Enter last name"
                        name="surName"
                        onChange={this.handleInputChange.bind(this)}
                    />
                    <input type="submit" className="btn btn-primary" value="Create staff member"/>
                </form>

                <form className="form-horizontal">
                    <br/>
                    <BootstrapTable data={this.state.members} cellEdit={cellEditProp} insertRow={true}>
                        <TableHeaderColumn dataField="name" width='50%' isKey={true}>First Name</TableHeaderColumn>
                        <TableHeaderColumn dataField="surName">Last Name</TableHeaderColumn>
                    </BootstrapTable>
                </form>
                <form className="form-horizontal">
                    <br/>
                    <AreaChart width={600} height={400} data={data}
                               margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip/>
                        <Area type='monotone' dataKey='uv' stackId="1" stroke='#8884d8' fill='#8884d8' />
                        <Area type='monotone' dataKey='pv' stackId="1" stroke='#82ca9d' fill='#82ca9d' />
                        <Area type='monotone' dataKey='amt' stackId="1" stroke='#ffc658' fill='#ffc658' />
                    </AreaChart>
                </form>
            </div>
        );
    }
}