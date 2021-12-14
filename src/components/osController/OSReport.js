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
import DatatablePage from "../reusableComponents/MDTable";
import GetAppIcon from "@material-ui/icons/GetApp";
import Button from "@material-ui/core/Button";

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
            receiptFrom: "",
            receiptTo: "",
            dueFrom: "",
            dueTo: "",
            withProposalChecked: true,
            withProposalCheckedFlag: true,
            dateType: "1",
            dateTypeFlag: "",
            monthlyChecked: true,
            monthlyCheckedFlag: false,
            nonMonthlyChecked: true,
            nonMonthlyCheckedFlag: false,
            osFrom: "0",
            osTo: "0",
            osChecked: false,
            atChecked: false,
            atCheckedFlag: false,
            tables: [],
            ID: 0,
            Type: 0,
            Index: 0
        };
    }

    handleGroupChange = () => {
        this.setState({myGroupChecked: !this.state.myGroupChecked})
        Event("MyGroup")
    };

    handleATChange = () => {
        this.setState({atChecked: !this.state.atChecked})
        Event("MyGroup")
    };

    handleMonthlyChange = () => {
        this.setState({monthlyChecked: !this.state.monthlyChecked})
        Event("Monthly")
    };

    handleNonMonthlyChange = () => {
        this.setState({nonMonthlyChecked: !this.state.nonMonthlyChecked})
        Event("Non Monthly")
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
        this.setState({withProposalChecked: !this.state.withProposalChecked})
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
        document.title = "OS Report";
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
        const salesAssignCheck = document.getElementById("SalesAssign");
        const assigneeValue = document.getElementById("employee");
        const isMyGroup = document.getElementById("MyGroup");
        const osFrom = document.getElementById("osfrom").value;
        const osTo = document.getElementById("osto").value;

        let dealType = 0;
        const pdc = this.state.pdcChecked?1:2;

        if(this.state.monthlyChecked && !this.state.nonMonthlyChecked){
            dealType = 1
        }

        if(!this.state.monthlyChecked && this.state.nonMonthlyChecked){
            dealType = 2
        }

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

        let withoutProposal = 1;
        if(this.state.withProposalChecked){
            withoutProposal = 0;
        }

        let adjOs = 0;
        if(this.state.atChecked){
            adjOs = 1;
        }

        const assigneeID = assigneeValue.value.substr(assigneeValue.value.lastIndexOf("-") + 2, assigneeValue.value.length - 1);
        const assigneeName = assigneeValue.value.substr(0, assigneeValue.value.lastIndexOf("-")-1);
        let receiptFrom = document.getElementById("receiptFrom").value;
        let receiptTo = document.getElementById("receiptTo").value;
        let dueFrom = document.getElementById("dueFrom").value;
        let dueTo = document.getElementById("dueTo").value;
        const dateType = this.state.dateType;

        if(dateType === "2" && (receiptFrom === "" || receiptTo === "" )){
            toastr.warning("Please fill receipt date")
            return
        }

        if(dateType === "3" && (dueFrom === "" || dueTo === "" )){
            toastr.warning("Please fill due date")
            return
        }

        if(dateType === "2" && new Date(this.changeToDate(receiptFrom))>new Date(this.changeToDate(receiptTo))){
            toastr.warning("Start Date cannot be greater than End Date")
            return
        }

        if(dateType === "3" && new Date(this.changeToDate(dueFrom))>new Date(this.changeToDate(dueTo))){
            toastr.warning("Start Date cannot be greater than End Date")
            return
        }

        await this.setState({
            employeeId:assigneeID,
            receiptFrom: receiptFrom,
            receiptTo: receiptTo,
            dueFrom: dueFrom,
            dueTo: dueTo,
            osFrom: osFrom,
            osTo: osTo,
            assignTypeFlag: this.state.assignType,
            pdcCheckedFlag:this.state.pdcChecked,
            withProposalCheckedFlag: this.state.withProposalChecked,
            myGroupCheckedFlag: this.state.myGroupChecked,
            monthlyCheckedFlag: this.state.monthlyChecked,
            nonMonthlyCheckedFlag: this.state.nonMonthlyChecked,
            dateTypeFlag: this.state.dateType,
            atCheckedFlag: this.state.atChecked
        });

        receiptFrom = this.changeToDate(receiptFrom)
        receiptTo = this.changeToDate(receiptTo)
        dueFrom = this.changeToDate(dueFrom)
        dueTo = this.changeToDate(dueTo)

            if(assigneeValue.value === "") {
                toastr.warning("Assignee Name Cannot be blank")
            } else {
                    const progressStatus = false;
                    const empID = this.props.employeeid;
                    const AK = this.props.AK;
                    let bodyData = {};
                    this.setState({showProgress: true, showTable: false, open: false,pageStart: 1,activePage: 0});
                    await fetch('https://merp.intermesh.net/go/report/v1/os?empid=' + empID + '&assigneetype=' + assigneeType + '&mygroup=' + myGroup + '&assignedto=' + assigneeID + '&AK=' + AK +"&empname="+assigneeName+"&receiptfrom="+receiptFrom+"&receiptto="+receiptTo+"&duefrom="+dueFrom+"&dueto="+dueTo+"&datetype="+dateType+"&pdc="+pdc+"&osfrom="+osFrom+"&osto="+osTo+"&dealType="+dealType+"&withoutproposal="+withoutProposal+"&adjOs="+adjOs, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json'
                        },
                    })
                        .then(function (response) {
                            return response.json()
                        }).then(function (body) {
                            if (body.status !== 200 && body.status !== 204) {
                                toastr.error("Some error occured! Please try again")
                            } else {
                                if (body.status !== 204) {
                                    console.log("body")
                                    console.log(body)
                                    bodyData = body
                                }
                            }
                        }).catch(error => {toastr.error("Some error occured! Please try again")})

                    if (bodyData.data) {

                        await this.setState({
                            showProgress: progressStatus,
                            showTable: false,
                            data: bodyData.data.data,
                            tables: [bodyData.data.data],
                        });
                        console.log(this.state.tables)
                    } else
                        await this.setState({showProgress: progressStatus, open: true,exportEnable: true});

                }


        Event("Search")
    }

    async showChild(ID,EmpName,Index) {
        this.setState({exportEnable: true});
        if(ID === -1){
            return
        }

        const salesAssignCheck = this.state.assignTypeFlag;
        const isMyGroup = this.state.myGroupCheckedFlag;
        const osFrom = this.state.osFrom;
        const osTo = this.state.osTo;

        let dealType = 0;
        const pdc = this.state.pdcCheckedFlag?1:2;

        if(this.state.monthlyCheckedFlag && !this.state.nonMonthlyCheckedFlag){
            dealType = 1
        }

        if(!this.state.monthlyCheckedFlag && this.state.nonMonthlyCheckedFlag){
            dealType = 2
        }

        let myGroup = false;
        if (isMyGroup) {
            myGroup = true;
        }

        let assigneeType = "";
        if (salesAssignCheck === "1") {
            assigneeType = "Sale";
        } else {
            assigneeType = "Tele";
        }

        const assigneeID = ID;
        const assigneeName = EmpName;
        let receiptFrom = this.state.receiptFrom;
        let receiptTo = this.state.receiptTo;
        let dueFrom = this.state.dueFrom;
        let dueTo = this.state.dueTo;
        const dateType = this.state.dateTypeFlag;
        let withoutProposal = 0
        if(!this.state.withProposalCheckedFlag){
            withoutProposal = 1
        }
        let adjOs = 0;
        if(this.state.atCheckedFlag){
            adjOs = 1
        }

        if(dateType === "2" && (receiptFrom === "" || receiptTo === "" )){
            toastr.warning("Please fill receipt date")
            return
        }

        if(dateType === "3" && (dueFrom === "" || dueTo === "" )){
            toastr.warning("Please fill due date");
            return
        }

        if(dateType === "2" && new Date(this.changeToDate(receiptFrom))>new Date(this.changeToDate(receiptTo))){
            toastr.warning("Start Date cannot be greater than End Date");
            return
        }

        if(dateType === "3" && new Date(this.changeToDate(dueFrom))>new Date(this.changeToDate(dueTo))){
            toastr.warning("Start Date cannot be greater than End Date");
            return
        }


        receiptFrom = this.changeToDate(receiptFrom)
        receiptTo = this.changeToDate(receiptTo)
        dueFrom = this.changeToDate(dueFrom)
        dueTo = this.changeToDate(dueTo)


            const progressStatus = false;
            const empID = this.props.employeeid;
            const AK = this.props.AK;
            let bodyData = {};
            this.setState({showProgress: true, showTable: false, open: false,pageStart: 1,activePage: 0});
            await fetch('https://merp.intermesh.net/go/report/v1/os?empid=' + empID + '&assigneetype=' + assigneeType + '&mygroup=' + myGroup + '&assignedto=' + assigneeID + '&AK=' + AK +"&empname="+assigneeName+"&receiptfrom="+receiptFrom+"&receiptto="+receiptTo+"&duefrom="+dueFrom+"&dueto="+dueTo+"&datetype="+dateType+"&pdc="+pdc+"&osfrom="+osFrom+"&osto="+osTo+"&dealType="+dealType+"&withoutproposal="+withoutProposal+"&adjOS="+adjOs, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
            })
                .then(function (response) {
                    return response.json()
                }).then(function (body) {
                    if (body.status !== 200 && body.status !== 204) {
                        toastr.error("Some error occured! Please try again")
                    } else {
                        if (body.status !== 204) {
                            bodyData = body
                        }
                    }
                }).catch(error => {toastr.error("Some error occured! Please try again")})

            if (bodyData.data) {
                let data = [];
                this.state.tables.map((val,index)=>{
                    if(index <= Index){
                        data.push(val)
                    }
                });

                data.push(bodyData.data.data)
                await this.setState({
                    showProgress: progressStatus,
                    showTable: false,
                    tables: data
                });

            } else
                await this.setState({showProgress: progressStatus,exportEnable: true});



        Event("DrillDown")
    }

    async showDeals(ID,Type,myGroupType,Index) {
        this.setState({exportEnable: true});
        if(ID === -1){
            return
        }

        Type = Type <= 2?1:Type;
        Type = Type > 2 && Type <= 5?2:Type;
        Type = Type > 5 && Type <= 8?3:Type;
        Type = Type > 8 && Type <= 11?4:Type;
        Type = Type > 11 && Type <= 14?5:Type;
        Type = Type > 14 && Type <= 17?6:Type;

        const assignCheck = this.state.assignTypeFlag;
        const isMyGroup = this.state.myGroupCheckedFlag;
        const osFrom = this.state.osFrom;
        const osTo = this.state.osTo;

        let dealType = 0;
        const pdc = this.state.pdcCheckedFlag?1:2;

        if(this.state.monthlyCheckedFlag && !this.state.nonMonthlyCheckedFlag){
            dealType = 1
        }

        if(!this.state.monthlyCheckedFlag && this.state.nonMonthlyCheckedFlag){
            dealType = 2
        }

        let myGroup = false;
        if (isMyGroup) {
            myGroup = true;
        }

        if(myGroupType === 0){
            myGroup = false
        }

        let assigneeType = "";
        if (assignCheck ==="1") {
            assigneeType = "Sale";
        } else {
            assigneeType = "Tele";
        }

        let adjOs = 0;
        if(this.state.atCheckedFlag){
            adjOs = 1
        }


        const assigneeID = ID;
        let receiptFrom = this.state.receiptFrom;
        let receiptTo = this.state.receiptTo;
        let dueFrom = this.state.dueFrom;
        let dueTo = this.state.dueTo;
        const dateType = this.state.dateTypeFlag;
        let withoutProposal = 1;
        if(this.state.withProposalChecked){
            withoutProposal = 0;
        }

        if(dateType === "2" && (receiptFrom === "" || receiptTo === "" )){
            toastr.warning("Please fill receipt date")
            return
        }

        if(dateType === "3" && (dueFrom === "" || dueTo === "" )){
            toastr.warning("Please fill due date")
            return
        }

        if(dateType === "2" && new Date(this.changeToDate(receiptFrom))>new Date(this.changeToDate(receiptTo))){
            toastr.warning("Start Date cannot be greater than End Date")
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

        this.setState({
            ID: ID,
            Type: Type,
            Index: Index,
        });

        receiptFrom = this.changeToDate(receiptFrom)
        receiptTo = this.changeToDate(receiptTo)
        dueFrom = this.changeToDate(dueFrom)
        dueTo = this.changeToDate(dueTo)

            const progressStatus = false;
            const empID = this.props.employeeid;
            const AK = this.props.AK;
            let bodyData = {};
            this.setState({showProgress: true, showTable: false, open: false,pageStart: 1,activePage: 0});
            await fetch('https://merp.intermesh.net/go/report/v1/osdeals?empid=' + empID + '&assigneetype=' + assigneeType + '&mygroup=' + myGroup + '&assignedto=' + assigneeID + '&AK=' + AK +"&receiptfrom="+receiptFrom+"&receiptto="+receiptTo+"&duefrom="+dueFrom+"&dueto="+dueTo+"&datetype="+dateType+"&pdc="+pdc+"&osfrom="+osFrom+"&osto="+osTo+"&dealType="+dealType+"&dataType="+Type+"&start=1&end=10&withoutproposal="+withoutProposal+"&adjOs="+adjOs, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
            })
                .then(function (response) {
                    return response.json()
                }).then(function (body) {
                    if (body.status !== 200 && body.status !== 204) {
                        toastr.error("Some error occured! Please try again")
                    } else {
                        if (body.status !== 204) {
                            bodyData = body
                        }
                    }
                }).catch(error => {toastr.error("Some error occured! Please try again")})

            console.log("Deals bodyData");
            console.log(bodyData);

            if (bodyData.data) {
                let columns = [];
                let count = bodyData.data.count;
                let data = [];
                if (bodyData.data.osdata) {
                    data = bodyData.data.osdata;
                    Object.keys(data[0]).map(function (val) {

                        let newColumn = {
                            label: val,
                            field: val,
                            width: 100
                        };

                        columns.push(newColumn)

                    });

                    let rows = [];
                    data.map(function (val) {
                        let newRow = {}
                        Object.keys(val).map(function (key) {

                            if(key !== "GL ID" && key !== "Deal Receipt ID" && key !==  "Proposal ID")
                                newRow[key] = val[key] === null || val[key] === "" ? "N/A" : indianFormat(val[key]);
                            else {
                                if (key === "GL ID") {
                                    newRow[key] = val[key] === null || val[key] === "" ? "N/A" : <a href="javascript:void(0)" onClick={function () {
                                        window.open('http://weberp.intermesh.net/STS/STSDetpopup.aspx?glid='+val["GL ID"],'_blank','toolbar=no,location=0,directories=no,status=no,menubar=no,titlebar=no,scrollbars=yes,resizable=no,copyhistory=no,width=905,height=565,left=300,top=200,screenX=150,screenY=100')
                                    }}>{val[key]}</a>;
                                }else {
                                    newRow[key] = val[key] === null || val[key] === "" ? "N/A" : val[key];
                                }
                            }

                        });
                        rows.push(newRow)
                    });

                    let completeData = {
                        columns: columns,
                        rows: rows
                    };
                    let data1 = [];
                    this.state.tables.map((val, index) => {
                        if (index <= Index) {
                            data1.push(val)
                        }
                    });

                    console.log("Deals completeData");
                    console.log(completeData);

                    await this.setState({
                        showProgress: progressStatus,
                        showTable: true,
                        tables: data1,
                        data: completeData,
                        count: count,
                        exportEnable: false
                    });
                    console.log(count)
                    window.scrollTo(0, document.body.scrollHeight);
                } }else
                    await this.setState({showProgress: progressStatus,  exportEnable: true});

        Event("Deals")
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

        if(this.state.monthlyCheckedFlag && !this.state.nonMonthlyCheckedFlag){
            dealType = 1
        }

        if(!this.state.monthlyCheckedFlag && this.state.nonMonthlyCheckedFlag){
            dealType = 2
        }

        let adjOs = 0
        if(this.state.atCheckedFlag){
            adjOs = 1
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

        let withoutProposal = 0;
        if(!this.state.withProposalCheckedFlag){
            withoutProposal = 1
        }

        const assigneeID = ID;
        let receiptFrom = this.state.receiptFrom;
        let receiptTo = this.state.receiptTo;
        let dueFrom = this.state.dueFrom;
        let dueTo = this.state.dueTo;
        const dateType = this.state.dateTypeFlag;

        if(dateType === "2" && (receiptFrom === "" || receiptTo === "" )){
            toastr.warning("Please fill receipt date")
            return
        }

        if(dateType === "3" && (dueFrom === "" || dueTo === "" )){
            toastr.warning("Please fill due date")
            return
        }

        if(dateType === "2" && new Date(this.changeToDate(receiptFrom))>new Date(this.changeToDate(receiptTo))){
            toastr.warning("Start Date cannot be greater than End Date")
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

        receiptFrom = this.changeToDate(receiptFrom)
        receiptTo = this.changeToDate(receiptTo)
        dueFrom = this.changeToDate(dueFrom)
        dueTo = this.changeToDate(dueTo)

        const progressStatus = false;
        const empID = this.props.employeeid;
        const AK = this.props.AK;
        let bodyData = {};
        this.setState({showProgress: true, open: false});
        await fetch('https://merp.intermesh.net/go/report/v1/osdeals?empid=' + empID + '&assigneetype=' + assigneeType + '&mygroup=' + myGroup + '&assignedto=' + assigneeID + '&AK=' + AK +"&receiptfrom="+receiptFrom+"&receiptto="+receiptTo+"&duefrom="+dueFrom+"&dueto="+dueTo+"&datetype="+dateType+"&pdc="+pdc+"&osfrom="+osFrom+"&osto="+osTo+"&dealType="+dealType+"&dataType="+Type+"&start="+pageStart+"&end="+(pageStart+9)+"&withoutproposal="+withoutProposal+"&adjOs="+adjOs, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
        })
            .then(function (response) {
                return response.json()
            }).then(function (body) {
                if (body.status !== 200 && body.status !== 204) {
                    toastr.error("Some error occured! Please try again")
                } else {
                    if (body.status !== 204) {
                        bodyData = body
                    }
                    console.log(body)
                }
            }).catch(error => {toastr.error("Some error occured! Please try again")})

        if (bodyData.data) {
            this.setState({activePage: Math.floor(pageStart/10),pageStart: pageStart});
            let columns = [];
            let count = bodyData.data.count;
            let data = [];
            if (bodyData.data.osdata) {
                data = bodyData.data.osdata;
                Object.keys(data[0]).map(function (val) {

                    let newColumn = {
                        label: val,
                        field: val,
                        width: 100
                    };

                    columns.push(newColumn)

                });

                let rows = [];
                data.map(function (val) {
                    let newRow = {}
                    Object.keys(val).map(function (key) {
                        if(key !== "GL ID" && key !== "Deal Receipt ID" && key !== "Proposal ID")
                            newRow[key] = val[key] === null || val[key] === "" ? "N/A" : indianFormat(val[key]);
                        else{
                            if (key === "GL ID") {
                                newRow[key] = val[key] === null || val[key] === "" ? "N/A" : <a href="javascript:void(0)" onClick={function () {
                                    window.open('http://weberp.intermesh.net/STS/STSDetpopup.aspx?glid='+val["GL ID"],'_blank','toolbar=no,location=0,directories=no,status=no,menubar=no,titlebar=no,scrollbars=yes,resizable=no,copyhistory=no,width=905,height=565,left=300,top=200,screenX=150,screenY=100')
                                }}>{val[key]}</a>;
                            }else {
                                newRow[key] = val[key] === null || val[key] === "" ? "N/A" : val[key];
                            }
                        }

                    });
                    rows.push(newRow)
                });

                let completeData = {
                    columns: columns,
                    rows: rows
                };
                let data1 = [];
                this.state.tables.map((val, index) => {
                    if (index <= Index) {
                        data1.push(val)
                    }
                });
                await this.setState({
                    showProgress: progressStatus,
                    showTable: true,
                    tables: data1,
                    data: completeData,
                    count: count,
                    exportEnable: false
                });
                console.log(count)
                window.scrollTo(0, document.body.scrollHeight);
            }} else
                await this.setState({showProgress: progressStatus, exportEnable: true});


        Event("Pagination")
    }

    async exportToExcel() {

        const ID = this.state.ID;
        const Type = this.state.Type;
        const Index = this.state.Index;
        const assignCheck = this.state.assignTypeFlag;
        const isMyGroup = this.state.myGroupCheckedFlag;
        const osFrom = this.state.osFrom;
        const osTo = this.state.osTo;

        let dealType = 0;
        const pdc = this.state.pdcCheckedFlag?1:2;

        if(this.state.monthlyCheckedFlag && !this.state.nonMonthlyCheckedFlag){
            dealType = 1
        }

        if(!this.state.monthlyCheckedFlag && this.state.nonMonthlyCheckedFlag){
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
        let withoutProposal = 1;
        if(this.state.withProposalChecked){
            withoutProposal = 0;
        }


        const assigneeID = ID;
        let receiptFrom = this.state.receiptFrom;
        let receiptTo = this.state.receiptTo;
        let dueFrom = this.state.dueFrom;
        let dueTo = this.state.dueTo;
        const dateType = this.state.dateTypeFlag;

        receiptFrom = this.changeToDate(receiptFrom)
        receiptTo = this.changeToDate(receiptTo)
        dueFrom = this.changeToDate(dueFrom)
        dueTo = this.changeToDate(dueTo)

        const progressStatus = false;
        const empID = this.props.employeeid;
        const AK = this.props.AK;
        let bodyData = {};
        this.setState({showProgress: true, open: false});
        await fetch('https://merp.intermesh.net/go/report/v1/osdeals?empid=' + empID + '&assigneetype=' + assigneeType + '&mygroup=' + myGroup + '&assignedto=' + assigneeID + '&AK=' + AK +"&receiptfrom="+receiptFrom+"&receiptto="+receiptTo+"&duefrom="+dueFrom+"&dueto="+dueTo+"&datetype="+dateType+"&pdc="+pdc+"&osfrom="+osFrom+"&osto="+osTo+"&dealType="+dealType+"&dataType="+Type+"&withoutproposal="+withoutProposal+"&start=1&end=10&isexport=1", {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
        })
            .then(function (response) {
                return response.json()
            }).then(function (body) {
                if (body.status !== 200 && body.status !== 204) {
                    toastr.error("Some error occured! Please try again")
                } else {
                    if (body.status !== 204) {
                        bodyData = body;
                        toastr.success("Your request has been successfully queued. You will receive an email shortly.")
                    }
                }
            }).catch(error => {toastr.error("Some error occured! Please try again")})

            await this.setState({showProgress: progressStatus, exportEnable: true});


        Event("Export")
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
                    {this.state.open?"":<div className="d-flex align-items-center h-100" style={{backgroundColor:"#00A699",padding: "10px",position: "absolute",left: "50px"}}><Typography variant="h5">OS Report</Typography></div>}
                    <Button disabled={this.state.exportEnable} variant="contained" className="export" style={{width: "110px",position: "absolute",right: "20px",top: "7px"}} color="primary" onClick={this.exportToExcel.bind(this)}>
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
                    <Typography variant={"h6"} className={[classes.textColor,classes.typefont,"px-3 mt-4"]}>
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
                        </RadioGroup>
                    </FormControl>
                    <div className="row">
                    <Asynchronous label="Search Employee*" id="employee" search="employee" className="mt-1 ml-3 pr-0 col-10" defaultValue={this.props.employeename +" - "+this.props.employeeid} employeeid={1} AK={this.props.AK} menuid={7} fnsid={1014}/>
                    <div className="col-1 d-flex align-items-center justify-content-start pl-1">
                    <Checkbox
                            id="MyGroup"
                            value="checkedB"
                            color="primary"
                            checked={this.state.myGroupChecked}
                            onChange={this.handleGroupChange}
                        />
                    </div>
                    </div>
                    <Typography variant={"h6"} className={[classes.textColor,classes.typefont,"px-3 mt-2"]}>
                        Deal Type & Deal Period<span style={{color: "red"}}>*</span>
                    </Typography>
                    <Divider/>
                    <FormControl component="fieldset" className="ml-2 mr-4 mt-1">
                        <RadioGroup row aria-label="gender" className="d-flex align-items-center" value={this.state.status} onChange={this.handleStatusChange}>
                            <FormControl style={{width: "40px",marginRight: "10px"}}>
                                <Switch
                                    focusVisibleClassName={classes.focusVisible}
                                    classes={{
                                        root: classes.switchRoot,
                                        switchBase: classes.switchBase,
                                        thumb: classes.thumb,
                                        track: classes.track,
                                        checked: classes.checked,
                                    }}
                                    checked={this.state.withProposalChecked}
                                    onChange={this.handleProposalChange}
                                />
                            </FormControl>
                            <label className="mt-1" style={{fontSize: "16px",marginRight:"20px"}}>With Proposal</label>
                            <FormControl style={{width: "50px"}}>
                                <Switch
                                    focusVisibleClassName={classes.focusVisible}
                                    classes={{
                                        root: classes.switchRoot,
                                        switchBase: classes.switchBase,
                                        thumb: classes.thumb,
                                        track: classes.track,
                                        checked: classes.checked,
                                    }}
                                    checked={this.state.pdcChecked}
                                    onChange={this.handlePDCChange}
                                    disabled={!this.state.withProposalChecked}
                                />
                            </FormControl>
                            <label className="mt-1" style={{fontSize: "16px"}}>PDC Deal</label>
                        </RadioGroup>
                    </FormControl>
                    <FormGroup row class="mx-3 d-flex">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    id="Monthly"
                                    value="checkedB"
                                    color="primary"
                                    checked={this.state.monthlyChecked}
                                    onChange={this.handleMonthlyChange}
                                />

                            }
                            style={{marginRight: "85px"}}
                            label="Monthly"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    id="MyGroup"
                                    value="checkedB"
                                    color="primary"
                                    checked={this.state.nonMonthlyChecked}
                                    onChange={this.handleNonMonthlyChange}
                                />

                            }
                            label="Non Monthly"
                        />
                    </FormGroup>
                    <Typography variant={"h6"} className={[classes.textColor,classes.typefont,"px-3"]}>
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
                                    control={<Radio id="Receipt" color="primary" />}
                                    label="Receipt Entry"
                                    onClick={this.handleDateChange}
                                />
                                <div className="d-flex">
                                    <CustomDatePicker style={{width: "130px",marginRight: "10px"}} clearStyle={{position: "relative",left: "86px",top: "19px"}} calStyle={{position: "relative",left: "106px",top: "19px",zIndex: -1}} clear={true} id="receiptFrom"/>
                                    <CustomDatePicker style={{width: "130px",marginRight: "10px"}} clearStyle={{position: "relative",left: "86px",top: "19px"}} calStyle={{position: "relative",left: "106px",top: "19px",zIndex: -1}} clear={true} id="receiptTo"/>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-end" style={{marginTop: "-15px"}}>
                                <FormControlLabel
                                    className="mb-0"
                                    value="3"
                                    control={<Radio id="Due" color="primary" className=""/>}
                                    label="Payment Due"
                                    onClick={this.handleDateChange}
                                />
                                <div className="d-flex">
                                    <CustomDatePicker style={{width: "130px",marginRight: "10px"}} clearStyle={{position: "relative",left: "86px",top: "19px"}} calStyle={{position: "relative",left: "106px",top: "19px",zIndex: -1}} clear={true} id="dueFrom"/>
                                    <CustomDatePicker style={{width: "130px",marginRight: "10px"}} clearStyle={{position: "relative",left: "86px",top: "19px"}} calStyle={{position: "relative",left: "106px",top: "19px",zIndex: -1}} clear={true} id="dueTo"/>
                                </div>
                            </div>
                        </RadioGroup>
                    </FormControl>
                    <Typography variant={"h6"} className={[classes.textColor,classes.typefont,"px-3 mt-1"]}>
                        Amount Filter
                    </Typography>
                    <Divider/>
                    <div className="mx-3 mt-1 d-flex justify-content-between">
                            <label className="mt-2 mx-0" style={{fontSize: "16px"}}>OS Amount</label>
                            <div className="d-flex">
                                <form className={classes.root} autoComplete="off">
                                    <TextField InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <i className="fa fa-inr" aria-hidden="true"/>
                                            </InputAdornment>
                                        ),
                                    }} id="osfrom" style={{width: "115px",marginRight: "10px"}} type="number"/>
                                    <div className="mt-2 mr-3 font-weight-bold">To</div>
                                    <TextField InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <i className="fa fa-inr" aria-hidden="true"/>
                                            </InputAdornment>
                                        ),
                                    }} id="osto" style={{width: "115px",marginRight: "10px"}}  type="number"/>
                                </form>
                            </div>
                    </div>
                    {this.state.withProposalChecked?"":<div><Typography variant={"h6"} className={[classes.textColor,classes.typefont,"px-3 mt-1"]}>
                        Exclude
                    </Typography>
                    <Divider/>
                    <FormGroup row class="mx-3 justify-content-between">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    id="MyGroup"
                                    value="checkedB"
                                    color="primary"
                                    checked={this.state.atChecked}
                                    onChange={this.handleATChange}
                                />

                            }
                            label="Adjustment/TDS Cancellation"
                        />
                    </FormGroup>
                    </div>}
                    {this.state.withProposalChecked?<div style={{marginTop: "20px"}}/>:""}
                    <div className="d-flex justify-content-center mt-2">
                        <button type="button" style={{width: "200px"}} onClick={this.showTable.bind(this)} className="btn btn-outline-success">Search</button>
                    </div>
                </Drawer>
                <main
                    className={classNames(classes.content)}
                    style={{marginTop: "45px"}}
                >
                    {this.state.showProgress?<div className="mod d-flex justify-content-center align-items-center"><img src={Loader} height="100px" width="100px" className="loader"/></div>:""}
                    {this.state.tables.map((val,index)=>{
                        console.log("Out")
                        console.log(index)
                        console.log(val)
                        return (
                            <OSTable showChild={this.showChild.bind(this)} showDeals={this.showDeals.bind(this)} defaultPaging={true} info={true} location={index} data={val} style={{marginTop: index===0?"0":"20px"}}/>
                        )
                    })}
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