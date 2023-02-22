import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';
import CustomerAdd from './components/CustomerAdd';
import Customer from './components/Customer';
import { Table, TableHead, TableBody, TableRow, TableCell, withStyles, Paper, CircularProgress } from '@mui/material';
import EcoIcon from "@material-ui/icons/Eco";
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

const styles = theme =>({
  root: {
    width: "100%",
    overflowX: "auto",
    minWidth:1080
  },
  paper:{
    marginLeft:18,
    marginRight:18
  },
  menu:{
    marginTop:15,
    marginButtom:15,
    display:'flex',
    justifyContent:'center'
  }
});
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: "",
      completed: 0,
      searchKeyword:''
    }
  }

  stateRefresh = () => {
    this.setState({
      customers: '',
      completed: 0,
      searchKeyword:'',
    });
    this.callApi()
      .then(res => this.setState({ customers: res }))
      .catch(err => console.log(err));
  }
  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then(res => this.setState({ customers: res }))
      .catch(err => console.log(err));
  }
  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
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
    const fillteredComponents = (data) => {
      data = data.filter((c)=>{
        return c.name.indexOf(this.state.searchKeyword) > -1;
      });
      return data.map((c)=>{
        return <Customer stateRefresh={this.stateRefresh} key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job}/>
      });
    }
    const { classes } = this.props;
    const cellList = ["번호","프로필 이미지","이름","생년월일","성별","직업","설정"]
    return (
      <>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
              >
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
              >
                고객 관리 시스템
              </Typography>
              <Search>
                <SearchIconWrapper>
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  name="searchKeyword"
                  value={this.state.searchKeyword}
                  onChange={this.handleValueChange}
                />
              </Search>
            </Toolbar>
          </AppBar>
        </Box>
        <div style={{display:'flex', justifyContent:'center', margin:20}}>
          <CustomerAdd stateRefresh={this.stateRefresh} ></CustomerAdd>
        </div>
        <Paper sx={{ overflowX: "auto" }}>
          <Table stickyHeader sx={{ maxWidth: '1920px', minWidth: '1080px' }}>
            <TableHead>
              <TableRow>
                {cellList.map((c)=>{
                  return <TableCell>{c}</TableCell>
                })
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.customers ? 
              fillteredComponents(this.state.customers):
                <TableRow>
                  <TableCell colSpan="6" align='center'>
                    <CircularProgress variant="determinate" value={this.state.completed} />
                  </TableCell>
                </TableRow>}
            </TableBody>
          </Table>
        </Paper>
      </>
    )
  }
}

export default App;
