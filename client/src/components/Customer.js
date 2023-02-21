import React from "react";
import { TableRow ,TableCell} from '@mui/material';
import CustomerDelete from './CustomerDelete';
class Customer extends React.Component{
    render(){
        return(
            <TableRow>
                <TableCell>{this.props.id}</TableCell>
                <TableCell><img src={this.props.image} alt="profile"></img></TableCell>
                <TableCell>{this.props.name}</TableCell>
                <TableCell>{this.props.birthday}</TableCell>
                <TableCell>{this.props.gender}</TableCell>
                <TableCell>{this.props.job}</TableCell>
                <TableCell><CustomerDelete stateRefresh={this.props.stateRefresh} id={this.props.id}/></TableCell>
            </TableRow>
        )
    }
}
function CustomerInfo(props){
    return(
        <div>
            <p>{props.birthday}</p>
            <p>{props.gender}</p>
            <p>{props.job}</p>
        </div>
    )
}
function CustomerProfile(props){
    return(
        <div>
            <img src={props.image} alt="profile"/>
            <h2>{props.name}({props.id})</h2>
        </div>
    )
}
export default Customer;