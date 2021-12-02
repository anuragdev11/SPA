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
import Asynchronous from "../reusableComponents/AutoComplete";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FormGroup from "@material-ui/core/FormGroup";
import toastr from 'toastr'
import 'toastr/build/toastr.css'
import OSTable from "../reusableComponents/Table";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Loader from '../../assets/logos/PulseLoader.svg';
import {Event}  from '../../GoogleAnalytics';
import "./styles.css"
import CustomDatePicker from "../reusableComponents/DatePicker";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Ledger from "../../assets/logos/ledger.svg";
import History from "../../assets/logos/history.svg";
import Plus from "../../assets/logos/plus.png";
import AES from "../reusableComponents/Aes";
import DatatablePage from "../reusableComponents/MDTable";
import GetAppIcon from "@material-ui/icons/GetApp";
import Button from "@material-ui/core/Button";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const drawerWidth = 468;

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
    switchRoot: {
        width: 38,
        height: 22,
        padding: 0,
        margin: theme.spacing(1),
    },
    switchBase: {
        padding: 1,
        '&$checked': {
            transform: 'translateX(16px)',
            color: theme.palette.common.white,
            '& + $track': {
                backgroundColor: '#52d869',
                opacity: 1,
                border: 'none',
            },
        },
        '&$focusVisible $thumb': {
            color: '#52d869',
            border: '6px solid #fff',
        },
    },
    thumb: {
        width: 20,
        height: 20,
    },
    track: {
        borderRadius: 22 / 2,
        border: `1px solid ${theme.palette.grey[400]}`,
        backgroundColor: theme.palette.grey[400],
        opacity: 1,
        transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
});



class OSReport extends React.Component {


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
            assignTypeFlag: "1",
            myGroupChecked: true,
            myGroupCheckedFlag: false,
            pdcChecked: true,
            pdcCheckedFlag: false,
            employeeId: "",
            employeeIdFlag: "",
            exportEnable: true,            
            dueFrom: "",
            dueTo: "",
            withProposalChecked: true,
            withProposalCheckedFlag: true,
            dateType: "1",
            dateTypeFlag: "",
            IncomingChecked: false,
            IncomingCheckedFlag: false,
            OutgoingChecked: false,
            OutgoingCheckedFlag: false,
            osFrom: "0",
            osTo: "0",
            osChecked: false,
            atChecked: false,
            tables: [],
            ID: 0,
            Type: 0,
            Index: 0
        };
        this.showTable = this.showTable.bind(this)
    }

    handleGroupChange = () => {
        this.setState({myGroupChecked: !this.state.myGroupChecked})
        Event("MyGroup")
    };

    handleIncomingChange = () => {
        this.setState({IncomingChecked: !this.state.IncomingChecked})
        Event("Incoming")
    };

    handleOutgoingChange = () => {
        this.setState({OutgoingChecked: !this.state.OutgoingChecked})
        Event("Outgoing")
    };

    handleDateChange = (event) => {
    this.setState({dateType: event.target.value})
    Event("DateType")
    };

    handlePDCChange = () => {
        this.setState({pdcChecked: !this.state.pdcChecked})
        Event("PDC/Non PDC")
    };

    handleProposalChange = () => {
        this.setState({withProposalChecked: this.state.withProposalChecked})
        Event("With Proposal")
    };

    handleAssignChange = (event) => {
        this.setState({assignType: event.target.value})
        if(event.target.value === "1")
            Event("SalesAssignedTo")
        else
            Event("TeleAssignedTo")
    };


    handleStatusChange = (event) => {
        this.setState({status: event.target.value})
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
        document.title = "C2C Mis Report";
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
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        let dateArr = date.split("/")
        return dateArr[0]+"/"+months[dateArr[1]-1]+"/"+dateArr[2]
    }
    

    async showTable() {
        this.setState({exportEnable: true});
        
        const assigneeValue = document.getElementById("employee");        
        const isMyGroup = document.getElementById("MyGroup");
        const isMyDID = document.getElementById("MyDottedGroup").value;
        const isIncoming = document.getElementById("Incoming").value;
        const isOutgoing = document.getElementById("Outgoing").value;
        const isAnswered = document.getElementById("Answered").value;
        const isNotAnswered = document.getElementById("NotAnswered").value;
        const isOnDate = document.getElementById("OnDate").value;
        let glis = "0"
        let toDate = ""
        let fromDate
        if (!isOnDate){
            toDate =  document.getElementById("DateTo").value
            fromDate =  document.getElementById("DateFrom").value
        }else{
            let TodayDate = new Date()
            toDate =  TodayDate.getDate() + "-" + TodayDate.getMonth() + "-" + TodayDate.getFullYear()
            fromDate =  toDate
        }

        

        // if(this.state.IncomingChecked && !this.state.OutgoingChecked){
        //     dealType = 1
        // }

        // if(!this.state.IncomingChecked && this.state.OutgoingChecked){
        //     dealType = 2
        // }

        let myGroup = false;
        if (isMyGroup.checked) {
            myGroup = true;
        }

        let assigneeType = "";
        this.setState({showProgress: true, open: false});
        // await fetch('http://localhost:8989/c2cmisreport/v1/MisReport?empid=' + empID + '&glid=' + glid + '&Mygroup=' + myGroup + "&MyDID=" + isMyDID + '&strtDt=' + fromDate + "&endDt=" + toDate + + '&AK=' + AK, {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json'
        //     },
        // })
        //     .then(function (response) {
        //         return response.json()
        //     }).then(function (body) {
        //         if (body.status !== 200 && body.status !== 204) {
        //             toastr.error("Some error occured! Please try again")
        //         } else {
        //             if (body.status !== 204) {
        //                 bodyData = body
        //             }
        //             console.log(body)
        //         }
        //     }).catch(error => { toastr.error("Some error occured! Please try again") })




        const assigneeID = assigneeValue.value.substr(assigneeValue.value.lastIndexOf("-") + 2, assigneeValue.value.length - 1);
        const assigneeName = assigneeValue.value.substr(0, assigneeValue.value.lastIndexOf("-")-1);
        
        let dueFrom = document.getElementById("dueFrom").value;
        let dueTo = document.getElementById("dueTo").value;
        const dateType = this.state.dateType;

       

        if(dateType === "3" && (dueFrom === "" || dueTo === "" )){
            toastr.warning("Please fill due date")
            return
        }

       

        if(dateType === "3" && new Date(this.changeToDate(dueFrom))>new Date(this.changeToDate(dueTo))){
            toastr.warning("Start Date cannot be greater than End Date")
            return
        }

        



        Event("Search")
    }

    

    

    async paging(pageStart) {
        this.setState({exportEnable: true});
        const ID = this.state.ID;
        const Type = this.state.Type;
        const Index = this.state.Index;
        const assignCheck = this.state.assignTypeFlag;
        const isMyGroup = this.state.myGroupCheckedFlag;
        const osFrom = this.state.osFrom;
        const osTo = this.state.osTo;

        let dealType = 0;
        const pdc = this.state.pdcCheckedFlag?1:2;

        if(this.state.IncomingCheckedFlag && !this.state.OutgoingCheckedFlag){
            dealType = 1
        }

        if(!this.state.IncomingCheckedFlag && this.state.OutgoingCheckedFlag){
            dealType = 2
        }

        let myGroup = false;
        if (isMyGroup) {
            myGroup = true;
        }

        let assigneeType = "";
        if (assignCheck === "1") {
            assigneeType = "Sale";
        } else {
            assigneeType = "Tele";
        }



        const assigneeID = ID;
        let dueFrom = this.state.dueFrom;
        let dueTo = this.state.dueTo;
        const dateType = this.state.dateTypeFlag;

        

        if(dateType === "3" && (dueFrom === "" || dueTo === "" )){
            toastr.warning("Please fill due date")
            return
        }

        

        if(dateType === "3" && new Date(this.changeToDate(dueFrom))>new Date(this.changeToDate(dueTo))){
            toastr.warning("Start Date cannot be greater than End Date")
            return
        }

        function indianFormat(value){
            var res = value
            if(!isNaN(value)){
                var x=Math.round(value);
                x=x.toString();
                var afterPoint = '';
                if(x.indexOf('.') > 0)
                    afterPoint = x.substring(x.indexOf('.'),x.length);
                x = Math.floor(x);
                x=x.toString();
                var lastThree = x.substring(x.length-3);
                var otherNumbers = x.substring(0,x.length-3);
                if(otherNumbers != '')
                    lastThree = ',' + lastThree;
                res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
            }
            return res
        }

        dueFrom = this.changeToDate(dueFrom)
        dueTo = this.changeToDate(dueTo)

        const progressStatus = false;
        const empID = this.props.employeeid;
        const AK = this.props.AK;
        let bodyData = {};
        this.setState({showProgress: true, open: false});
        

        Event("Pagination")
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
                    
                    {/* <Button disabled={this.state.exportEnable} variant="contained" className="export" style={{width: "110px",position: "absolute",right: "20px",top: "7px"}} color="primary" onClick={this.exportToExcel.bind(this)}>
                        Export<GetAppIcon/>
                    </Button> */}
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
                    <Typography variant={"h6"} className={[classes.textColor,classes.typefont,"px-3 mt-4"]}>
                        Employee<span style={{color: "red"}}>*</span>
                    </Typography>
                    <IconButton onClick={this.handleDrawerOpen}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                    </div>
                    <Divider/>  
                    <FormGroup row className="mx-3">
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
                        <FormControlLabel
                            control={
                                <Checkbox
                                    id="MyDottedGroup"
                                    value="checkedB"
                                    color="primary"
                                    checked={this.state.myDottedGroupChecked}
                                    onChange={this.handleDottedGroupChange}

                                />
                            }
                            label="My DID"
                        />
                    </FormGroup>           
                    <div className="row">
                    <Asynchronous label="Search Employee*" id="employee" search="employee" className="mt-1 ml-3 pr-0 col-10" defaultValue={this.props.employeename +" - "+this.props.employeeid} employeeid={this.props.employeeid} AK={this.props.AK} menuid={7} fnsid={1014}/>
                    
                    </div>
                    <Typography variant={"h6"} className={[classes.textColor,classes.typefont,"px-3 mt-4"]}>
                        Call Type & Call Status
                    </Typography>
                    <Divider/>
                    
                    <FormGroup row class="mx-3 d-flex">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    id="Incoming"
                                    value="checkedB"
                                    color="primary"
                                    checked={this.state.IncomingChecked}
                                    onChange={this.handleIncomingChange}
                                />

                            }
                            style={{marginRight: "85px"}}
                            label="Incoming"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    id="Outgoing"
                                    value="checkedB"
                                    color="primary"
                                    checked={this.state.OutgoingChecked}
                                    onChange={this.handleNonMonthlyChange}
                                />

                            }
                            label="Outgoing"
                        />
                    </FormGroup>
                    <FormGroup row class="mx-3 d-flex">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    id="Answered"
                                    value="checkedB"
                                    color="primary"
                                    checked={this.state.answeredChecked}
                                    onChange={this.handleAnsweredChange}
                                />

                            }
                            style={{marginRight: "85px"}}
                            label="Answered"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    id="NotAnswered"
                                    value="checkedB"
                                    color="primary"
                                    checked={this.state.OutgoingChecked}
                                    onChange={this.handleNonMonthlyChange}
                                />

                            }
                            label="Not Answered"
                        />
                    </FormGroup>

                    <Typography variant={"h6"} className={[classes.textColor,classes.typefont,"px-3 mt-3"]}>
                        Date Filters<span style={{color: "red"}}>*</span>
                    </Typography>
                    <Divider/>
                    <FormControl component="fieldset" className="mx-3">
                        <RadioGroup aria-label="gender" value={this.state.dateType}>
                            <div className="d-flex justify-content-between align-items-center">
                                <FormControlLabel
                                    className="mb-0"
                                    value="1"
                                    control={<Radio id="OnDate" color="primary" />}
                                    label="As On Date"
                                    onClick={this.handleDateChange}
                                />
                            </div>
                            <div className="d-flex justify-content-between align-items-end" style={{marginTop: "-15px"}}>
                                <FormControlLabel
                                    className="mb-0"
                                    value="2"
                                    control={<Radio id="DateRange" color="primary" />}
                                    label="Entry Date"
                                    onClick={this.handleDateChange}
                                />
                                <div className="d-flex">
                                    <CustomDatePicker style={{width: "130px",marginRight: "10px"}} clearStyle={{position: "relative",left: "86px",top: "19px"}} calStyle={{position: "relative",left: "106px",top: "19px",zIndex: -1}} clear={true} id="DateFrom"/>
                                    <CustomDatePicker style={{width: "130px",marginRight: "10px"}} clearStyle={{position: "relative",left: "86px",top: "19px"}} calStyle={{position: "relative",left: "106px",top: "19px",zIndex: -1}} clear={true} id="DateTo"/>
                                </div>
                            </div>                            
                        </RadioGroup>
                    </FormControl>
                    <Typography variant={"h6"} className={[classes.textColor,classes.typefont,"px-3 mt-3"]}>
                        Feedback
                    </Typography>
                    <Divider/>
                    <div className="mx-3 mt-1 d-flex justify-content-between">
                    <FormControl style={{width: "150px",marginRight: "10px"}}>
                                    <Select
                                        value = {this.state.monthValue}
                                        displayEmpty
                                        className={classes.selectEmpty}
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        id="month"
                                        onChange={this.handleMonthChange}
                                    >                                        
                                        <MenuItem value={1}>Satisfied</MenuItem>
                                        <MenuItem value={2}>Not Satisfied</MenuItem>
                                        <MenuItem value={0}>Customer Not Responded</MenuItem>                                        
                                    </Select>
                                </FormControl>
                    </div>
                    <Typography variant={"h6"} className={[classes.textColor,classes.typefont,"px-3 mt-3"]}>
                        Feedback Type
                    </Typography>
                    <Divider/>
                    <div className="mx-3 mt-1 d-flex justify-content-between">
                    <FormGroup row class="mx-3 d-flex">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    id="Answered"
                                    value="checkedB"
                                    color="primary"
                                    checked={this.state.CallCenterChecked}
                                    onChange={this.handleAnsweredChange}
                                />

                            }
                            style={{marginRight: "85px"}}
                            label="Call Center"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    id="NotAnswered"
                                    value="checkedB"
                                    color="primary"
                                    checked={this.state.EmployeeChecked}
                                    onChange={this.handleNonMonthlyChange}
                                />

                            }
                            label="Employee"
                        />
                    </FormGroup>
                    </div>

                    <div className="d-flex justify-content-center mt-4">
                        <button type="button" style={{width: "200px"}} onClick={this.showTable} className="btn btn-outline-success">Search</button>
                    </div>
                </Drawer>
                <main
                    className={classNames(classes.content)}
                    style={{marginTop: "45px"}}
                >
                    {this.state.showProgress?<div className="mod d-flex justify-content-center align-items-center"><img src={Loader} height="100px" width="100px" className="loader"/></div>:""}
                    
                    {this.state.showTable?<div style={{marginTop: "20px"}}><DatatablePage className="ostable" style={{marginBottom: 0,paddingRight: 0}} innerStyle={{overflowX: "auto"}} defaultPaging={false} info={false} data={this.state.data} count={this.state.count} activePage={this.state.activePage} pageStart={this.state.pageStart} ospaging={this.paging.bind(this)} stripped={false}/></div>:""}
                </main>
            </div>
        );
    }
}

OSReport.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(OSReport);