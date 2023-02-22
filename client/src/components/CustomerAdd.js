import React from "react";
import axios from "axios";
// import Dialog from "@material-ui/core/Dialog"
// import DialogActions from "@material-ui/core/DialogActions"
// import DialogTitle from "@material-ui/core/DialogTitle";
// import DialogContent from "@material-ui/core/DialogContent";
import { withStyles } from "@material-ui/core/styles";
import Button from '@mui/material/Button';
import { Modal, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

class CustomerAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        this.addCustomer()
            .then((response) => {
                console.log(response);
                this.props.stateRefresh();
            })
        this.setState({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false
        })
    }
    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value
        })
        console.log(this.state);
    }
    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }
    addCustomer = () => {
        const url = '/api/customers';
        const formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('name', this.state.userName);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        return axios.post(url, formData, config)
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        })
    }
    handleClickClose = () => {
        this.setState({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false
        })
    }

    render() {
        // const useStyles = makeStyles((theme) => {
        //     hidden: {
        //         display: 'none'
        //     }
        // });
        const { classes } = this.props;
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    고객 추가하기
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClickClose}>
                    <DialogTitle>고객추가</DialogTitle>
                    <DialogContent style={{ display: "flex", flexdirection: "column" }}>
                        <input  accept="image/*" type="file"  id="raised-button-file" name="file" style={{ display: "none" }} file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}></input>
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span" name="file">
                                {this.state.fileName === "" ? "프로필 이미지 선택" : this.state.fileName}
                            </Button>
                        </label>
                        <TextField label="이름" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}></TextField>
                        <TextField label="생년월일" type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}></TextField>
                        <TextField label="성별" type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}></TextField>
                        <TextField label="직업" type="text" name="job" value={this.state.job} onChange={this.handleValueChange}></TextField>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClickClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
                {/* <form onSubmit={this.handleFormSubmit}>
                    <h1>고객 추가</h1>
                    프로필 이미지: <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}></input>
                    이름:<input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} />
                    생년월일:<input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange} />
                    성별:<input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange} />
                    직업:<input type="text" name="job" value={this.state.job} onChange={this.handleValueChange} />
                    <button type="submit">추가하기</button>
                </form> */}
            </div>


        )
    }
}
export default CustomerAdd;
