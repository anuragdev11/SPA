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
import MenuIcon from '@material-ui/icons/Menu'
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
import Loader from '../../assets/logos/OldPulseLoader.svg';
import ExportLoader from '../../assets/logos/ExportLoader.svg';
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import CustomDatePicker from "../reusableComponents/DatePicker";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {Event} from "../../GoogleAnalytics";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ReceiptIcon from '@material-ui/icons/Receipt';
import LeakAddIcon from '@material-ui/icons/LeakAdd';
import LeakRemoveIcon from '@material-ui/icons/LeakRemove';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import GetAppIcon from "@material-ui/icons/GetApp";
import Button1 from '@material-ui/core/Button';
import Button from "react-bootstrap/Button";
import "./styles.css"


const drawerWidth = 550;

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

let options = []

class NSDReport extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            employeeId: 0,
            months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ],
            open: false,
            showReport: false,
            showFilters: false,
            showTable: false,
            showInnerTable: false,
            tableData: [],
            innerTableData: [],
            exportData: [],
            showProgress: false,
            data: {},
            dataInner: {},
            dataExport: {},
            count: 0,
            activePage: 0,
            pageStart: 1,
            pendingChecked: true,
            clearedChecked: true,
            bouncedChecked: true,
            cancelledChecked: true,
            pendingCheckedStored: true,
            clearedCheckedStored: true,
            bouncedCheckedStored: true,
            cancelledCheckedStored: true,
            showDataFor: "1",
            showDataForStored: "1",
            entryDate: "3",
            entryDateStored: "3",
            onDateValue: "",
            betweenFromValue: "",
            betweenToValue: "",
            monthValue : new Date().getMonth(),
            monthValueStored: new Date().getMonth(),
            yearValue: 0,
            yearValueStored: 0,
            weekValue: options[0],
            weekValueStored: options[0],
            totalRecords: false,
            searchId: 0,
            colIndex: 0,
            isTotal: false,
            exporting: false,
            detailExport: false,
            sumaryExport: false
        };
        this.handleColClick = this.handleColClick.bind(this);
    }

    handleDrawerOpen = () => {
        this.setState({open: !this.state.open});
    };

    handleShowDataForChange = (event) => {
        this.setState({showDataFor: event.target.value})
        Event("ShowDataFor")
    };

    handleDateChange = (event) => {
        this.setState({entryDate: event.target.value})
        Event("DateType")
    };

    handlePendingChange = () => {
        this.setState({pendingChecked: !this.state.pendingChecked})
        Event("Pending")
    };

    handleClearedChange = () => {
        this.setState({clearedChecked: !this.state.clearedChecked})
        Event("Cleared")
    };


    handleBouncedChange = () => {
        this.setState({bouncedChecked: !this.state.bouncedChecked})
        Event("Bounced")
    };

    handleCancelledChange = () => {
        this.setState({cancelledChecked: !this.state.cancelledChecked})
        Event("Cancelled")
    };

    handleMonthChange = (event) => {
        this.setState({monthValue: event.target.value})
        Event("Month")
    };

    handleYearChange = (event) => {
        this.setState({yearValue: event.target.value})
        Event("Year")
    };

    handleWeekChange = (event) => {
        this.setState({weekValue: event.target.value})
        Event("Week")
    };

    async handleColClick(searchId,colIndex,isTotal) {
        if(isTotal){
            Event("TotalInnerData")
        }else {
            Event("InnerData");
        }
        this.setState({exportEnable: true,searchId: searchId,colIndex: colIndex,isTotal: isTotal})
        const assigneeID = this.state.employeeId;
        const entryDate = this.state.entryDateStored;
        const showDataFor = isTotal?-1:this.state.showDataForStored;
        const isPending = this.state.pendingCheckedStored;
        const isCleared = this.state.clearedCheckedStored;
        const isBounced = this.state.bouncedCheckedStored;
        const isCancelled = this.state.cancelledCheckedStored;
        const onDateValue = this.changeToDate(this.state.onDateValue);
        const betweenFrom = this.changeToDate(this.state.betweenFromValue);
        const betweenTo = this.changeToDate(this.state.betweenToValue);
        const month = this.state.months[this.state.monthValueStored];
        const year = new Date().getFullYear() - this.state.yearValueStored;
        const week = this.state.weekValueStored;
        let pending = 0;
        if (isPending) {
            pending = 1;
        }

        let cleared = 0;
        if (isCleared) {
            cleared = 1;
        }

        let bounced = 0;
        if (isBounced) {
            bounced = 1;
        }

        let cancelled = 0;
        if (isCancelled) {
            cancelled = 1;
        }


                    const progressStatus = false;
                    const empID = this.props.employeeid;
                    const AK = this.props.AK;
                    let datePart = "";
                    if(entryDate === "1"){
                        datePart = "&onDateValue="+onDateValue
                    }
                    if(entryDate === "2"){
                        datePart = "&betweenfromvalue="+betweenFrom+"&betweentovalue="+betweenTo
                    }
                    if(entryDate === "3"){
                        datePart = "&fromthemonthofmonthvalue="+month+"&fromthemonthofyearvalue="+year
                    }
                    if(entryDate === "4"){
                        datePart = "&fortheweekofvalue="+week
                    }

                    let bodyData = {};
                    this.setState({showProgress: true, showInnerTable: false, open: false, });
                    await fetch("https://merp.intermesh.net/go/report/v1/nsd?ischild=1&serviceid="+searchId+"&servicetype="+colIndex+"&employee="+assigneeID+"&pending="+pending+"&cleared="+cleared+"&bounced="+bounced+"&cancelled="+cancelled+"&showdatafor="+showDataFor+"&entrydate="+entryDate+"&empid="+empID+"&AK="+AK+datePart, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json'
                        },
                    })
                        .then(function (response) {
                            return response.json()
                        }).then(function (body) {
                            if (body.status === 500) {

                                toastr.error("Some error occured! Please try again")
                            } else {

                                toastr.success(body.message);
                                if (body.status !== 204) {
                                    bodyData = body
                                }

                            }
                        }).catch(error => toastr.error("Some error occured! Please try again"))

                    if (bodyData.data) {
                        let columns = [];
                        let count = bodyData.data.count;
                        let data = [];
                        let isEmp = false;
                        data = bodyData.data.nsdreportdata
                        columns.push({
                            label: "SN",
                            field: "SN",
                            width: 100
                        });
                        Object.keys(data[0]).map(function (val) {
                            let coulmn = ""
                            if (val === "fk_glusr_usr_id") {
                                coulmn = "GL ID"
                            }
                            if (val === "companyname") {
                                coulmn = "Company Name"
                            }
                            if (val === "ar_recpt_id") {
                                coulmn = "Receipt"
                            }
                            if (val === "entry_date") {
                                coulmn = "Entered On"
                            }
                            if (val === "recpt_status") {
                                coulmn = "Status"
                            }
                            if(val === "recpt_amt"){
                                coulmn = "Amount"
                            }
                            if(val === "sale_status"){
                                coulmn = "Sale Status"
                            }
                            if(val === "ar_recpt_type"){
                                coulmn = "Type"
                            }
                            let newColumn = {
                                label: coulmn,
                                field: val,
                                width: 100
                            };

                            columns.push(newColumn)
                        });


                        let rows = [];
                        let sn = 1;
                        data.map(function (val) {
                            let newRow = {}
                            newRow["SN"] = sn;
                            sn++;
                            Object.keys(val).map(function (key) {
                                if (key === "fk_glusr_usr_id") {
                                    newRow[key] = val[key] === null || val[key] === "" ? "N/A" : <a href="javascript:void(0)" onClick={function () {
                                        window.open('http://weberp.intermesh.net/STS/STSDetpopup.aspx?glid='+val["fk_glusr_usr_id"],'_blank','toolbar=no,location=0,directories=no,status=no,menubar=no,titlebar=no,scrollbars=yes,resizable=no,copyhistory=no,width=905,height=565,left=300,top=200,screenX=150,screenY=100')
                                    }}>{val[key]}</a>;
                                }else {
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
                            showInnerTable: true,
                            innerTableData: bodyData.data.nsdreportdata,
                            dataInner: completeData,
                            exportEnable: false
                        });
                        window.scrollTo(0,document.body.scrollHeight);
                    }else {
                        await this.setState({showProgress: progressStatus, exportEnable: true});
                    }

    }

    async handleExport() {
        Event("ExportDetails")
        this.setState({exporting: true,detailExport: true})
        const searchId = this.state.searchId;
        const colIndex = this.state.colIndex;
        const isTotal = this.state.isTotal;
        const assigneeID = this.state.employeeId;
        const entryDate = this.state.entryDateStored;
        const showDataFor = isTotal?-1:this.state.showDataForStored;
        const isPending = this.state.pendingCheckedStored;
        const isCleared = this.state.clearedCheckedStored;
        const isBounced = this.state.bouncedCheckedStored;
        const isCancelled = this.state.cancelledCheckedStored;
        const onDateValue = this.changeToDate(this.state.onDateValue);
        const betweenFrom = this.changeToDate(this.state.betweenFromValue);
        const betweenTo = this.changeToDate(this.state.betweenToValue);
        const month = this.state.months[this.state.monthValueStored];
        const year = new Date().getFullYear() - this.state.yearValueStored;
        const week = this.state.weekValueStored;
        let pending = 0;
        if (isPending) {
            pending = 1;
        }

        let cleared = 0;
        if (isCleared) {
            cleared = 1;
        }

        let bounced = 0;
        if (isBounced) {
            bounced = 1;
        }

        let cancelled = 0;
        if (isCancelled) {
            cancelled = 1;
        }


        const progressStatus = false;
        const empID = this.props.employeeid;
        const AK = this.props.AK;
        let datePart = "";
        if(entryDate === "1"){
            datePart = "&onDateValue="+onDateValue
        }
        if(entryDate === "2"){
            datePart = "&betweenfromvalue="+betweenFrom+"&betweentovalue="+betweenTo
        }
        if(entryDate === "3"){
            datePart = "&fromthemonthofmonthvalue="+month+"&fromthemonthofyearvalue="+year
        }
        if(entryDate === "4"){
            datePart = "&fortheweekofvalue="+week
        }

        let bodyData = {};
        this.setState({open: false});
        await fetch("https://merp.intermesh.net/go/report/v1/nsd?isExport=1&ischild=1&serviceid="+searchId+"&servicetype="+colIndex+"&employee="+assigneeID+"&pending="+pending+"&cleared="+cleared+"&bounced="+bounced+"&cancelled="+cancelled+"&showdatafor="+showDataFor+"&entrydate="+entryDate+"&empid="+empID+"&AK="+AK+datePart, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
        })
            .then(function (response) {
                return response.json()
            }).then(function (body) {
                if (body.status === 500) {
                    console.log(body.statusMessage)
                    toastr.error("Some error occured! Please try again")
                } else {

                    toastr.success("Export Completed");
                    if (body.status !== 204) {
                        bodyData = body
                    }

                }
            }).catch(error => toastr.error("Some error occured! Please try again"))

        if (bodyData.data) {
            let columns = [];
            let count = bodyData.data.count;
            let data = [];
            let isEmp = false;
            data = bodyData.data.nsdreportdata
            columns.push({
                label: "SN",
                field: "SN",
                width: 100
            });
            let columnSequence = ["GL USER ID","Company","Receipt","Entered On","Receipt Status","Receipt Amount","Sale Status","Type","Proforma ID","Location ID","Executive ID","Claimed By ID","TL ID","Branch Manager ID","Regional Manager ID","Zonal Manager ID","Executive","Claimed By","Claimed Location","TL","Branch Manager","Regional Manager","Zonal Manager","Hosting Date"];
            columnSequence.map(function (val) {
                let newColumn = {
                    label: val,
                    field: val,
                    width: 100
                };

                columns.push(newColumn)
            });


            let rows = [];
            let sn = 1;
            data.map(function (val) {
                let newRow = {}
                newRow["SN"] = sn;
                sn++;
                Object.keys(val).map(function (key) {
                        newRow[key] = val[key] === null || val[key] === "" ? "N/A" : val[key];
                });
                rows.push(newRow)
            });


            let completeData = {
                columns: columns,
                rows: rows
            };
            await this.setState({
                exportData: bodyData.data.nsdreportdata,
                dataExport: completeData,
                exporting: false,
                detailExport: false
            });
            this.exportToExcel("Detail")
        }else {
            await this.setState({showProgress: progressStatus, exportEnable: true,exporting: false,detailExport: false});
        }

    }


    componentWillMount() {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        let date = new Date("02-APR-2012");
        let curr = new Date();
        curr = new Date(curr.setDate(curr.getDate()-curr.getDay()+7))
        for(let i = date;i<=curr;){
            let first = new Date(i.setDate(i.getDate()-i.getDay()+1))
            let last = new Date(i.setDate(i.getDate()-i.getDay()+7))
            options.push((first.getDate()>=10?first.getDate():("0"+first.getDate()))+"-"+monthNames[first.getMonth()]+"-"+first.getFullYear()+" To "+(last.getDate()>=10?last.getDate():("0"+last.getDate()))+"-"+monthNames[last.getMonth()]+"-"+last.getFullYear());
            i = new Date(i.setDate(i.getDate()+6));
        }

        options = options.reverse()
        this.setState({weekValue: options[0]})

        document.title = "NSD Report"
    }


    componentDidMount() {
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
        this.setState({open:true,employeeId: this.props.employeeid});
    }

     exportToExcel(tableId){
        if(tableId === "Summary"){
            Event("ExportSummary")
        }
        this.setState({sumaryExport: true,exporting: false});
        var downloadurl;
        var dataFileType = 'application/vnd.ms-excel';
        var tableSelect = document.getElementById(tableId);
        var tableHTMLData = tableSelect.outerHTML.replace(/ /g, '%20');

        // Specify file name
        var filename = "NSD_SALES_"+tableId+"_"+new Date("2015-03-25T12:00:00Z")+".xls";

        // Create download link element
        downloadurl = document.createElement("a");

        document.body.appendChild(downloadurl);

        if(navigator.msSaveOrOpenBlob){
            var blob = new Blob(['\ufeff', tableHTMLData], {
                type: dataFileType
            });
            navigator.msSaveOrOpenBlob( blob, filename);
        }else{
            // Create a link to the file
            downloadurl.href = 'data:' + dataFileType + ', ' + tableHTMLData;

            // Setting the file name
            downloadurl.download = filename;

            //triggering the function
            downloadurl.click();
        }
         this.setState({sumaryExport: false,exporting: false})
    }

    changeToDate(date) {
        let dateArr = date.split("/")
        return dateArr[1]+"/"+dateArr[0]+"/"+dateArr[2]
    }

    async showTable() {
        Event("Search")
        this.setState({exportEnable: true})
        const assigneeValue = document.getElementById("employee");
        const entryDate = this.state.entryDate;
        const showDataFor = this.state.showDataFor;
        const isPending = document.getElementById("Pending");
        const isCleared = document.getElementById("Cleared");
        const isBounced = document.getElementById("Bounced");
        const isCancelled = document.getElementById("Cancelled");
        const onDateValue = document.getElementById("OnDateValue").value;
        const betweenFrom = document.getElementById("betweenFrom").value;
        const betweenTo = document.getElementById("betweenTo").value;
        const month = this.state.months[this.state.monthValue];
        const year = new Date().getFullYear() - this.state.yearValue;
        const week = this.state.weekValue;
        let pending = 0;
        if (isPending.checked) {
            pending = 1;
        }

        let cleared = 0;
        if (isCleared.checked) {
            cleared = 1;
        }

        let bounced = 0;
        if (isBounced.checked) {
            bounced = 1;
        }

        let cancelled = 0;
        if (isCancelled.checked) {
            cancelled = 1;
        }

        let date1 = new Date(this.changeToDate(betweenFrom));
        let date2 = new Date(this.changeToDate(betweenTo));
        let Difference_In_Time = date2.getTime() - date1.getTime();
        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

        const assigneeID = assigneeValue.value.substr(assigneeValue.value.lastIndexOf("-") + 2, assigneeValue.value.length - 1)
        this.setState({employeeId:assigneeID})

        if (assigneeValue.value === "") {
                toastr.warning("Assignee Name Cannot be blank")
            }else {
            if (entryDate === "1" && document.getElementById("OnDateValue").value === "" ) {
                toastr.warning("Please fill the date")
            } else {
                if (entryDate === "2" && (document.getElementById("betweenFrom").value === "" || document.getElementById("betweenTo").value === "")) {
                    toastr.warning("Please fill both the dates")
                } else {
                    if (entryDate === "2" && (date1 > date2)) {
                        toastr.warning("End date should be greater than Start date")
                    } else {
                        if (entryDate === "2" && (Difference_In_Days > 30)) {
                            toastr.warning("Please select a Date Range not more than 31 Days")
                        } else {
                            if (entryDate === "2" && (date1 < new Date("04/01/2018"))) {
                                toastr.warning("Please select date from 1st April 2018")
                            } else {
                                const progressStatus = false;
                                const empID = this.props.employeeid;
                                const AK = this.props.AK;
                                let datePart = "";
                                if (entryDate === "1") {
                                    this.setState({onDateValue: onDateValue})
                                    datePart = "&onDateValue=" + this.changeToDate(onDateValue)
                                }
                                if (entryDate === "2") {
                                    this.setState({betweenFromValue: betweenFrom})
                                    this.setState({betweenToValue: betweenTo})
                                    datePart = "&betweenfromvalue=" + this.changeToDate(betweenFrom) + "&betweentovalue=" + this.changeToDate(betweenTo)
                                }
                                if (entryDate === "3") {
                                    datePart = "&fromthemonthofmonthvalue=" + month + "&fromthemonthofyearvalue=" + year
                                }
                                if (entryDate === "4") {
                                    datePart = "&fortheweekofvalue=" + week
                                }

                                this.setState({
                                    pendingCheckedStored: this.state.pendingChecked,
                                    clearedCheckedStored: this.state.clearedChecked,
                                    bouncedCheckedStored: this.state.bouncedChecked,
                                    cancelledCheckedStored: this.state.cancelledChecked,
                                    showDataForStored: this.state.showDataFor,
                                    entryDateStored: this.state.entryDate,
                                    monthValueStored: this.state.monthValue,
                                    weekValueStored: this.state.weekValue,
                                    yearValueStored: this.state.yearValue
                                });

                                let bodyData = {};
                                this.setState({
                                    showProgress: true,
                                    showTable: false,
                                    showInnerTable: false,
                                    open: false,
                                });
                                await fetch("https://merp.intermesh.net/go/report/v1/nsd?ischild=0&employee=" + assigneeID + "&pending=" + pending + "&cleared=" + cleared + "&bounced=" + bounced + "&cancelled=" + cancelled + "&showdatafor=" + showDataFor + "&entrydate=" + entryDate + "&empid=" + empID + "&AK=" + AK + datePart, {
                                    method: 'POST',
                                    headers: {
                                        'Accept': 'application/json'
                                    },
                                })
                                    .then(function (response) {
                                        return response.json()
                                    }).then(function (body) {
                                        if (body.status === 500) {

                                            toastr.error("Some error occured! Please try again")
                                        } else {

                                            toastr.success(body.message);
                                            if (body.status !== 204) {
                                                bodyData = body
                                            }

                                        }
                                    }).catch(error => toastr.error("Some error occured! Please try again"))

                                if (bodyData.data) {
                                    let columns = [];
                                    let count = bodyData.data.count;
                                    let data = [];
                                    let isEmp = false;
                                    data = bodyData.data.nsdreportdata
                                    columns.push({
                                        label: "SN",
                                        field: "SN",
                                        width: 100
                                    });
                                    Object.keys(data[0]).map(function (val) {

                                            let column = "";
                                            val.split("_").forEach(function (value) {
                                                column += value.charAt(0).toUpperCase() + value.slice(1) + " "
                                            });
                                            if(val === "ename" || val === "location_name"){
                                                column = "Name";
                                            }
                                            if (val === "eid" || val === "location_id") {
                                                if (val === "eid") {
                                                    isEmp = true;
                                                }
                                                column = "ID"
                                            }
                                            let newColumn = {
                                                label: column,
                                                field: val,
                                                width: 100
                                            };

                                            columns.push(newColumn)

                                    });


                                    let rows = [];
                                    let handleClick = this.handleColClick;
                                    let sn = 1;
                                    data.map(function (val) {
                                        let newRow = {};
                                        newRow["SN"] = sn;
                                        sn++;
                                        Object.keys(val).map(function (key) {
                                            let columnIndex = ""
                                            if (key === "sale") {
                                                columnIndex = "1"
                                            }
                                            if (key === "total_receipts") {
                                                columnIndex = "2"
                                            }
                                            if (key === "hosting_count") {
                                                columnIndex = "3"
                                            }
                                            if (key === "leakage_count") {
                                                columnIndex = "4"
                                            }
                                            if (key === "leakage_removed") {
                                                columnIndex = "5"
                                            }

                                            if (key === "sale" || key === "hosting_count" || key === "leakage_count" || key === "total_receipts" || key === "leakage_removed") {
                                                newRow[key] = val[key] === null || val[key] === "" ? "N/A" : (val[key] === 0 ? val[key] :
                                                    <a style={{fontColor: "#00A699"}} href="javascript:void(0)"
                                                       id={columnIndex}
                                                       onClick={function () {
                                                           console.log(val["eid"]===undefined)
                                                           console.log(isEmp)
                                                           handleClick(isEmp ? val["eid"]: val["location_id"], columnIndex, false)
                                                       }}>{val[key]}</a>);
                                            } else {
                                                newRow[key] = val[key] === null || val[key] === "" || val[key] === "-1" ? "N/A" : val[key];
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
                                        tableData: bodyData.data.nsdreportdata,
                                        data: completeData,
                                        count: count,
                                        exportEnable: false,
                                        totalRecords: true
                                    });

                                    document.getElementById("ts").innerHTML = " " + bodyData.data.total.total_sales;
                                    if (bodyData.data.total.total_sales === "0") {
                                        document.getElementById("ts").parentElement.onclick = function () {
                                        }
                                    }

                                    document.getElementById("tr").innerHTML = " " + bodyData.data.total.total_receipts;
                                    if (bodyData.data.total.total_receipts === "0") {
                                        document.getElementById("tr").parentElement.onclick = function () {
                                        }
                                    }

                                    document.getElementById("th").innerHTML = " " + bodyData.data.total.total_hosting;
                                    if (bodyData.data.total.total_hosting === "0") {
                                        document.getElementById("th").parentElement.onclick = function () {
                                        }
                                    }

                                    document.getElementById("tl").innerHTML = " " + bodyData.data.total.total_leakage;
                                    if (bodyData.data.total.total_leakage === "0") {
                                        document.getElementById("tl").parentElement.onclick = function () {
                                        }
                                    }

                                    document.getElementById("tlr").innerHTML = " " + bodyData.data.total.total_leakage_removed;
                                    if (bodyData.data.total.total_leakage_removed === "0") {
                                        document.getElementById("tlr").parentElement.onclick = function () {
                                        }
                                    }

                                    document.getElementById("tlp").innerHTML = " " + bodyData.data.total.total_leakage_percent;
                                    if (bodyData.data.total.total_leakage_percent === "0") {
                                        document.getElementById("tlp").parentElement.onclick = function () {
                                        }
                                    }


                                } else
                                    await this.setState({showProgress: progressStatus, open: true, exportEnable: true});

                            }
                        }
                    }
                }
            }
        }
    }


    render() {

        const hd_logo =  {
            backgroundImage: "url(https://utils.imimg.com/globalhf/hrd-sp-v25.png)",
            backgroundRepeat: "no-repeat",
            height: "40px",
            backgroundPosition: "0 1px",
            display: "block",
            textIndent: "-99999px",
            width: "150px",
            backgroundSize: "235%"

        }
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
                        {this.state.open?"":<div className="d-flex align-items-center h-100" style={{backgroundColor:"#00A699",padding: "10px",position: "absolute",left: "50px"}}><Typography variant="h6">NSD Report</Typography></div>}
                    </Toolbar>
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
                        Employee<span style={{color: "red"}}>*</span>
                    </Typography>
                    <IconButton onClick={this.handleDrawerOpen}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                    </div>
                    <Divider/>
                    <Asynchronous label="Search Employee*" id="employee" search="employee" className="mx-3 mt-3" defaultValue={this.props.employeename +" - "+this.props.employeeid} employeeid={this.props.employeeid} AK={this.props.AK} menuid={168} fnsid={947}/>
                    <Typography variant={"h6"} className={[classes.textColor,classes.typefont,"px-3 mt-3"]}>
                        Group Type
                    </Typography>
                    <Divider/>
                    <FormGroup row className="mx-3">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    id="Pending"
                                    value="Pending"
                                    color="primary"
                                    checked={this.state.pendingChecked}
                                    onChange={this.handlePendingChange}
                                />
                            }
                            label="Pending"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    id="Cleared"
                                    value="Cleared"
                                    color="primary"
                                    checked={this.state.clearedChecked}
                                    onChange={this.handleClearedChange}
                                />
                            }
                            label="Cleared"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    id="Bounced"
                                    value="Bounced"
                                    color="primary"
                                    checked={this.state.bouncedChecked}
                                    onChange={this.handleBouncedChange}
                                />
                            }
                            label="Bounced"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    id="Cancelled"
                                    value="Cancelled"
                                    color="primary"
                                    checked={this.state.cancelledChecked}
                                    onChange={this.handleCancelledChange}
                                />
                            }
                            label="Cancelled"
                        />
                    </FormGroup>
                    <Typography variant={"h6"} className={[classes.textColor,classes.typefont,"px-3"]}>
                        Show Data For<span style={{color: "red"}}>*</span>
                    </Typography>
                    <Divider/>
                    <FormControl component="fieldset" className="mx-3">
                        <RadioGroup row aria-label="gender" value={this.state.showDataFor} onClick={this.handleShowDataForChange}>
                            <FormControlLabel
                                value="1"
                                control={<Radio id="Branch" color="primary" />}
                                label="Branch"

                            />
                            <FormControlLabel
                                value="2"
                                control={<Radio id="Exec" color="primary" />}
                                label="Exec"
                            />
                            <FormControlLabel
                                value="3"
                                control={<Radio id="TL" color="primary" />}
                                label="TL"
                            />
                            <FormControlLabel
                                value="4"
                                control={<Radio id="BM" color="primary" />}
                                label="BM"

                            />
                            <FormControlLabel
                                value="5"
                                control={<Radio id="RM" color="primary" />}
                                label="RM"
                            />
                            <FormControlLabel
                                value="6"
                                control={<Radio id="ZM" color="primary" />}
                                label="ZM"

                            />
                        </RadioGroup>
                    </FormControl>
                    <Typography variant={"h6"} className={[classes.textColor,classes.typefont,"px-3"]}>
                        Entry Date<span style={{color: "red"}}>*</span>
                    </Typography>
                    <Divider/>
                    <FormControl component="fieldset" className="mx-3">
                        <RadioGroup aria-label="gender" value={this.state.entryDate}>
                            <div className="d-flex justify-content-between">
                            <FormControlLabel
                                value="1"
                                control={<Radio id="OnDate" color="primary" />}
                                label="On Date"
                                onClick={this.handleDateChange}
                            />
                            <CustomDatePicker clear={true} id="OnDateValue"/>
                            </div>
                            <div className="d-flex justify-content-between">
                                <FormControlLabel
                                    value="2"
                                    control={<Radio id="Between" color="primary" />}
                                    label="Between"
                                    onClick={this.handleDateChange}
                                />
                                <div className="d-flex">
                                    <CustomDatePicker clear={true} id="betweenFrom"/>
                                    <CustomDatePicker clear={true} id="betweenTo"/>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between">
                                <FormControlLabel
                                    value="3"
                                    control={<Radio id="ForTheMonth" color="primary" />}
                                    label="For The Month of"
                                    onClick={this.handleDateChange}
                                />
                                <div>
                                <FormControl style={{width: "150px",marginRight: "10px"}}>
                                    <Select
                                        value = {this.state.monthValue}
                                        displayEmpty
                                        className={classes.selectEmpty}
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        id="month"
                                        onChange={this.handleMonthChange}
                                    >
                                        <MenuItem value="" disabled>
                                            Month
                                        </MenuItem>
                                        <MenuItem value={0}>January</MenuItem>
                                        <MenuItem value={1}>February</MenuItem>
                                        <MenuItem value={2}>March</MenuItem>
                                        <MenuItem value={3}>April</MenuItem>
                                        <MenuItem value={4}>May</MenuItem>
                                        <MenuItem value={5}>June</MenuItem>
                                        <MenuItem value={6}>July</MenuItem>
                                        <MenuItem value={7}>August</MenuItem>
                                        <MenuItem value={8}>September</MenuItem>
                                        <MenuItem value={9}>October</MenuItem>
                                        <MenuItem value={10}>November</MenuItem>
                                        <MenuItem value={11}>December</MenuItem>
                                    </Select>
                                </FormControl>
                                    <FormControl style={{width: "150px",marginRight: "10px"}}>
                                        <Select
                                            displayEmpty
                                            defaultValue={0}
                                            value = {this.state.yearValue}
                                            className={classes.selectEmpty}
                                            inputProps={{ 'aria-label': 'Without label' }}
                                            id="year"
                                            onChange={this.handleYearChange}
                                        >
                                            <MenuItem value="" disabled>
                                                Year
                                            </MenuItem>
                                            <MenuItem value={4}>{new Date().getFullYear()-4}</MenuItem>
                                            <MenuItem value={3}>{new Date().getFullYear()-3}</MenuItem>
                                            <MenuItem value={2}>{new Date().getFullYear()-2}</MenuItem>
                                            <MenuItem value={1}>{new Date().getFullYear()-1}</MenuItem>
                                            <MenuItem value={0}>{new Date().getFullYear()}</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between">
                                <FormControlLabel
                                    value="4"
                                    control={<Radio id="ForTheWeek" color="primary" />}
                                    label="For The Week of"
                                    onClick={this.handleDateChange}
                                />
                                <FormControl style={{width: "310px",marginRight: "10px"}}>
                                    <Select
                                        onChange={this.handleWeekChange}
                                        value={this.state.weekValue}
                                        displayEmpty
                                        className={classes.selectEmpty}
                                        inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                        {options.map((value)=>(<MenuItem value={value}>{value}</MenuItem>))}
                                    </Select>
                                </FormControl>
                            </div>
                        </RadioGroup>
                    </FormControl>
                    <div className="d-flex justify-content-around mt-2">
                        <button type="button" style={{width: "200px"}} onClick={this.showTable.bind(this)} className="btn btn-outline-success">Search</button>
                    </div>
                </Drawer>
                <main
                    className={classNames(classes.content)}
                    style={{marginTop: "40px"}}
                >
                    {this.state.showProgress?<div className="mod d-flex justify-content-center align-items-center"><img src={Loader} className="loader"/></div>:""}
                    {this.state.showTable?<div className="d-flex justify-content-around">   <Button onClick={()=>this.handleColClick(-1,1,true)} style={{backgroundColor: "white",color: "black",borderColor: "gold"}}><MonetizationOnIcon style={{color: "gold"}}/> Sales <span id="ts"/></Button>{' '}
                           <Button onClick={()=>this.handleColClick(-1,2,true)} style={{backgroundColor: "white",color: "black",borderColor: "red"}}><ReceiptIcon style={{color: "red"}}/> Receipts <span id="tr"/></Button>{' '}
                           <Button onClick={()=>this.handleColClick(-1,3,true)} style={{backgroundColor: "white",color: "black",borderColor: "black"}}><CloudUploadOutlinedIcon/> Hosting <span id="th"/></Button>{' '}
                           <Button onClick={()=>this.handleColClick(-1,4,true)} style={{backgroundColor: "white",color: "black",borderColor: "green"}}><LeakAddIcon style={{color: "green"}}/> Leakage <span id="tl"/></Button>{' '}
                           <Button onClick={()=>this.handleColClick(-1,5,true)} style={{backgroundColor: "white",color: "black",borderColor: "orange"}}><LeakRemoveIcon style={{color: "orange"}}/> Leakage Removed <span id="tlr"/></Button>{' '}
                           <Button style={{backgroundColor: "white",color: "black",borderColor: "#3498DB",cursor: "default"}}>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                                                                                                    width="24" height="24"
                                                                                                                    viewBox="0 0 172 172"
                                                                                                                    style={{ fill:"#000000"}}><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" ><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#3498db"><path d="M53.75,28.66667c-13.76826,0 -25.08333,11.31508 -25.08333,25.08333c0,13.76826 11.31508,25.08333 25.08333,25.08333c13.76826,0 25.08333,-11.31508 25.08333,-25.08333c0,-13.76826 -11.31508,-25.08333 -25.08333,-25.08333zM115.99642,31.66211l-71.66667,100.33333l11.67383,8.34244l71.66667,-100.33333zM53.75,43c6.02195,0 10.75,4.72805 10.75,10.75c0,6.02195 -4.72805,10.75 -10.75,10.75c-6.02195,0 -10.75,-4.72805 -10.75,-10.75c0,-6.02195 4.72805,-10.75 10.75,-10.75zM118.25,93.16667c-13.76826,0 -25.08333,11.31508 -25.08333,25.08333c0,13.76826 11.31508,25.08333 25.08333,25.08333c13.76826,0 25.08333,-11.31508 25.08333,-25.08333c0,-13.76826 -11.31508,-25.08333 -25.08333,-25.08333zM118.25,107.5c6.02195,0 10.75,4.72805 10.75,10.75c0,6.02195 -4.72805,10.75 -10.75,10.75c-6.02195,0 -10.75,-4.72805 -10.75,-10.75c0,-6.02195 4.72805,-10.75 10.75,-10.75z"></path></g></g></svg>
                             Leakage Percent <span id="tlp"/></Button>{' '}
                    </div>:""}
                    {this.state.showTable?<div style={{marginTop: "10px",position: "relative"}}><Button1 disabled={this.state.sumaryExport} variant="contained" style={{zIndex: "100",width: "200px",position: "absolute",right: "20px",top: "12px"}} color="primary" onClick={()=>this.exportToExcel("Summary")}>
                        Export Summary<GetAppIcon/>
                    </Button1><DatatablePage data={this.state.data} count={this.state.count} activePage={this.state.activePage} pageStart={this.state.pageStart} paging={false} defaultPaging={true} info={true}/><DatatablePage id="Summary" data={this.state.data} count={this.state.count} activePage={this.state.activePage} pageStart={this.state.pageStart} paging={false} defaultPaging={false} info={false} enteries={20000} style={{display: "none"}}/></div>:""}
                    {this.state.showInnerTable?<div style={{marginTop: "50px",position: "relative"}}><Button1 disabled={this.state.detailExport} variant="contained" style={{zIndex: "100",width: "200px",position: "absolute",right: "20px",top: "12px"}} color="primary" onClick={()=>this.handleExport()}>
                        Export Details<GetAppIcon/>
                    </Button1><DatatablePage data={this.state.dataInner} paging={false} defaultPaging={true} info={true}/>
                        <div className="w3-container">
                            <div className="w3-panel w3-pale-red w3-leftbar w3-rightbar w3-border-red d-flex align-items-center justify-content-center" style={{marginBottom: "0px"}}>
                                <span>Only top 200 records are shown. To see all records, please Export Details</span>
                            </div>
                        </div></div>:""}
                </main>
                <DatatablePage id="Detail" data={this.state.dataExport} paging={false} defaultPaging={false} info={false} style={{display: "none"}}/>
                {this.state.exporting?<div style={{position: "fixed",zIndex: "1000",bottom: "5px",right: "5px",fontSize: "16px",color: "#157759",backgroundColor: "#F1F2F3"}}><img src={ExportLoader} style={{width: "60px",height: "60px"}}/>Exporting...</div>:""}
            </div>
        );
    }
}

NSDReport.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(NSDReport);