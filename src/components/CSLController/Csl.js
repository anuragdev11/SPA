import React, { Component } from 'react';
import Divider from '@material-ui/core/Divider';
import Asynchronous from "../reusableComponents/AutoComplete";
import CustomDatePicker from "../reusableComponents/DatePicker";
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Typography from '@material-ui/core/Typography';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import AdjustIcon from '@material-ui/icons/Adjust';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import BusinessIcon from '@material-ui/icons/Business';
import "./styles.css";
import Google from '../../assets/logos/google.svg';
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import { getDate } from 'date-fns';
import MailIcon from '@material-ui/icons/MailOutline';

const useStyles = theme => ({  
  paper: {
    padding: '6px 16px',
    width: '300px',
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
});

class Csl extends Component {
    constructor(props) {
        super(props)
        this.state = {
            employeeId:this.props.employeeid,
            CSLData: [],
            empidLogin:this.props.employeeid,
            defaultStartDate:'',
            defaultendDate:''
        }
    } 
    
    componentDidMount() {
      this.setState({open:true,employeeId: this.props.employeeid, defaultStartDate:document.getElementById('strtDt').value,defaultendDate:document.getElementById('endDt').value})
      this.showTable(this)
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
          "timeOut": "1000",
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


 addDays(date, days) {
  const copy = new Date(Number(date))
  copy.setDate(date.getDate() + days)
  return copy
  }
  handlesEmployeeChange(event){
  var employeeValue = event.target.value
  this.setState({employeeId: employeeValue.value.substr(employeeValue.value.lastIndexOf("-") + 2, employeeValue.value.length - 1)})
  }

  reverseObject(object) {
    var newObject = {};
    var keys = [];

    for (var key in object) {
        keys.push(key);
    }

    for (var i = keys.length - 1; i >= 0; i--) {
      var value = object[keys[i]];
      newObject[keys[i]]= value;
    }       

    return newObject;
  }

  sortKeys(obj_1) { 
    var key = Object.keys(obj_1) 
    .sort(function order(key1, key2) { 
        if (key1 < key2) return -1; 
        else if (key1 > key2) return +1; 
        else return 0; 
    });  
      
    // Taking the object in 'temp' object 
    // and deleting the original object. 
    var temp = {}; 
      
    for (var i = 0; i < key.length; i++) { 
        temp[key[i]] = obj_1[key[i]]; 
        delete obj_1[key[i]]; 
    }  

    // Copying the object from 'temp' to  
    // 'original object'. 
    for (var i = 0; i < key.length; i++) { 
        obj_1[key[i]] = temp[key[i]]; 
    }  
    obj_1 = this.reverseObject(obj_1)    
    return obj_1; 
} 
    async showTable() {      
      const fromDate = this.changeToDate(document.getElementById('strtDt').value);
      const endDate = this.changeToDate(document.getElementById('endDt').value);     
      const employeeValue = document.getElementById('employee');
      let empid = employeeValue.value.substr(employeeValue.value.lastIndexOf("-") + 2, employeeValue.value.length - 1);      
      if (empid === ""){
        empid = this.state.employeeId
      }
      
      if (fromDate === "" || endDate === ""){
        toastr.warning("Please fill date")
        return
      }

      if (empid === ""){
        toastr.warning("Please fill Employee Details")
        return
      }
      const frmParsed =  Date.parse(fromDate)
      const endParsed =  Date.parse(endDate)
      const DiffDays = (endParsed -frmParsed)/86400000
      if (DiffDays>6) {
        toastr.warning("Date Range cannot be more than 7 Days")
        document.getElementById('strtDt').value = this.state.defaultStartDate
        document.getElementById('endDt').value = this.state.defaultendDate
        return
      }
      if (frmParsed>endParsed) {
        toastr.warning("Incorrect Date Range")
        document.getElementById('strtDt').value = this.state.defaultStartDate 
        document.getElementById('endDt').value = this.state.defaultendDate
        return
      }

      
      let bodyData = {};
      
      const url = 'https://merp.intermesh.net/go/csl/v1/CslReport?empid=' + this.state.empidLogin + '&strtDt=' + fromDate + '&endDt=' + endDate + '&AK=' + this.props.AK + '&inempid=' + empid     
      await fetch(url,{
        method: 'POST',
        headers: {
          'Accept': 'application/json'
      },
      })
          .then(function (response) {
            return response.json()
        }).then(function (body) {
          const awsData = JSON.parse(body["data"]["data"])             
              if (body["status"] !== 200 || awsData.emp_login === undefined) {
                toastr.error("Some error occured! Please try again")
                
            } else {
                if (awsData.emp_login.length === 0){
                  toastr.warning("No Data Found.")
                } else {
                    bodyData = awsData.emp_login;
                    
                    toastr.success("Your Activity for this Time Period.")
                }
                
            }
        }).catch(error => {toastr.error("Some error occured! Please try again")})

        let dateSet = new Set()
        for (let i in bodyData) {
          dateSet.add(bodyData[i].log_date)             
        }   
        var finalObject = {}    
        let dateArray = Array.from(dateSet);
        
          dateArray.map((date) => {
            var mainList = []
            for (let i in bodyData) {
              if (date === bodyData[i].log_date){
                  var list = [bodyData[i].log_time,bodyData[i].source,bodyData[i].clientip,bodyData[i].loginby]
                  mainList.push(list)
              }
            }
            
            finalObject[date] = mainList
        });
        let finalmap = []
        finalmap.push(finalObject)
       //finalmap[0] = this.sortKeys(finalmap[0])
       await this.setState({
          CSLData: finalmap[0]
        });

    }
    
    render() {
        const { classes, theme } = this.props;        
        return (
            <div style={{width: "620px"}} >
                <div id="divTitle">                    
                    <h5 style={{float:"center", textAlign:"center", color:"white", marginBottom:"-0.05px", paddingBottom:"4.5px"}} >Employee Activity Logs</h5>                    
                </div>
                <Divider />
                 <div className="d-flex "> 
                    <Asynchronous  id="employee" search="employee" style={{width:"200px"}} className="mt-3  mr-2 ml-1 pl-1 " defaultValue={this.props.employeename +" - "+this.props.employeeid} employeeid={this.props.employeeid} AK={this.props.AK} Mygroup="0" menuid={116} fnsid={1028} onChange={this.handlesEmployeeChange}/>
                      <CustomDatePicker  id="strtDt" iconType={true} Date={this.addDays(new Date, -2)} autoOk={true}   />
                      <CustomDatePicker  id="endDt" iconType={true}  Date={this.addDays(new Date, -1)} autoOk={true}   />
                      <div style={{top:"80px", marginLeft:"4px", marginTop:"16px"}} >
                        <SearchIcon style={{fontSize:30, cursor:"pointer"}} onClick={this.showTable.bind(this)} />
                      </div>
                     
                  </div>
                    
                    
                    <Divider style={{marginTop:"12px", marginBottom:"12px"}} />
                    {this.state.CSLData===undefined ? true :Object.keys(this.state.CSLData).map((val,index)=>{

                          let len = this.state.CSLData[val].length
                      return(                        
                        <div style={{float:"left"}} >
                          <Typography color="black" style={{paddingLeft:"10px"}} >{val}</Typography>   {this.state.CSLData[val].map((val,index)=>{                            
                            let loginby = val[3]
                            return(
                              <Timeline id="ActivityLog">
                                <TimelineItem>
                                 <TimelineOppositeContent>
                            <Typography color="textSecondary" id="Time">{val[0]}</Typography>
                                 </TimelineOppositeContent>
                              <TimelineSeparator>
                                  {val[3].toLowerCase() === "google" ? <TimelineDot id="google" > <img src={Google} height="25px" width="25px" style={{backgroundColor:"white", color:"#DE4A3E"}} classes={{colorSecondary:"white", color:"#00A699"}} /> </TimelineDot> : <TimelineDot > <HomeIcon style={{backgroundColor:"#00A699"}} classes={{colorSecondary:"#00A699", color:"#00A699"}} /> </TimelineDot>}                                  
                                   {/* <TimelineDot id="google" > <img src={Google} height="25px" width="25px" style={{backgroundColor:"white", color:"#DE4A3E"}} classes={{colorSecondary:"white", color:"#00A699"}} /> </TimelineDot> */}
                                {index ===  len-1 ? true : <TimelineConnector />}                                
                              </TimelineSeparator>
                              <TimelineContent>
                              <Paper id="divPaper" elevation={3} className={classes.paper}  >
                                    <Typography variant="p" component="p">
                                      Logged into {val[1]} from IP: {val[2]}
                                    </Typography>
                                    
                              </Paper>
                              </TimelineContent>
                            </TimelineItem>   
                        </Timeline>                
                            )
                          })}       
                        </div>
                      )
                    })}
            </div>          
            
        )
    }
}

export default withStyles(useStyles, { withTheme: true })(Csl)
