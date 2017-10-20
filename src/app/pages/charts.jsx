import React from 'react';
import axios from 'axios';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Highcharts from 'react-highcharts';

const allocSeries = [
    {
        type: 'area',
        name: 'Committed',
        data: [
            [Date.UTC(2017,1,1),24],
            [Date.UTC(2017,2,3),24],
            [Date.UTC(2017,3,1),16],
            [Date.UTC(2017,4,5),16],
            [Date.UTC(2017,5,1),16],
            [Date.UTC(2017,6,7),16],
            [Date.UTC(2017,7,2),8]
        ]
    },
    {
        type: 'area',
        name: 'Expected',
        data: [
            [Date.UTC(2017,1,1),16],
            [Date.UTC(2017,2,3),8],
            [Date.UTC(2017,3,1),8],
            [Date.UTC(2017,4,5),8],
            [Date.UTC(2017,5,1),8],
            [Date.UTC(2017,6,7),16],
            [Date.UTC(2017,7,2),8]
        ]
    },
    {
        type: 'line',
        name: 'Available',
        data: [
            [Date.UTC(2017,1,1),40],
            [Date.UTC(2017,2,3),40],
            [Date.UTC(2017,3,1),40],
            [Date.UTC(2017,4,5),40],
            [Date.UTC(2017,5,1),40],
            [Date.UTC(2017,6,7),32],
            [Date.UTC(2017,7,2),32]
        ]
    }
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

export class Charts extends React.Component {
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
                <form className="form-horizontal">
                    <br/>
                    <Highcharts config={{
                        chart: {
                            name: 'Allocation hours',
                            zoomType: 'x'
                        },
                        title: {
                            text: 'Allocation'
                        },
                        subtitle: {
                            text: document.ontouchstart === undefined ?
                                    'Allocation' : 'Pinch the chart to zoom in'
                        },
                        xAxis: {
                            type: 'datetime'
                        },
                        yAxis: {
                            title: {
                                text: 'Hours(wk)'
                            }
                        },
                        legend: {
                            enabled: false
                        },

                        plotOptions: {
                            area: {
                                stacking: 'normal'
                            },
                            line: {
                                step: 'left'
                            }
                        },
                        
                        series: allocSeries
                        
                    }}/>
                </form>
            </div>
        );
    }
}