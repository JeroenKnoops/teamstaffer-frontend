import React from 'react';
import axios from 'axios';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';


import AvailabilityGrid, { HeaderGridItem, DataPlaneGridItem, 
    TextInputGridItem, FooterGridItem } from './availability-grid';

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

const weeks = Array.from(new Array(52),(val,index)=>index);

var userAvail = [{}];


//var userAvail = [{}];

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
    mapUserAvailToWeekNumberArray(userName){
        var userAvailWeeks = new Array(52).fill(0);
        var mappedObject = {
                userName: "rholdorp",
                year: "2017"
            };

        this.state.availability.filter(function(avail){
            if(userName == avail.userName){
                userAvailWeeks[avail.week] = avail.hours;
                mappedObject["userName"] = avail.userName;
                mappedObject["year"] = avail.year;
            }
           
        });
         mappedObject = { ...mappedObject, ...userAvailWeeks};
        return mappedObject;
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

        userAvail[0] = this.mapUserAvailToWeekNumberArray("rholdorp");

        console.log(userAvail);

        const tabWeeks = weeks.map((week) => {
            return (<TableHeaderColumn 
 //                       dataField={week.toString()} >Wk{week}</TableHeaderColumn>)
                     dataField={week.toString()} width="40px">{week}</TableHeaderColumn>)
        });

        return (
            <AvailabilityGrid>
                <HeaderGridItem>Header</HeaderGridItem>
                <DataPlaneGridItem>DataPlaneGridItem</DataPlaneGridItem>
                <TextInputGridItem>TextInputGridItem</TextInputGridItem>
                <FooterGridItem>FooterGridItem</FooterGridItem>
            </AvailabilityGrid>
        );
    }
}
