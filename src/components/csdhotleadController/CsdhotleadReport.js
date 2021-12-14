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
import OSTable from "./CSDTable";
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
import STSLogo from "../../assets/logos/stsIcon.png";
import DatatablePage from "../reusableComponents/MDTable";
import GetAppIcon from "@material-ui/icons/GetApp";
import Button from "@material-ui/core/Button";
import MultiSelect from 'multiselect-react-dropdown';

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

const selectedOptionsStyles = {
    color: "#3c763d",
    backgroundColor: "#dff0d8"
};
const optionsListStyles = {
    backgroundColor: "#dff0d8",
    color: "#3c763d"
};

class CsdhotleadReport extends React.Component {

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
            myGroupChecked: true,
            myGroupCheckedFlag: false,
            employeeId: "",
            exportEnable: true,
            tables: [],
            storedID: 0,
            storedFilter:0,
            Type: 0,
            Index: 0,
            storedmygroup:0,
            storedhotFrom:"",
            storedhotTo:"",
            hotlead_type:"",
            storedhotlead_type:"",
            dateType:"",
            storeddateType:"",
            assignTo:1,
            assignId:'',
            assignName:'',
            multiSelect: [{ label: "RenewalDIY",id: 1,filter: "\'RENEWAL DIY\'"},{ label: "IM App",id: 2,filter: "\'IM APP\'"},{ label: "Seller Product Pages",id: 3,filter: "\'SELLER PRODUCT PAGES\'"},{ label: "Seller segmented banner",id: 4,filter: "\'SELLER SEGMENTED BANNER\'"},{ label: "Email",id: 5,filter: "\'EMAIL\'"},{ label: "Buy Leads",id: 6,filter: "\'BUY LEADS\'"},{ label: "Help",id: 7,filter: "\'HELP.IM\'"},{ label: "Seller New Sale",id: 0,filter: "\'SELLER NEW SALE\'"},{ label: "Seller city category report",id: 0,filter: "\'SELLER CITY CATEGORY REPORT\'"},{ label: "Others",id: 0,filter: "\'OTHERS\'"}]
        };
    }

    handleDateChange = (event) => {
        this.setState({dateType: event.target.value})
        Event("DateType")
    };

    // optionClicked(optionsList) {
    //     this.setState({ multiSelect: optionsList });
    //     this.selectFilter()
    // }

    async select(selectedList, selectedItem){
        let arr = [];
        if(selectedList.length === 0){
            this.state.multiSelect.map((x) => {
                arr.push(x.filter)
            });
        }
        else{
            selectedList.map((x)=>{
                    arr.push(x.filter)
            });
        }
        let hl_type = arr.join(",");
        this.setState({ hotlead_type: arr.join(",") });
    }

    // async selectedBadgeClicked(optionsList) {
    //     await this.setState({ multiSelect: optionsList });
    //     this.selectFilter()
    // }

    // async selectFilter(){
    //     let arr = [];
    //     this.state.multiSelect.map((x)=>{
    //         if(x.value){
    //             arr.push(x.filter)
    //         }
    //     });
        
    //     let hl_type = arr.join(",");
    //     await this.setState({ hotlead_type: arr.join(",") });
    // }

    // Me and My group checkbox
    handleGroupChange = () => {
        this.setState({myGroupChecked: !this.state.myGroupChecked})
        Event("MyGroup")
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
        document.title = "CSD HotLead Report";
        let arr = [];
        this.state.multiSelect.map((x)=>{
                arr.push(x.filter)
        });
        this.setState({ hotlead_type: arr.join(",") });
        this.setState({dateType: "2"})
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

    async getData(type, Emp_ID='', pageStart = 1){

        let hot_type 
        let assigneeValue = document.getElementById("employee")
        let isMyGroup
        let assigneeID
        let assigneeName
        let hotfrom 
        let hotto 
        let meandmygroup = 0
        let live = 0
        let dateType
        
        if(type == "summary" && Emp_ID == ''){
            hot_type = this.state.hotlead_type;
            dateType = this.state.dateType
            isMyGroup = document.getElementById("MyGroup");
            assigneeID = assigneeValue.value.substr(assigneeValue.value.lastIndexOf("-") + 2, assigneeValue.value.length - 1);
            assigneeName = assigneeValue.value.substr(0, assigneeValue.value.lastIndexOf("-")-1);
    
            let hotfrom1 = document.getElementById("hotfrom").value
            hotfrom = this.changeToDate(hotfrom1)

            let hotto1 = document.getElementById("hotto").value
            hotto = this.changeToDate(hotto1)
            
            if(dateType == 1){
                live = 1
            }

            if(isMyGroup.checked){
                meandmygroup = 1;
            }

            // hotfrom = '01/JAN/2019';
            // hotto = '31/MAY/2019';
            // hot_type = '1,2,6';
            
        }else{
            if(type == "summary" && Emp_ID != ''){
                assigneeID = Emp_ID
            }else{
                assigneeID = this.state.storedID
            }
            hot_type = this.state.storedhotlead_type;
            
            hotfrom = this.state.storedhotFrom
            hotto = this.state.storedhotTo
            meandmygroup = this.state.storedmygroup
            dateType = this.state.storeddateType

            if(dateType == 1){
                live = 1
            }
        }
        

        // return;

        let bodyData = {};

        if(assigneeValue.value === "") {
            toastr.warning("Assignee Name Cannot be blank")
        } else if(type == "summary"){
            
            // bodyData = {"status":200,"data":[{"REQ_NODE_MANAGER":"Parag Agarwal - 49928","NOT_MET_IN_15_DAYS":"19","SAME_DAY_ATTEMPT":"0","SAME_DAY_CONNECT":"0","THREE_DAY_ATTEMPT":"3","THREE_DAY_CONNECT":"1","FK_AR_RECPT_ID":"0","FK_INVOICE_TYPE_CODE":"0","DRILL":"1"},{"REQ_NODE_MANAGER":"Jinny Ashok Achtani - 5675","NOT_MET_IN_15_DAYS":"420","SAME_DAY_ATTEMPT":"28","SAME_DAY_CONNECT":"16","THREE_DAY_ATTEMPT":"79","THREE_DAY_CONNECT":"60","FK_AR_RECPT_ID":"6","FK_INVOICE_TYPE_CODE":"6","DRILL":"1"},{"REQ_NODE_MANAGER":"Pankaj Verma - 519","NOT_MET_IN_15_DAYS":"543","SAME_DAY_ATTEMPT":"36","SAME_DAY_CONNECT":"18","THREE_DAY_ATTEMPT":"94","THREE_DAY_CONNECT":"70","FK_AR_RECPT_ID":"20","FK_INVOICE_TYPE_CODE":"20","DRILL":"1"},{"REQ_NODE_MANAGER":"Deepak Gupta - 3795","NOT_MET_IN_15_DAYS":"186","SAME_DAY_ATTEMPT":"8","SAME_DAY_CONNECT":"8","THREE_DAY_ATTEMPT":"36","THREE_DAY_CONNECT":"30","FK_AR_RECPT_ID":"2","FK_INVOICE_TYPE_CODE":"2","DRILL":"1"},{"REQ_NODE_MANAGER":"Vivek Sethia - 3277","NOT_MET_IN_15_DAYS":"1","SAME_DAY_ATTEMPT":"0","SAME_DAY_CONNECT":"0","THREE_DAY_ATTEMPT":"0","THREE_DAY_CONNECT":"0","FK_AR_RECPT_ID":"0","FK_INVOICE_TYPE_CODE":"0","DRILL":"-1"}],"message":"Success"}
            
            let empID = this.props.employeeid;
            let AK = this.props.AK;
            
            this.setState({showProgress: true, showTable: false, open: false,pageStart: 1,activePage: 0});
            
            var url = ""
            
            this.setState({assignId:assigneeID})

            if(live == 1){
                url = "https://merp.intermesh.net/index.php/csd/csdhotlead/summary?type=summary&MODID=Weberp&empid="+empID+"&AK="+AK+"&managerid="+assigneeID+"&mygroup="+meandmygroup+"&hotlead_type="+hot_type+"&istele="+this.state.assignTo;
                url += "&live=1"
            }else{
                url = "https://merp.intermesh.net/index.php/csd/csdhotlead/summary?type=summary&MODID=Weberp&empid="+empID+"&AK="+AK+"&managerid="+assigneeID+"&mygroup="+meandmygroup+"&hotlead_type="+hot_type+"&istele="+this.state.assignTo;
                url += "&from_date="+hotfrom+"&to_date="+hotto
            }

            // var DEVURL = "https://dev-weberp.intermesh.net/erpphp/proposal/hiturl/index?url="+encodeURIComponent(url)+"&AK="+AK;
            // url = DEVURL;
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
            })
            .then(function (response) {
                return response.json()
            }).then(function (response) {
                if (response.status === 200) {
                    bodyData = response
                } else {
                    toastr.error("Some error occured! Please try again")
                }
            }).catch(error => {toastr.error("Some error occured! Please try again")})

            this.setState({
                storedhotlead_type:hot_type,
                storedhotFrom:hotfrom,
                storedhotTo:hotto,
                storedmygroup:meandmygroup,
                storeddateType:dateType
            })

        } else if(type == "detail"){

            // bodyData = {"status":200,"data":[{"Glid":"24065931","Opportunity ID":"956004","HotLead Source Name":"Opportunity Screen","HotLead Creation Date/Time":"25-JUL-19","Untouched Leads":"Yes","Same Day Attempt":"No","Same Day Connect":"No","Three Day Attempt":"No","Three Day Connect":"No","Receipt Entered":"No","Overall Conversion":"No","Sales Executive":"Kaushik Rajaram Pawar - 64984","CC Executive":"Neha Nagpal - 59224","HotLead Stage":"Prospect"},{"Glid":"23434218","Opportunity ID":"868457","HotLead Source Name":"Opportunity Screen","HotLead Creation Date/Time":"15-APR-19","Untouched Leads":"Yes","Same Day Attempt":"No","Same Day Connect":"No","Three Day Attempt":"No","Three Day Connect":"No","Receipt Entered":"No","Overall Conversion":"No","Sales Executive":"Kumar Nishant - 69285","CC Executive":"Nikita Chaudhary - 69509","HotLead Stage":"Prospect"},{"Glid":"3978109","Opportunity ID":"950685","HotLead Source Name":"Opportunity Screen","HotLead Creation Date/Time":"24-SEP-19","Untouched Leads":"Yes","Same Day Attempt":"Yes","Same Day Connect":"No","Three Day Attempt":"Yes","Three Day Connect":"Yes","Receipt Entered":"No","Overall Conversion":"No","Sales Executive":"Pallab Pralay Nath - 65195","CC Executive":"Nikita Chaudhary - 69509","HotLead Stage":"Prospect"},{"Glid":"9729215","Opportunity ID":"989857","HotLead Source Name":"Opportunity Screen","HotLead Creation Date/Time":"25-JUL-19","Untouched Leads":"Yes","Same Day Attempt":"No","Same Day Connect":"No","Three Day Attempt":"No","Three Day Connect":"No","Receipt Entered":"No","Overall Conversion":"No","Sales Executive":"Pallab Pralay Nath - 65195","CC Executive":"Abhishek Ranjan - 44434","HotLead Stage":"Prospect"},{"Glid":"131315","Opportunity ID":"430197","HotLead Source Name":"Opportunity Screen","HotLead Creation Date/Time":"21-MAY-19","Untouched Leads":"Yes","Same Day Attempt":"No","Same Day Connect":"No","Three Day Attempt":"No","Three Day Connect":"No","Receipt Entered":"No","Overall Conversion":"No","Sales Executive":"Supriya Aditya Sawant - 48725","CC Executive":"Nikita Chaudhary - 69509","HotLead Stage":"Prospect"},{"Glid":"2328789","Opportunity ID":"969091","HotLead Source Name":"Opportunity Screen","HotLead Creation Date/Time":"09-JUL-19","Untouched Leads":"Yes","Same Day Attempt":"No","Same Day Connect":"No","Three Day Attempt":"No","Three Day Connect":"No","Receipt Entered":"No","Overall Conversion":"No","Sales Executive":"Vishal Laxman Shinde - 72650","CC Executive":"Nikita Chaudhary - 69509","HotLead Stage":"Prospect"},{"Glid":"43821468","Opportunity ID":"915769","HotLead Source Name":"Opportunity Screen","HotLead Creation Date/Time":"06-JUN-19","Untouched Leads":"Yes","Same Day Attempt":"No","Same Day Connect":"No","Three Day Attempt":"No","Three Day Connect":"No","Receipt Entered":"No","Overall Conversion":"No","Sales Executive":"Aditya Ravindra Mahajan - 78576","CC Executive":"Vivek Verma - 55392","HotLead Stage":"Prospect"},{"Glid":"1955099","Opportunity ID":"915778","HotLead Source Name":"supplier_upsell_b1-mobile","HotLead Creation Date/Time":"20-AUG-19","Untouched Leads":"Yes","Same Day Attempt":"No","Same Day Connect":"No","Three Day Attempt":"No","Three Day Connect":"No","Receipt Entered":"No","Overall Conversion":"No","Sales Executive":"Supriya Aditya Sawant - 48725","CC Executive":"Nikita Chaudhary - 69509","HotLead Stage":"Prospect"},{"Glid":"1949233","Opportunity ID":"839965","HotLead Source Name":"Opportunity Screen","HotLead Creation Date/Time":"28-MAR-19","Untouched Leads":"Yes","Same Day Attempt":"No","Same Day Connect":"No","Three Day Attempt":"No","Three Day Connect":"No","Receipt Entered":"Yes","Overall Conversion":"Yes","Sales Executive":"Avishkar Anant Malgaonkar - 71854","CC Executive":"Abhishek Ranjan - 44434","HotLead Stage":"Closure"},{"Glid":"78454061","Opportunity ID":"824292","HotLead Source Name":"Opportunity Screen","HotLead Creation Date/Time":"12-MAR-19","Untouched Leads":"Yes","Same Day Attempt":"No","Same Day Connect":"No","Three Day Attempt":"Yes","Three Day Connect":"Yes","Receipt Entered":"No","Overall Conversion":"No","Sales Executive":"Bhushan Ghanshyam Hadkar - 74779","CC Executive":"Abhishek Ranjan - 44434","HotLead Stage":"Prospect"},{"Glid":"4280902","Opportunity ID":"949607","HotLead Source Name":"Opportunity Screen","HotLead Creation Date/Time":"18-JUN-19","Untouched Leads":"Yes","Same Day Attempt":"No","Same Day Connect":"No","Three Day Attempt":"No","Three Day Connect":"No","Receipt Entered":"No","Overall Conversion":"No","Sales Executive":"Vishwas Rajesh Singh - 78281","CC Executive":"Rahul Kumar Verma - 76216","HotLead Stage":"Prospect"}],"message":"Success"}
            let startPage = pageStart
            let filter = this.state.storedFilter;
            let empID = this.props.employeeid;
            let AK = this.props.AK;
            this.setState({showProgress: true, showTable: false, open: false,pageStart: 1,activePage: 0});

            var url = ""
            
            if(live == 1){
                url = "https://merp.intermesh.net/index.php/csd/csdhotlead/summary?type=detail&MODID=Weberp&empid="+empID+"&AK="+AK+"&managerid="+assigneeID+"&filter="+filter+"&mygroup="+meandmygroup+"&hotlead_type="+hot_type+"&page="+startPage+"&istele="+this.state.assignTo;
                url += "&live=1"
            }else{
                url = "https://merp.intermesh.net/index.php/csd/csdhotlead/summary?type=detail&MODID=Weberp&empid="+empID+"&AK="+AK+"&managerid="+assigneeID+"&filter="+filter+"&mygroup="+meandmygroup+"&hotlead_type="+hot_type+"&page="+startPage+"&istele="+this.state.assignTo;
                url += "&from_date="+hotfrom+"&to_date="+hotto
            }

            // // var DEVURL = "https://dev-weberp.intermesh.net/erpphp/proposal/hiturl/index?url="+encodeURIComponent(url)+"&AK="+AK;
            // // url = DEVURL;
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
            })
            .then(function (response) {
                return response.json()
            }).then(function (response) {
                if (response.status === 200) {
                    bodyData = response
                } else {
                    toastr.error("Some error occured! Please try again")
                }
            }).catch(error => {toastr.error("Some error occured! Please try again")})

        }else if(type == "export"){
            
            // let AK = this.props.AK;
            // this.setState({showProgress: true, showTable: false, open: false,pageStart: 1,activePage: 0});
            // AK = "abc";
            // var url = "https://dev-merp.intermesh.net/index.php/csd/csdhotlead/summary?type=detail&empid=68158&from_date=10/Aug/2018&to_date=10/Aug/2021&hotlead_type=1,2,3,4,5,6,7";
            // // var DEVURL = "https://dev-weberp.intermesh.net/erpphp/proposal/hiturl/index?url="+encodeURIComponent(url)+"&AK="+AK;
            // // url = DEVURL;
            // await fetch(url, {
            //     method: 'POST',
            //     headers: {
            //         'Accept': 'application/json'
            //     },
            // })
            // .then(function (response) {
            //     return response.json()
            // }).then(function (response) {
            //     if (response.status === 200) {
            //         // console.log("response")
            //         // console.log(response)
            //         bodyData = response
            //         toastr.success("Your request has been successfully queued. You will receive an email shortly.")
            //     } else {
            //         toastr.error("Some error occured! Please try again")
            //     }
            // }).catch(error => {toastr.error("Some error occured! Please try again")})
        }
        return bodyData;
    }

    async showTable() {
        
        let bodyData = await this.getData("summary");            
        
        if (bodyData.data) {
            await this.setState({
                showProgress: false,
                showTable: false,
                data: bodyData.data,
                tables: [bodyData.data],
            });

        } else{
            await this.setState({showProgress: false, open: true,exportEnable: true});
        }

        Event("Search")
    }

    async showChild(ID,EmpName,Index) {


        this.setState({exportEnable: true,assignName: EmpName});
        if(ID === -1){
            return
        }

        let bodyData = await this.getData("summary",ID);  


        if (bodyData.data) {
            let data = [];
            this.state.tables.map((val,index)=>{
                if(index <= Index){
                    data.push(val)
                }
            });

            data.push(bodyData.data)
            await this.setState({
                showProgress: false,
                showTable: false,
                tables: data
            });

        } else{
            await this.setState({showProgress: false,exportEnable: true});
        }

        Event("DrillDown")
    }

    async showDeals(ID,Type,myGroupType,Index) {

    
        this.setState({exportEnable: true});
        if(ID === -1){
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

        await this.setState({
            storedID: ID,
            storedFilter: Type,
            Index: Index
        });

        let bodyData = await this.getData("detail"); 

        
        if (bodyData.data) {
            let columns = [];
            let count = 0;
            if(bodyData.data.length > 0){
                count = bodyData.data[0]['Total']
            }else{
                count = 0;
            }
            
            let data = [];
                data = bodyData.data;
                //console.log(data)
                Object.keys(data[0]).map(function (val) {
                    
                    let newColumn = {
                        label: val,
                        field: val,
                        width: 100
                    };
                    
                    if(newColumn.label == "Total" || newColumn.label == "RANK" || newColumn.label == "CompanyID"){}
                    // else if (newColumn.label == "Fifteen Day Attempt"){
                    //     columns.push({label: "15 Mins Attempt",field: "Fifteen Day Attempt",width: 70});
                    // }
                    // else if(newColumn.label == "Fifteen Day Connect"){
                    //     columns.push({label: "15 Mins Connect",field: "Fifteen Day Connect",width: 70});
                    // }
                    else{
                        columns.push(newColumn)
                    }
                });
                columns.push({label: "HotLead Update",field: "HotLead Update",width: 100});
                columns.push({label: "STS",field: "STS",width: 100});


                // return;

                let rows = [];
                
                data.map(function (val,index) {
                    val["HotLead Update"] = "";
                    val["STS"] = "";
                });

                // data.map(function(val){
                //     let a = val["Fifteen Day Attempt"]
                //     val["Fifteen Day Attempt"] = val["Same Day Attempt"]
                //     val["Same Day Attempt"] = a
                //     a = val["Fifteen Day Connect"]
                //     val["Fifteen Day Connect"] = val["Same Day Connect"]
                //     val["Same Day Connect"] = a
                // })
                data.map(function (val) {
                    let newRow = {}
                    Object.keys(val).map(function (key) {

                        if (key == "HotLead Update") {
                            newRow[key] = <a href="javascript:void(0)" onClick={function () {
                                window.open('https://weberp.intermesh.net/Company/iilOpportunity.aspx?iil_opportunityid='+val["Opportunity ID"]+'&comp_id='+val["CompanyID"],'_blank','toolbar=no,location=0,directories=no,status=no,menubar=no,titlebar=no,scrollbars=yes,resizable=no,copyhistory=no,width=905,height=565,left=300,top=200,screenX=150,screenY=100')
                            }}><img src={Plus} style={{height:20}} /></a>;
                        }else if (key === "STS") {
                            newRow[key] = <a href="javascript:void(0)" onClick={function () {
                                window.open('http://weberp.intermesh.net/STS/STSDetpopup.aspx?glid='+val["Glid"],'_blank','toolbar=no,location=0,directories=no,status=no,menubar=no,titlebar=no,scrollbars=yes,resizable=no,copyhistory=no,width=905,height=565,left=300,top=200,screenX=150,screenY=100')
                            }}><img src={STSLogo} style={{height:20}} /></a>;
                        }else if(key === 'RANK' || key === 'Total'){}
                        else{
                            newRow[key] = val[key] === null || val[key] === "" ? "N/A" : val[key];
                        }
                    });
                    rows.push(newRow)
                });
                
                let completeData = {
                    columns: columns,
                    rows: rows
                };
                // return;

                let data1 = [];
                this.state.tables.map((val, index) => {
                    if (index <= Index) {
                        data1.push(val)
                    }
                });
                await this.setState({
                    showProgress: false,
                    showTable: true,
                    tables: data1,
                    data: completeData,
                    count: count,
                    exportEnable: false
                });
                window.scrollTo(0, document.body.scrollHeight);
            // } 
        }else{
            await this.setState({showProgress: false,  exportEnable: true});
        }

        Event("Deals")
    }

    async paging(pageStart) {
        this.setState({exportEnable: true});
        
        const Index = this.state.Index;
        let bodyData = await this.getData("detail",'',pageStart); 

        if (bodyData.data) {
            this.setState({activePage: Math.floor(pageStart/10),pageStart: pageStart});
            let columns = [];
            let count = 0;
            if(bodyData.data.length > 0){
                count = bodyData.data[0]['Total']
            }else{
                count = 0;
            }
            let data = [];
            // if (bodyData.data.osdata) {
                data = bodyData.data;
                Object.keys(data[0]).map(function (val) {
                    
                    let newColumn = {
                        label: val,
                        field: val,
                        width: 100
                    };
                    
                    if(newColumn.label == "Total" || newColumn.label == "RANK" || newColumn.label == "CompanyID"){}
                    else{
                        columns.push(newColumn)
                    }
                });
                columns.push({label: "HotLead Update",field: "HotLead Update",width: 100});
                columns.push({label: "STS",field: "STS",width: 100});

                let rows = [];
                data.map(function (val,index) {
                    val["HotLead Update"] = "";
                    val["STS"] = "";
                });
                data.map(function (val) {
                    let newRow = {}
                    Object.keys(val).map(function (key) {
                        if (key == "HotLead Update") {
                            newRow[key] = <a href="javascript:void(0)" onClick={function () {
                                window.open('https://weberp.intermesh.net/Company/iilOpportunity.aspx?iil_opportunityid='+val["Opportunity ID"]+'&comp_id='+val["CompanyID"],'_blank','toolbar=no,location=0,directories=no,status=no,menubar=no,titlebar=no,scrollbars=yes,resizable=no,copyhistory=no,width=905,height=565,left=300,top=200,screenX=150,screenY=100')
                            }}><img src={Plus} style={{height:20}} /></a>;
                        }else if (key === "STS") {
                            newRow[key] = <a href="javascript:void(0)" onClick={function () {
                                window.open('http://weberp.intermesh.net/STS/STSDetpopup.aspx?glid='+val["Glid"],'_blank','toolbar=no,location=0,directories=no,status=no,menubar=no,titlebar=no,scrollbars=yes,resizable=no,copyhistory=no,width=905,height=565,left=300,top=200,screenX=150,screenY=100')
                            }}><img src={STSLogo} style={{height:20}} /></a>;
                        }else if(key === 'RANK' || key === 'Total'){}
                        else{
                            newRow[key] = val[key] === null || val[key] === "" ? "N/A" : val[key];
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
                    showProgress: false,
                    showTable: true,
                    tables: data1,
                    data: completeData,
                    count: count,
                    exportEnable: false
                });
                window.scrollTo(0, document.body.scrollHeight);
            // }
        } else
                await this.setState({showProgress: false, exportEnable: true});


        Event("Pagination")
    }

    // export the data to user's mail box
    async exportToExcel() {

        await this.getData("export"); 

        await this.setState({showProgress: false, exportEnable: true});

        Event("Export")
    }

    async setAssignTo(event){
        const item = event.target.value;
        await this.setState({assignTo:item});
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
                    {this.state.open?"":<div className="d-flex align-items-center h-100" style={{backgroundColor:"#00A699",padding: "10px",position: "absolute",left: "50px"}}><Typography variant="h5">CSD HotLead Report</Typography></div>}
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
                    {/* <Typography variant={"h6"} className={[classes.textColor,classes.typefont,"px-3 mt-4"]}> */}
                    <FormControl component="fieldset" className="mx-3" style={{marginTop:5}}>
                        <RadioGroup row aria-label="gender" defaultValue="1" onChange={this.setAssignTo.bind(this)}>
                            <div className="d-flex justify-content-between align-items-end" style={{marginTop: "-15px", marginRight:"15px"}}>
                                <FormControlLabel
                                        className="mb-0"
                                        value="1"
                                        control={<Radio color="primary"/>}
                                        style={{marginRight:0}}
                                        label="Tele Assigned To"
                                        //onClick={this.setAssignTo}
                                />
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <FormControlLabel
                                    className="mb-0"
                                    value="0"
                                    control={<Radio color="primary" />}
                                    label="Sales Assigned To "
                                    //onClick={this.setAssignTo}
                                />
                            </div>
                        </RadioGroup>
                    </FormControl>
                            
                        {/* Tele Assigned To<span style={{color: "red"}}>*</span> */}
                    {/* </Typography> */}
                    <IconButton onClick={this.handleDrawerOpen}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                    </div>
                    <Divider/>
                    <div className="row" style={{marginTop:10}}>
                    <Asynchronous label="Search Employee*" id="employee" search="employee" className="mt-1 ml-3 pr-0 col-10" defaultValue={this.props.employeename +" - "+this.props.employeeid} employeeid={1} AK={this.props.AK} menuid={7} fnsid={1004}/>
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
                   
                    <Typography variant={"h6"} className={[classes.textColor,classes.typefont,"px-3"]} style={{marginTop:10}}>
                        Hot Lead Created<span style={{color: "red"}}>*</span>
                    </Typography>
                    <Divider/>
                    <FormControl component="fieldset" className="mx-3" style={{marginTop:5}}>
                        <RadioGroup aria-label="gender" defaultValue="2" onChange={this.handleDateChange}>
                            <div className="d-flex justify-content-between align-items-end" style={{marginTop: "-15px"}}>
                                <FormControlLabel
                                        className="mb-0"
                                        value="2"
                                        control={<Radio id="Receipt" color="primary" />}
                                        style={{marginRight:0}}
                                        label="From"
                                        onClick={this.handleDateChange}
                                    />
                                    {/* <label className="mt-2 mx-0" style={{fontSize: "16px",padding:10,paddingLeft:0}}>From</label> */}
                                    <div className="d-flex">
                                        <CustomDatePicker id="from_picker" style={{width: "150px", marginLeft:"5px"}} clearStyle={{position: "relative",left: "106px",top: "19px"}} calStyle={{position: "relative",left: "126px",top: "19px",zIndex: -1}} clear={true} id="hotfrom" autoOk={true} variant="inline" defDate={new Date(Date.now() - 604800000)}/>
                                    </div>
                                    <label className="mt-2 mx-0" style={{fontSize: "16px", marginBottom:"10px"}}>To</label>
                                    <div className="d-flex">
                                        <CustomDatePicker id="to_picker" style={{width: "150px",marginRight: "10px"}} clearStyle={{position: "relative",left: "106px",top: "19px"}} calStyle={{position: "relative",left: "126px",top: "19px",zIndex: -1}} clear={true} id="hotto" autoOk={true} variant="inline" defDate={new Date(Date.now() - 86400000)}/>
                                    </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <FormControlLabel
                                    className="mb-0"
                                    value="1"
                                    control={<Radio id="OnDate" color="primary" />}
                                    label="Today"
                                    onClick={this.handleDateChange}
                                />
                            </div>
                        </RadioGroup>
                    </FormControl>
                    <Typography variant={"h6"} className={[classes.textColor,classes.typefont,"px-3 mt-1"]}>
                        HotLead Type
                    </Typography>
                    <Divider/>
                    <FormGroup row class="mx-3 d-flex" style={{margin:"10px 0px"}}>
                        {/* <MultiSelectReact 
                            options={this.state.multiSelect}
                            onChange={this.optionClicked.bind(this)}
                            selectedBadgeClicked={this.selectedBadgeClicked.bind(this)}
                            selectedOptionsStyles={selectedOptionsStyles}
                            optionsListStyles={optionsListStyles} 
                        /> */}
                        <MultiSelect
                            options={this.state.multiSelect}
                            selectedValues={this.state.multiSelect}
                            placeholder="Select from Dropdown"
                            hidePlaceholder={true}
                            displayValue="label"
                            onSelect={this.select.bind(this)}
                            onRemove={this.select.bind(this)}
                            closeOnSelect = {false}
                        />
                    </FormGroup>
                    
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
                        return (
                            <OSTable managerid = {this.state.assignId} managerName={this.state.assignName} showChild={this.showChild.bind(this)} showDeals={this.showDeals.bind(this)} defaultPaging={true} info={true} location={index} data={val} style={{marginTop: index===0?"0":"20px"}}/>
                        )
                    })}
                    {this.state.showTable?<div style={{marginTop: "20px"}}><DatatablePage className="ostable" style={{marginBottom: 0,paddingRight: 0}} innerStyle={{overflowX: "auto"}} defaultPaging={false} info={false} data={this.state.data} count={this.state.count} activePage={this.state.activePage} pageStart={this.state.pageStart} ospaging={this.paging.bind(this)} stripped={false}/></div>:""}
                </main>
            </div>
        );
    }
}

CsdhotleadReport.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(CsdhotleadReport);