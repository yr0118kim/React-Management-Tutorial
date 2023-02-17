import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';
import CustomerAdd from './components/CustomerAdd';
import Customer from './components/Customer';
import { Table, TableHead, TableBody, TableRow, TableCell, withStylesm, Paper, CircularProgress } from '@mui/material';

const styles = {
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  },
};

class App extends Component {
  state = {
    customers: "",
    completed: 0
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then(res => this.setState({ customers: res }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch("/api/customers", {
      headers: {
        Accept: "application / json",
      },
      method: "GET",
    })
    const body = await response.json();
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        <Paper sx={{ overflowX: "auto" }}>
          <Table stickyHeader sx={{ maxWidth: '1080px', minWidth: '1080px' }}>
            <TableHead>
              <TableRow>
                <TableCell>번호</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>생년월일</TableCell>
                <TableCell>성별</TableCell>
                <TableCell>직업</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.customers ? this.state.customers.map(c => {
                return (<Customer key={c.id} id={c.id} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} image={c.image} />);
              }) :
                <TableRow>
                  <TableCell colSpan="6" align='center'>
                    <CircularProgress variant="determinate" value={this.state.completed} />
                  </TableCell>
                </TableRow>}
            </TableBody>
          </Table>
        </Paper>
        <CustomerAdd></CustomerAdd>
      </>
    )
  }
}

export default App;
