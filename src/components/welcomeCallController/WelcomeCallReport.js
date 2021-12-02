import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Asynchronous from "../reusableComponents/AutoComplete";
import CompanySearch from "../reusableComponents/CompanyAutoComplete";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FormGroup from "@material-ui/core/FormGroup";
import toastr from 'toastr'
import 'toastr/build/toastr.css'
import DatatablePage from "../reusableComponents/MDTable";
import ClearIcon from '@material-ui/icons/Clear';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Ledger from '../../assets/logos/ledger.svg';
import History from '../../assets/logos/history.svg';
import Loader from '../../assets/logos/OldPulseLoader.svg';
import Plus from '../../assets/logos/plus.png';
import GetAppIcon from '@material-ui/icons/GetApp';
import {Event}  from '../../GoogleAnalytics';
import "./styles.css"
import CustomDatePicker from "../reusableComponents/DatePicker";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import AES from "../reusableComponents/Aes"

const drawerWidth = 505;

const styles = theme => ({
    textColor:{
      color: ""
    },
    checkBox: {
        marginBottom: "0px!important"
    },
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 0,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    typefont: {
      fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif;",
        fontWeight: "bold"
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'center',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
});



class WelcomeCallReport extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            open: false,
            showTable: false,
            tableData: [],
            showProgress: false,
            data: {},
            count: 0,
            activePage: 0,
            pageStart: 1,
            assignType: "1",
            myGroupChecked: true,
            employeeId: "",
            exportEnable: true,
            status : "3",
            service: "1",
            tat: "0",
            hostingFrom: "",
            hostingTo: "",
            assignedFrom: "",
            assignedTo: "",
            completedFrom: "",
            completedTo: "",
            companyId: "",
            statusValue: ""
        };
        this.paging = this.paging.bind(this);
    }

    handleGroupChange = () => {
        this.setState({myGroupChecked: !this.state.myGroupChecked})
        Event("MyGroup")
    };

    handleAssignChange = (event) => {
        this.setState({assignType: event.target.value})
        if(event.target.value === "1")
            Event("SalesAssignedTo")
        else
            Event("TeleAssignedTo")
    };

    handleServiceChange = (event) => {
        this.setState({service: event.target.value})
        Event("Service")
    };

    handleStatusChange = (event) => {
        this.setState({status: event.target.value})
        if(event.target.value === "3"){
            Event("WIP_Status")
        }else{
            Event("Completed_Status")
        }
    };

    handleTatChange = (event) => {
        this.setState({tat: event.target.value})
        Event("TATChange")
    };

    handleDrawerOpen = () => {
        if(this.state.open){
            Event("DrawerClose")
        }else{
            Event("DrawerOpen")
        }
        this.setState({open: !this.state.open});
    };

    componentWillMount() {
        document.title = "Welcome Call";
    }

    componentDidMount() {
        this.setState({open:true,employeeId: this.props.employeeid})
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": true,
            "progressBar": true,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        };
    }

    changeToDate(date) {
        let dateArr = date.split("/")
        return dateArr[1]+"/"+dateArr[0]+"/"+dateArr[2]
    }

    async showTable() {
        this.setState({exportEnable: true});
        const salesAssignCheck = document.getElementById("SalesAssign");
        const wipChecked = document.getElementById("WIP");
        const assigneeValue = document.getElementById("employee");
        const companyValue = document.getElementById("company");
        const isMyGroup = document.getElementById("MyGroup");

        let myGroup = false;
        if (isMyGroup.checked) {
            myGroup = true;
        }

        let assigneeType = "";
        if (salesAssignCheck.checked) {
            assigneeType = "Sale";
        } else {
            assigneeType = "Tele";
        }

        let status = "";
        if(wipChecked.checked){
            status = "W"
        }else{
            status = "C"
        }

        const assigneeID = assigneeValue.value.substr(assigneeValue.value.lastIndexOf("-") + 2, assigneeValue.value.length - 1);
        const companyID = companyValue.value.substr(companyValue.value.lastIndexOf("-") + 2, companyValue.value.length - 1);
        const service = this.state.service;
        const tat = this.state.tat;
        const hostingFrom = document.getElementById("hostingFrom").value;
        const hostingTo = document.getElementById("hostingTo").value;
        const assignedFrom = document.getElementById("assignedFrom").value;
        const assignedTo = document.getElementById("assignedTo").value;
        let completedFrom = "";
        let completedTo = "";
        if(status === "C"){
            completedFrom = document.getElementById("completedFrom").value;
            completedTo = document.getElementById("completedTo").value;
            if(completedFrom === "" || completedTo === "" ){
                toastr.warning("Please fill completed date")
                return
            }else{
                if(new Date(this.changeToDate(completedFrom))>new Date(this.changeToDate(completedTo))){
                    toastr.warning("Start Date cannot be greater than End Date")
                    return
                }
            }
        }

        if(status === "W" && (assignedFrom === "" || assignedTo === "" )){
            toastr.warning("Please fill assigned date")
            return
        }

        if((hostingFrom !== "" && hostingTo === "") || (hostingFrom === "" && hostingTo !== "") || (hostingFrom !== "" && hostingTo === "") || (hostingFrom === "" && hostingTo !== "") || (assignedFrom !== "" && assignedTo === "") || (assignedFrom === "" && assignedTo !== "")){
            toastr.warning("Please fill both hosting start and end dates")
            return
        }

        if(new Date(this.changeToDate(assignedFrom))>new Date(this.changeToDate(assignedTo))){
            toastr.warning("Start Date cannot be greater than End Date")
            return
        }

        if(new Date(this.changeToDate(hostingFrom))>new Date(this.changeToDate(hostingTo))){
            toastr.warning("Start Date cannot be greater than End Date")
            return
        }

        this.setState({
            employeeId:assigneeID,
            companyId: companyID,
            statusValue: status,
            hostingFrom: hostingFrom,
            hostingTo: hostingTo,
            assignedFrom: assignedFrom,
            assignedTo: assignedTo,
            completedFrom: completedFrom,
            completedTo: completedTo
        });

            if (assigneeValue.value === "") {
                toastr.warning("Assignee Name Cannot be blank")
            } else {
                    const progressStatus = false;
                    const empID = this.props.employeeid;
                    const AK = this.props.AK;
                    let bodyData = {};
                    this.setState({showProgress: true, showTable: false, open: false,pageStart: 1,activePage: 0});
                    await fetch('https://merp.intermesh.net/go/report/v1/welcome?empid=' + empID + '&searchtype=' + assigneeType + '&start=1&isMyGroup=' + myGroup + '&end=11&assigned=' + assigneeID + '&AK=' + AK +"&isExport=0&isCount=0&hostingfrom="+hostingFrom+"&hostingto="+hostingTo+"&assignedfrom="+assignedFrom+"&assignedto="+assignedTo+"&completedfrom="+completedFrom+"&completedto="+completedTo+"&tat="+tat+"&service="+service+"&status="+status+(companyID === ""?"":"&company="+companyID), {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json'
                        },
                    })
                        .then(function (response) {
                            return response.json()
                        }).then(function (body) {
                            if (body.status !== 200 && body.status !== 204) {
                                toastr.error(body.message)
                            } else {
                                toastr.success(body.message);
                                if (body.status !== 204) {
                                    bodyData = body
                                }

                            }
                        }).catch(error => console.log("Error"))

                    if (bodyData.data) {
                        let columns = [];
                        let count = bodyData.data.count;
                        let data = [];
                        if (bodyData.data.welcomecalldata)
                            data = bodyData.data.welcomecalldata
                        Object.keys(data[0]).map(function (val) {

                            if(val !== "Service ID" && val !== "Sales Call Tracker ID") {
                                let newColumn = {
                                    label: val,
                                    field: val,
                                    width: 100
                                };

                                columns.push(newColumn)
                            }
                        });

                        columns.push({
                            label: 'Action',
                            field: 'Action'
                        });

                        let rows = [];
                        data.map(function (val) {
                            let newRow = {}
                            Object.keys(val).map(function (key) {

                                if(key === "Service ID" || key === "Sales Call Tracker ID" ) {

                                }
                                else{
                                    if(key === "BuyLead" || key === "Enquiry"){
                                        newRow[key] = val[key] === null || val[key] === "" ? "N/A" : <span style={{color: val[key]}}>{val[key]}</span>;
                                    }else {
                                        newRow[key] = val[key] === null || val[key] === "" ? "N/A" : val[key];
                                    }
                                }
                            });
                            newRow['Action']  = [<div className="d-flex"><img src={Ledger} style={{width: "20px",height: "20px",cursor: "pointer",marginRight: "10px"}} title="Client Ledger" onClick={()=>{window.open('http://weberp.intermesh.net/STS/STSDetpopup.aspx?glid='+val["GLID"]+'&ISCL=1','_blank','toolbar=no,location=0,directories=no,status=no,menubar=no,titlebar=no,scrollbars=yes,resizable=no,copyhistory=no,width=905,height=565,left=300,top=200,screenX=150,screenY=100')}}/><img src={History} style={{width: "20px",height: "20px",cursor: "pointer",marginRight: "10px"}} title="STS" onClick={()=>{window.open('http://weberp.intermesh.net/STS/STSDetpopup.aspx?glid='+val["GLID"],'_blank','toolbar=no,location=no,directories=no,status=no,scrollbars=yes,resizable=yes,copyhistory=no,width=905,height=565,left=150,top=100,screenX=150,screenY=100')}}/><img src={Plus} style={{width: "20px",height: "20px",cursor: "pointer"}} title="Click to open Initial Calling Screen" onClick={()=>{window.open('https://weberp.intermesh.net/STS/SamparkScreen_Dialer_New.aspx?EQData='+AES("GLID="+val["GLID"]+"&SCTID="+val["Sales Call Tracker ID"]+"&AssignDate="+val["Assigned Date"]+"&serviceid="+val["Service ID"]),'_blank','toolbar=no,location=no,directories=no,status=no,scrollbars=yes,resizable=yes,copyhistory=no,width=905,height=565,left=150,top=100,screenX=150,screenY=100')}}/></div>]
                            rows.push(newRow)
                        });



                        let completeData = {
                            columns: columns,
                            rows: rows
                        };
                        await this.setState({
                            showProgress: progressStatus,
                            showTable: true,
                            tableData: bodyData.data.segmentationData,
                            data: completeData,
                            count: count,
                            exportEnable: false
                        });
                    } else
                        await this.setState({showProgress: progressStatus, open: true,exportEnable: true});

                }


        Event("Search")
    }

    async exportToExcel() {
        const assigneeID = this.state.employeeId;
        const companyID = this.state.companyId;
        const assignCheck = this.state.assignType;
        const myGroup = this.state.myGroupChecked;
        const service = this.state.service;
        const status = this.state.statusValue;
        const tat = this.state.tat;
        const hostingFrom = this.state.hostingFrom;
        const hostingTo = this.state.hostingTo;
        const assignedFrom = this.state.assignedFrom;
        const assignedTo = this.state.assignedTo;
        const completedFrom = this.state.completedFrom;
        const completedTo = this.state.completedTo;

        let assigneeType = "";
        if (assignCheck === "1") {
            assigneeType = "Sale";
        } else {
            assigneeType = "Tele";
        }

                    const progressStatus = false;
                    const empID = this.props.employeeid;
                    const AK = this.props.AK;
                    let bodyData = {};
                    this.setState({showProgress: true, open: false,pageStart: 1,activePage: 0,exportEnable: true});
                    await fetch('https://merp.intermesh.net/go/report/v1/welcome?empid=' + empID + '&searchtype=' + assigneeType + '&isMyGroup=' + myGroup + '&assigned=' + assigneeID + '&AK=' + AK +"&isExport=1&isCount=0&hostingfrom="+hostingFrom+"&hostingto="+hostingTo+"&assignedfrom="+assignedFrom+"&assignedto="+assignedTo+"&completedfrom="+completedFrom+"&completedto="+completedTo+"&tat="+tat+"&service="+service+"&status="+status+(companyID === ""?"":"&company="+companyID), {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json'
                        },
                    })
                        .then(function (response) {
                            return response.json()
                        }).then(function (body) {
                            if (body.status !== 200 && body.status !== 204) {
                                toastr.error("Some error occurred! Please try again later")
                            } else {
                                toastr.success("Your request has been successfully queued. You will receive an email shortly.");
                            }
                        }).catch(error => console.log("Error"))
                        await this.setState({showProgress: progressStatus});

                        Event("Export")
                }


    async paging(pageStart) {

        const assigneeID = this.state.employeeId;
        const companyID = this.state.companyId;
        const assignCheck = this.state.assignType;
        const myGroup = this.state.myGroupChecked;
        const service = this.state.service;
        const status = this.state.statusValue;
        const tat = this.state.tat;
        const hostingFrom = this.state.hostingFrom;
        const hostingTo = this.state.hostingTo;
        const assignedFrom = this.state.assignedFrom;
        const assignedTo = this.state.assignedTo;
        const completedFrom = this.state.completedFrom;
        const completedTo = this.state.completedTo;

        let assigneeType = "";
        if (assignCheck === "1") {
            assigneeType = "Sale";
        } else {
            assigneeType = "Tele";
        }

        const progressStatus = false;
        const empID = this.props.employeeid;
        const AK = this.props.AK;
        let bodyData = {};
        this.setState({showProgress: true, open: false});

        await fetch('https://merp.intermesh.net/go/report/v1/welcome?empid=' + empID + '&searchtype=' + assigneeType + '&start='+pageStart+'&isMyGroup=' + myGroup + '&end='+(pageStart+10)+'&assigned=' + assigneeID + '&AK=' + AK +"&isExport=0&isCount=0&hostingfrom="+hostingFrom+"&hostingto="+hostingTo+"&assignedfrom="+assignedFrom+"&assignedto="+assignedTo+"&completedfrom="+completedFrom+"&completedto="+completedTo+"&tat="+tat+"&service="+service+"&status="+status+(companyID === ""?"":"&company="+companyID) , {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json'
                        },
                    })
                        .then(function (response) {
                            return response.json()
                        }).then(function (body) {
                            if (body.status !== 200 && body.status !== 204) {
                                toastr.error(body.message)
                            } else {
                                if (body.status !== 204) {
                                    bodyData = body;
                                }

                            }
                        }).catch(error => {
                            toastr.error("Some error occurred please try again!")
                        });

                    if(bodyData.data) {
                        this.setState({activePage: Math.floor(pageStart/10),pageStart: pageStart});
                        let columns = [];
                        let count = bodyData.data.count;
                        let data = [];
                        if (bodyData.data.welcomecalldata)
                            data = bodyData.data.welcomecalldata
                        Object.keys(data[0]).map(function (val) {
                            if(val !== "Service ID" && val !== "Sales Call Tracker ID") {
                                let newColumn = {
                                    label: val,
                                    field: val,
                                    width: 100
                                }

                                columns.push(newColumn)
                            }
                        });

                        columns.push({
                            label: 'Action',
                            field: 'Action'
                        });

                        let rows = [];
                        data.map(function (val) {
                            let newRow = {}
                            Object.keys(val).map(function (key) {

                                if(key === "Service ID" || key === "Sales Call Tracker ID" ) {

                                }
                                else{
                                    if(key === "BuyLead" || key === "Enquiry"){
                                        newRow[key] = val[key] === null || val[key] === "" ? "N/A" : <span style={{color: val[key]}}>{val[key]}</span>;
                                    }else {
                                        newRow[key] = val[key] === null || val[key] === "" ? "N/A" : val[key];
                                    }
                                }
                            });
                            newRow['Action']  = [<div className="d-flex"><img src={Ledger} style={{width: "20px",height: "20px",cursor: "pointer",marginRight: "10px"}} title="Client Ledger" onClick={()=>{window.open('http://weberp.intermesh.net/STS/STSDetpopup.aspx?glid='+val["GLID"]+'&ISCL=1','_blank','toolbar=no,location=0,directories=no,status=no,menubar=no,titlebar=no,scrollbars=yes,resizable=no,copyhistory=no,width=905,height=565,left=300,top=200,screenX=150,screenY=100')}}/><img src={History} style={{width: "20px",height: "20px",cursor: "pointer",marginRight: "10px"}} title="STS" onClick={()=>{window.open('http://weberp.intermesh.net/STS/STSDetpopup.aspx?glid='+val["GLID"],'_blank','toolbar=no,location=no,directories=no,status=no,scrollbars=yes,resizable=yes,copyhistory=no,width=905,height=565,left=150,top=100,screenX=150,screenY=100')}}/><img src={Plus} style={{width: "20px",height: "20px",cursor: "pointer"}} title="Click to open Initial Calling Screen" onClick={()=>{window.open('https://weberp.intermesh.net/STS/SamparkScreen_Dialer_New.aspx?EQData='+AES("GLID="+val["GLID"]+"&SCTID="+val["Sales Call Tracker ID"]+"&AssignDate="+val["Assigned Date"]+"&serviceid="+val["Service ID"]),'_blank','toolbar=no,location=no,directories=no,status=no,scrollbars=yes,resizable=yes,copyhistory=no,width=905,height=565,left=150,top=100,screenX=150,screenY=100')}}/></div>]
                            rows.push(newRow)
                        });

                        let completeData = {
                            columns: columns,
                            rows: rows
                        }
                        await this.setState({
                            showProgress: progressStatus,
                            showTable: true,
                            data: completeData,
                            count: count
                        });
                        console.log(completeData)
                    } else
                        await this.setState({showProgress: progressStatus, open: true});
                    Event("Paging")
    }

    render() {

        const { classes, theme } = this.props;
        const { open } = this.state;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar disableGutters={!open}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton)}
                        >
                            {this.state.open?"":<MenuIcon />}
                        </IconButton>
                    </Toolbar>
                    {this.state.open?"":<div className="d-flex align-items-center h-100" style={{backgroundColor:"#00A699",padding: "10px",position: "absolute",left: "50px"}}><Typography variant="h6">Welcome Call</Typography></div>}
                    <Button disabled={this.state.exportEnable} variant="contained" className="export" style={{width: "110px",position: "absolute",right: "20px",top: "10px"}} color="primary" onClick={this.exportToExcel.bind(this)}>
                        Export<GetAppIcon/>
                    </Button>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    style={{overflow: "hidden"}}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className="d-flex justify-content-between">
                    <Typography variant={"h6"} className={[classes.textColor,classes.typefont,"px-3 mt-2"]}>
                        Assigned To<span style={{color: "red"}}>*</span>
                    </Typography>
                    <IconButton onClick={this.handleDrawerOpen}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                    </div>
                    <Divider/>
                    <FormControl component="fieldset" className="mx-3 d-flex mt-1">
                        <RadioGroup row aria-label="gender" value={this.state.assignType} onChange={this.handleAssignChange}>
                            <FormControlLabel
                                value="1"
                                control={<Radio id="SalesAssign" color="primary"/>}
                                label="Sales Assigned To"
                            />
                            <FormControlLabel
                                value="2"
                                control={<Radio id="TeleAssign" color="primary" />}
                                label="Tele Assigned To"
                            />
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            id="MyGroup"
                                            value="checkedB"
                                            color="primary"
                                            checked={this.state.myGroupChecked}
                                            onChange={this.handleGroupChange}
                                        />

                                    }
                                    label="My Group"
                                />
                            </FormGroup>
                        </RadioGroup>
                    </FormControl>
                    <Asynchronous label="Search Employee*" id="employee" search="employee" className="mt-1 mx-3" defaultValue={this.props.employeename +" - "+this.props.employeeid} employeeid={this.props.employeeid} AK={this.props.AK} menuid={102} fnsid={227}/>
                    <div className="mt-3">
                        <CompanySearch label="Search Company" id="company" search="company" className="mx-3" employeeid={this.props.employeeid} AK={this.props.AK} menuid={102} fnsid={227}/>
                    </div>
                    <Typography variant={"h6"} className={[classes.textColor,classes.typefont,"px-3 mt-2"]}>
                        Status & Other Filters<span style={{color: "red"}}>*</span>
                    </Typography>
                    <Divider/>
                    <FormControl component="fieldset" className="mx-3 mt-1">
                        <RadioGroup row aria-label="gender" className="d-flex justify-content-between" value={this.state.status} onChange={this.handleStatusChange}>
                            <FormControlLabel
                                value="3"
                                control={<Radio id="WIP" color="primary" />}
                                label="WIP"
                            />
                            <FormControlLabel
                                value="4"
                                control={<Radio id="Complete" color="primary" />}
                                label="Completed"
                            />
                            <FormControl style={{width: "100px",marginRight: "10px"}}>
                                <Select
                                    value = {this.state.service}
                                    displayEmpty
                                    className={classes.selectEmpty}
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    id="month"
                                    onChange={this.handleServiceChange}
                                >
                                    <MenuItem value={1}>Catalog</MenuItem>
                                    <MenuItem value={3}>Maxi</MenuItem>
                                    <MenuItem value={2}>SS+</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl style={{width: "100px"}}>
                                <Select
                                    displayEmpty
                                    value = {this.state.tat}
                                    className={classes.selectEmpty}
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    id="year"
                                    onChange={this.handleTatChange}
                                >
                                    <MenuItem value={0}>TAT</MenuItem>
                                    <MenuItem value={1}>0-2</MenuItem>
                                    <MenuItem value={2}>2-4</MenuItem>
                                    <MenuItem value={3}>5+</MenuItem>
                                </Select>
                            </FormControl>
                        </RadioGroup>
                    </FormControl>
                    <Typography variant={"h6"} className={[classes.textColor,classes.typefont,"px-3"]}>
                        Date Filters
                    </Typography>
                    <Divider/>
                    <div className="d-flex justify-content-between align-items-center ml-2">
                        <label className="mt-3" style={{fontSize: "16px"}}>Hosting Date</label>
                        <div className="d-flex">
                            <CustomDatePicker clear={true} id="hostingFrom" Date={null}/>
                            <CustomDatePicker clear={true} id="hostingTo" Date={null}/>
                        </div>
                    </div>
                    {this.state.status === "3"?<div className="d-flex justify-content-between align-items-center  ml-2">
                        <label className="mt-3" style={{fontSize: "16px"}}>Assigned Date</label>
                        <div className="d-flex">
                            <CustomDatePicker clear={true} id="assignedFrom" Date={new Date().setMonth(new Date().getMonth()-1)}/>
                            <CustomDatePicker clear={true} id="assignedTo" Date={new Date()}/>
                        </div>
                    </div>:""}
                    {this.state.status === "4"?<div className="d-flex justify-content-between align-items-center  ml-2">
                        <label className="mt-3" style={{fontSize: "16px"}}>Assigned Date</label><div className="d-flex">
                        <CustomDatePicker clear={true} id="assignedFrom"/>
                        <CustomDatePicker clear={true} id="assignedTo"/>
                    </div></div>:""}
                    {this.state.status === "4" ?<div className="d-flex justify-content-between align-items-center  ml-2">
                        <label className="mt-3" style={{fontSize: "16px"}}>Completed Date</label>
                        <div className="d-flex">
                            <CustomDatePicker clear={true} clearStyle={{position: "relative",top:"-36px",left: "90px"}} id="completedFrom" Date={new Date()}/>
                            <CustomDatePicker clear={true} clearStyle={{position: "relative",top:"-36px",left: "250px"}} id="completedTo" Date={new Date()}/>
                        </div>
                    </div>:""}
                    <div className="d-flex justify-content-around mt-4">
                        <button type="button" style={{width: "200px"}} onClick={this.showTable.bind(this)} className="btn btn-outline-success">Search</button>
                    </div>
                </Drawer>
                <main
                    className={classNames(classes.content)}
                    style={{marginTop: "45px"}}
                >
                    {this.state.showProgress?<div className="mod d-flex justify-content-center align-items-center"><img src={Loader} className="loader"/></div>:""}
                    {this.state.showTable?<DatatablePage defaultPaging={false} info={false} data={this.state.data} count={this.state.count} paging={this.paging.bind(this)} activePage={this.state.activePage} pageStart={this.state.pageStart}/>:""}

                </main>
            </div>
        );
    }
}

WelcomeCallReport.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(WelcomeCallReport);