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
import GetAppIcon from '@material-ui/icons/GetApp';
import {Event}  from '../../GoogleAnalytics';
import "./styles.css"

const drawerWidth = 330;

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



class SegmentationReport extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            open: false,
            showReport: false,
            showFilters: false,
            showTable: false,
            tableData: [],
            showProgress: false,
            data: {},
            count: 0,
            activePage: 0,
            pageStart: 1,
            assignType: "1",
            reportType: "3",
            myGroupChecked: true,
            myDottedGroupChecked: false,
            employeeId: "",
            exportEnable: true
        };
        this.showReportHandler = this.showReportHandler.bind(this);
        this.paging = this.paging.bind(this);
    }

    handleGroupChange = () => {
        this.setState({myGroupChecked: !this.state.myGroupChecked})
        Event("MyGroup")
    };

    handleDottedGroupChange = () => {
        this.setState({myDottedGroupChecked: !this.state.myDottedGroupChecked})
        Event("MyDottedGroup")
    }

    handleAssignChange = (event) => {
        this.setState({assignType: event.target.value})
        if(event.target.value === "1")
            Event("SalesAssignedTo")
        else
            Event("TeleAssignedTo")
    };

    handleReportChange = (event) => {
        this.setState({reportType: event.target.value})
        if(event.target.value === "3")
            Event("SegmentationReport")
        else
            Event("RenewalReport")
    };

    handleDrawerOpen = () => {
        if(this.state.open){
            Event("DrawerClose")
        }
        this.setState({open: !this.state.open});
    };

    showReportHandler = () => {
        this.setState({showReport: true});
    };

    componentWillMount() {
        document.title = "Segmentation Report";
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

    async showTable() {
        this.setState({exportEnable: true})
        const salesAssignCheck = document.getElementById("SalesAssign");
        const teleAssignCheck = document.getElementById("TeleAssign");
        const assigneeValue = document.getElementById("employee");
        const segmentReportCheck = document.getElementById("SegmentReport");
        const renewalReportCheck = document.getElementById("RenewalReport");
        const isMyGroup = document.getElementById("MyGroup");

        let myGroup = false;
        if (isMyGroup.checked) {
            myGroup = true;
        }

        const isMyDottedGroup = document.getElementById("MyDottedGroup");
        let myDottedGroup = false;
        if (isMyDottedGroup.checked) {
            myDottedGroup = true;
        }

        let reportType = 1;
        if (segmentReportCheck.checked) {
            reportType = 1;
        } else {
            reportType = 2;
        }

        let assigneeType = "";
        if (salesAssignCheck.checked) {
            assigneeType = "Sale";
        } else {
            assigneeType = "CC";
        }

        const assigneeID = assigneeValue.value.substr(assigneeValue.value.lastIndexOf("-") + 2, assigneeValue.value.length - 1)
        this.setState({employeeId:assigneeID})
        if (!salesAssignCheck.checked && !teleAssignCheck.checked) {
            
            toastr.warning("Please select Assigned To")
        } else {
            if (assigneeValue.value === "") {
                
                toastr.warning("Assignee Name Cannot be blank")
            } else {
                if (!segmentReportCheck.checked && !renewalReportCheck.checked) {
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
                    }
                    toastr.warning("Please select Report Type")
                } else {
                    const progressStatus = false;
                    const empID = this.props.employeeid;
                    const AK = this.props.AK;
                    let bodyData = {};
                    this.setState({showProgress: true, showTable: false, open: false,pageStart: 1,activePage: 0});
                    await fetch('https://merp.intermesh.net/go/report/v1/segmentation?empid=' + empID + '&renewal=' + reportType + '&isMyDottedGroup=' + myDottedGroup + '&searchtype=' + assigneeType + '&start=1&isMyGroup=' + myGroup + '&end=11&requestfrom=WEBERP&assignedTo=' + assigneeID + '&AK=' + AK +"&isExport=0", {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json'
                        },
                    })
                        .then(function (response) {
                            return response.json()
                        }).then(function (body) {
                            if (body.status === 500) {
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
                                }
                                toastr.error(body.message)
                            } else {
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
                        if (bodyData.data.segmentationData)
                            data = bodyData.data.segmentationData
                        else
                            data = bodyData.data.renewalData
                        Object.keys(data[0]).map(function (val) {

                            if(val !== "COMPANYID") {
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

                                if(key === "COMPANYID"){
                                    newRow['Action']  = [<div className="d-flex"><img src={Ledger} style={{width: "20px",height: "20px",cursor: "pointer",marginRight: "10px"}} title="Client Ledger" onClick={()=>{window.open('http://weberp.intermesh.net/STS/STSDetpopup.aspx?comp_id='+val[key]+'&ISCL=1','_blank','toolbar=no,location=0,directories=no,status=no,menubar=no,titlebar=no,scrollbars=yes,resizable=no,copyhistory=no,width=905,height=565,left=300,top=200,screenX=150,screenY=100')}}/><img src={History} style={{width: "20px",height: "20px",cursor: "pointer"}} title="STS" onClick={()=>{window.open('http://weberp.intermesh.net/STS/STSDetpopup.aspx?comp_id='+val[key],'_blank','toolbar=no,location=no,directories=no,status=no,scrollbars=yes,resizable=yes,copyhistory=no,width=905,height=565,left=150,top=100,screenX=150,screenY=100')}}/></div>]}else {
                                    newRow[key] = val[key] === null || val[key] === "" ? "N/A" : val[key];
                                }
                            });
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
            }
        }

        Event("Search")
    }

    async exportToExcel() {
        const assigneeID = this.state.employeeId
        const assignCheck = this.state.assignType
        const reportType = this.state.reportType-2;
        const myGroup = this.state.myGroupChecked;
        const myDottedGroup = this.state.myDottedGroupChecked;

        let assigneeType = "";
        if (assignCheck === "1") {
            assigneeType = "Sale";
        } else {
            assigneeType = "CC";
        }

                    const progressStatus = false;
                    const empID = this.props.employeeid;
                    const AK = this.props.AK;
                    let bodyData = {};
                    this.setState({showProgress: true, showTable: false, open: false,pageStart: 1,activePage: 0});
                    await fetch('https://merp.intermesh.net/go/report/v1/segmentation?empid=' + empID + '&renewal=' + reportType + '&isMyDottedGroup=' + myDottedGroup + '&searchtype=' + assigneeType + '&start=1&isMyGroup=' + myGroup + '&end=11&requestfrom=WEBERP&assignedTo=' + assigneeID + '&AK=' + AK +"&isExport=1", {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json'
                        },
                    })
                        .then(function (response) {
                            return response.json()
                        }).then(function (body) {
                            if (body.status === 500) {
                                toastr.error("Some error occurred! Please try again later")
                            } else {
                                toastr.success("Your request has been successfully queued. You will receive an email shortly.");
                            }
                        }).catch(error => console.log("Error"))
                        await this.setState({showProgress: progressStatus, open: true,showTable: false});

                        Event("Export")
                }


    async paging(pageStart) {

        const assigneeID = this.state.employeeId
        const assignCheck = this.state.assignType
        const reportType = this.state.reportType-2;
        const myGroup = this.state.myGroupChecked;
        const myDottedGroup = this.state.myDottedGroupChecked;

        let assigneeType = "";
        if (assignCheck === "1") {
            assigneeType = "Sale";
        } else {
            assigneeType = "CC";
        }



        const progressStatus = false;
                    const empID = this.props.employeeid;
                    const AK = this.props.AK;
                    let bodyData = {};
            this.setState({showProgress: true, open: false});
            await fetch('https://merp.intermesh.net/go/report/v1/segmentation?empid=' + empID + '&renewal=' + reportType + '&isMyDottedGroup=' + myDottedGroup + '&searchtype=' + assigneeType + '&start='+pageStart+'&isMyGroup=' + myGroup + '&end='+(pageStart+10)+'&requestfrom=WEBERP&assignedTo=' + assigneeID + '&AK=' + AK + '&isExport=0', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json'
                        },
                    })
                        .then(function (response) {
                            return response.json()
                        }).then(function (body) {
                            if (body.status === 500) {
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
                                }
                                toastr.error(body.message)
                            } else {
                                if (body.status !== 204) {
                                    bodyData = body
                                    console.log(bodyData)
                                }

                            }
                        }).catch(error => {toastr.options = {
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
                        }
                    toastr.error("Some error occurred please try again!")})

                    if(bodyData.data) {
                        this.setState({activePage: Math.floor(pageStart/10),pageStart: pageStart});
                        let columns = [];
                        let count = bodyData.data.count;
                        let data = [];
                        if (bodyData.data.segmentationData)
                            data = bodyData.data.segmentationData
                        else
                            data = bodyData.data.renewalData
                        Object.keys(data[0]).map(function (val) {
                            if(val !== "COMPANYID") {
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

                            if(key === "COMPANYID"){
                                newRow['Action']  = [<div className="d-flex"><img src={Ledger} style={{width: "20px",height: "20px",cursor: "pointer",marginRight: "10px"}} title="Client Ledger" onClick={()=>{window.open('http://weberp.intermesh.net/STS/STSDetpopup.aspx?comp_id='+val[key]+'&ISCL=1','_blank','toolbar=no,location=0,directories=no,status=no,menubar=no,titlebar=no,scrollbars=yes,resizable=no,copyhistory=no,width=905,height=565,left=300,top=200,screenX=150,screenY=100')}}/><img src={History} style={{width: "20px",height: "20px",cursor: "pointer"}} title="STS" onClick={()=>{window.open('http://weberp.intermesh.net/STS/STSDetpopup.aspx?comp_id='+val[key],'_blank','toolbar=no,location=no,directories=no,status=no,scrollbars=yes,resizable=yes,copyhistory=no,width=905,height=565,left=150,top=100,screenX=150,screenY=100')}}/></div>]
                            }else {
                                newRow[key] = val[key] === null || val[key] === "" ? "N/A" : val[key];
                            }
                            });
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
                    {this.state.open?"":<div className="d-flex align-items-center h-100" style={{backgroundColor:"#00A699",padding: "10px",position: "absolute",left: "50px"}}><Typography variant="h6">Segmentation Report</Typography></div>}
                    <Button disabled={this.state.exportEnable} variant="contained" className="export" style={{width: "110px",position: "absolute",right: "20px",top: "10px"}} color="primary" onClick={this.exportToExcel.bind(this)}>
                        Export<GetAppIcon/>
                    </Button>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className="d-flex justify-content-between">
                    <Typography variant={"h6"} className={[classes.textColor,classes.typefont,"px-3 mt-2"]}>
                        Group Type
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
                            label="My Dotted Group"
                        />
                    </FormGroup>
                    <Asynchronous label="Search Employee*" id="employee" search="employee" className="mx-3" defaultValue={this.props.employeename +" - "+this.props.employeeid} employeeid={this.props.employeeid} AK={this.props.AK} menuid={102} fnsid={227}/>
                    <Typography variant={"h6"} className={[classes.textColor,classes.typefont,"px-3 mt-4"]}>
                        Assigned To<span style={{color: "red"}}>*</span>
                    </Typography>
                    <Divider/>
                    <FormControl component="fieldset" className="mx-3">
                        <RadioGroup aria-label="gender" value={this.state.assignType} onChange={this.handleAssignChange}>
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
                        </RadioGroup>
                    </FormControl>
                    <Typography variant={"h6"} className={[classes.textColor,classes.typefont,"px-3 mt-2"]}>
                        Type<span style={{color: "red"}}>*</span>
                    </Typography>
                    <Divider/>
                    <FormControl component="fieldset" className="mx-3">
                        <RadioGroup aria-label="gender" value={this.state.reportType} onChange={this.handleReportChange}>
                            <FormControlLabel
                                value="3"
                                control={<Radio id="SegmentReport" color="primary" />}
                                label="Non-Renewal Segment"
                            />
                            <FormControlLabel
                                value="4"
                                control={<Radio id="RenewalReport" color="primary" />}
                                label="Renewal Segment"
                            />
                        </RadioGroup>
                    </FormControl>
                    <div className="d-flex justify-content-around mt-2">
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

SegmentationReport.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SegmentationReport);