import React, { Component,Suspense, lazy } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {PageView, initGA}  from './GoogleAnalytics';
import { init as initApm } from '@elastic/apm-rum'
import ReactGA from 'react-ga';
ReactGA.initialize('UA-28761981-1');
let Report = "";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Display: "block",
      data: {},
      isLoading: true,
      empid: "",
      AK: "",
      name: "",
      report: "",
      glid: ""
    };
  }

  componentWillMount() {
     // const apm = initApm({
    //
    //   // Set required service name (allowed characters: a-z, A-Z, 0-9, -, _, and space)
    //   serviceName: 'WEBERP_REACT',
    //
    //   // Set custom APM Server URL (default: http://localhost:8200)
    //   serverUrl: 'https://dev-kibana.intermesh.net:8200', //206.191.151.208
    //
    //   pageLoadTransactionName: "ReportsSPA"
    //
    // });


    function getUrlVars() {
      var vars = {};
      var parts = window.atob(params).replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
      });
      return vars;
    }

    function getUrlVarsBase64() {
      var vars = {};
      var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
      });
      return vars;
    }
    let params = getUrlVarsBase64()["R"];
    const empID = getUrlVars()["empid"].replace("%20", " ");
    const AK = getUrlVars()["AK"];
    const name = getUrlVars()["empname"].replace("%20", " ");
    const r = getUrlVars()["reportid"];
    let glid = ""
    if (r === "6"){
      glid = getUrlVars()["glid"];
    }
    if (r === "1"){
      Report = React.lazy(() => import('./components/segmentationController/SegmentationReport'));
    }
    if(r === "2"){
      Report = React.lazy(() => import('./components/nsdController/NSDReport'));
    }
    if(r === "3"){
      Report = React.lazy(() => import('./components/welcomeCallController/WelcomeCallReport'));
    }
    if(r === "4"){
      Report = React.lazy(() => import('./components/osController/OSReport'));
    }
    if(r === "5"){
      Report = React.lazy(() => import('./components/CSLController/Csl'));
    }
    if(r === "6"){
      Report = React.lazy(() => import('./components/SupplierRatingController/SupplierRating'));
    }

    this.setState({empid: empID,AK: AK,name:name,report:r,glid:glid})
    initGA(empID,AK,r)
  }

  componentDidMount(){
    PageView('Segmentation')
    this.setState({
      isLoading: false
    })
  }

  render(){
    if(this.state.isLoading) {
      return <div className="d-flex align-items-center justify-content-center" style={{height: "45vw"}}><div className="lds-ripple" >
        <div></div>
        <div></div>
      </div>
      </div>
    }else
     {
        return <Suspense fallback={<div className="d-flex align-items-center justify-content-center" style={{height: "45vw"}}><div className="lds-ripple" >
          <div></div>
          <div></div>
        </div>
        </div>}><Report AK={this.state.AK} employeeid={this.state.empid} employeename={this.state.name} glid={this.state.glid} /></Suspense>
      }
    }
}

export default App;
