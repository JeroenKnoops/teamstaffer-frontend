import React from 'react';
import axios from 'axios';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Highcharts from 'react-highcharts';
import DatePicker from 'react-bootstrap-date-picker';


import AllocationGrid, { HeaderGridItem, AllocTableGridItem, AllocChartGridItem, SubmitGridItem } from './allocation-grid';

const commitments = ["Lead","Expectation","Committed"];


// const allocSeries = [
//     {
//         type: 'area',
//         name: 'Committed',
//         data: this.state.userCommitted
//     }
//     //         [Date.UTC(2017,1,1),24],
    //         [Date.UTC(2017,2,3),24],
    //         [Date.UTC(2017,3,1),16],
    //         [Date.UTC(2017,4,5),16],
    //         [Date.UTC(2017,5,1),16],
    //         [Date.UTC(2017,6,7),16],
    //         [Date.UTC(2017,7,2),8]
    //     ]
    // },
    // {
    //     type: 'area',
    //     name: 'Expected',
    //     data: [
    //         [Date.UTC(2017,1,1),16],
    //         [Date.UTC(2017,2,3),8],
    //         [Date.UTC(2017,3,1),8],
    //         [Date.UTC(2017,4,5),8],
    //         [Date.UTC(2017,5,1),8],
    //         [Date.UTC(2017,6,7),16],
    //         [Date.UTC(2017,7,2),8]
    //     ]
    // },
    // {
    //     type: 'line',
    //     name: 'Available',
    //     data: [
    //         [Date.UTC(2017,1,1),40],
    //         [Date.UTC(2017,2,3),40],
    //         [Date.UTC(2017,3,1),40],
    //         [Date.UTC(2017,4,5),40],
    //         [Date.UTC(2017,5,1),40],
    //         [Date.UTC(2017,6,7),32],
    //         [Date.UTC(2017,7,2),32]
    //     ]
    // }
//];



const DateInput = (props) => (
    <div className="form-group">
        <label className="control-label col-sm-2" for="name">{props.label}:</label>
        <div className="col-sm-10">
            <DatePicker
                    name={props.name} 
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
            <input type={props.type} name={props.name} className="form-control" id={props.name}
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


export class Allocation extends React.Component {
    constructor(props) {
        super(props)
        this.formData = {};
        this.state = {
            allocations: [],
            activities: [],
            teamMembers: [],
            userAllocation: [],
            userCommitted: [],
            userExpectation: [],
            userLead: []
        };
    }

    componentDidMount() {
        this.getAllocations();
        this.getActivities();
        this.getTeamMembers();
    }

    mapUserCommitted(){

    }

    
    getUserAllocation(userName) {
        
        const userAllocations = this.state.allocations.filter(allocation => allocation.userName == userName);
        this.setState({userAllocations: userAllocations});

        const userCommittedAllocs = userAllocations.filter(allocation => allocation.commitment == "Committed");
        const mappedCommittedStart = userCommittedAllocs.map(allocation => ([Date.parse(allocation.startAlloc), allocation.hoursAlloc]));
        const mappedCommittedEnd = userCommittedAllocs.map(allocation => ([Date.parse(allocation.endAlloc), allocation.hoursAlloc]));
        const userCommitted = mappedCommittedStart.concat(mappedCommittedEnd);
        this.setState({userCommitted});

        const userExpectationAllocs = userAllocations.filter(allocation => allocation.commitment == "Expectation");
        const mappedExpectationStart = userExpectationAllocs.map(allocation => ([Date.parse(allocation.startAlloc), allocation.hoursAlloc]));
        const mappedExpectationEnd = userExpectationAllocs.map(allocation => ([Date.parse(allocation.endAlloc), allocation.hoursAlloc]));
        const userExpectation = mappedExpectationStart.concat(mappedExpectationEnd);
        this.setState({userExpectation});
        
        const userLeadAllocs = userAllocations.filter(allocation => allocation.commitment == "Lead");
        const mappedLeadStart = userLeadAllocs.map(allocation => ([Date.parse(allocation.startAlloc), allocation.hoursAlloc]));
        const mappedLeadEnd = userLeadAllocs.map(allocation => ([Date.parse(allocation.endAlloc), allocation.hoursAlloc]));
        const userLead = mappedLeadStart.concat(mappedLeadEnd);
        this.setState({userLead});
        
        // const userExpectedAllocs = userAllocations.filter(allocation => allocation.commitment == "Expectation");
        // const mappedExpect = userExpectedAllocs.map(allocation => ([new Date(allocation.startAlloc), allocation.hoursAlloc]));
        // console.log("mapped",mappedExpect);
        // const userLeadAllocs = userAllocations.filter(allocation => allocation.commitment == "Lead");
        // console.log(userAllocations);
        // console.log("committed:", userCommittedAllocs);
        // console.log("expectation", userExpectedAllocs);
        // console.log("lead", userLeadAllocs);
    }

    handleInputChange(e) {
        let id = e.target.getAttribute('id');
        this.formData[id] = e.target.value;
    }

    handleSelectChange(e) {
        let id = e.target.getAttribute('id');
        this.formData[id] = e.target.value;
        this.getUserAllocation(e.target.value);
    }

    handleInputNumberChange(e) {
        let id = e.target.getAttribute('id');
        this.formData[id] = Number(e.target.value);
    }

    handleInputDateChange(id, e) {
        console.log("e ",e);
        console.log("id ",id);
        
        var dateTime = e.slice(0, 16);
        this.formData[id] = dateTime;
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
       
        const allocSeries = [
            {
                type: 'area',
                name: 'Committed',
                data: this.state.userCommitted
            },
            {
                type: 'area',
                name: 'Expectation',
                data: this.state.userExpectation
            },
            {
                type: 'area',
                name: 'Lead',
                data: this.state.userLead
            }
        ];
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

        return (
            <AllocationGrid>
                <HeaderGridItem>
                    <SelectInput
                        label="User Name"
                        options={userNameOptions}
                        placeholder="user name"
                        name="userName"
                        onChange={this.handleSelectChange.bind(this)}
                    />
                </HeaderGridItem>
                
                <AllocTableGridItem>
                    <BootstrapTable data={this.state.userAllocations} cellEdit={cellEditProp}>
                    <TableHeaderColumn dataField="userName" width="12.5%" >Activity name</TableHeaderColumn>
                    <TableHeaderColumn dataField="activityName" isKey={true} width="12.5%" >Activity name</TableHeaderColumn>
                    <TableHeaderColumn dataField="commitment" width="12.5%" >Commitment</TableHeaderColumn>
                    <TableHeaderColumn dataField="startAlloc" width="12.5%" >Start of Assignment</TableHeaderColumn>
                    <TableHeaderColumn dataField="endAlloc" width="12.5%" >End of Assignment</TableHeaderColumn>
                    <TableHeaderColumn dataField="hoursAlloc" width="12.5%">Alloc(hrs)</TableHeaderColumn>
                    </BootstrapTable>
                </AllocTableGridItem>

                <AllocChartGridItem>
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
                </AllocChartGridItem>

                <SubmitGridItem>
                    <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
                    <SelectInput
                        label="Activity Name"
                        options={activityOptions}
                        placeholder="activity name"
                        name="activityName"
                        type="text"
                        onChange={this.handleInputChange.bind(this)}
                    />
                    <SelectInput
                        label="Commitment"
                        placeholder="commitment level"
                        options={commitmentOptions}
                        name="commitment"
                        type="text"
                        onChange={this.handleInputChange.bind(this)}
                    />
                    <DateInput
                        label="Start date"
                        placeholder="Enter start date"
                        name="startAlloc"
                        onChange={this.handleInputDateChange.bind(this,'startAlloc')}
                    />
                    <DateInput
                        label="End date"
                        placeholder="Enter end date"
                        name="endAlloc"
                        onChange={this.handleInputDateChange.bind(this,'endAlloc')}
                    />
                    <TextInput
                        label="Hours allocation"
                        placeholder="Enter allocation"
                        name="hoursAlloc"
                        type="text"
                        onChange={this.handleInputNumberChange.bind(this)}
                    />
                    <input type="submit" className="btn btn-primary" value="Create allocation"/>
                    </form>
                </SubmitGridItem>

            </AllocationGrid>
        );
    }
}
