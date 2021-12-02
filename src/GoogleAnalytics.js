import ReactGA from "react-ga";

let designation = "";
let vertical = "";
let department = "";
let funcarea = "";
let employeeId = "";
let report = ["Segmentation,NSD,Welcome","OS"];
let reportN = "";

export const PageView = (name) => {
    ReactGA.pageview("React/"+name);
};

export function initGA(empid,AK,reportID){
    fetch("https://merp.intermesh.net/index.php/Userlisting/Employeedetails?empid="+empid+"&AK="+AK).then(res => res.json()).then((result)=>{
        if(result.status === "200") {
            designation = result.data.employeeDetails[0].DESIGNATIONNAME
            vertical = result.data.employeeDetails[0].VERTICALNAME
            department = result.data.employeeDetails[0].IIL_DEPT_NAME
            funcarea = result.data.employeeDetails[0].FUNCTIONALAREANAME
            employeeId = empid;
            reportN = report[reportID-1]
        }
    })
}


export const Event = (name, value=1) => {
    let category = vertical + '_' + department + '_' + funcarea + '_' + designation;
    ReactGA.set({ dimension1: employeeId });//Employee
    ReactGA.set({ dimension2: vertical });//Vertical
    ReactGA.set({ dimension3: department });//Department
    ReactGA.set({ dimension4: funcarea });//FunctionalArea
    ReactGA.set({ dimension5: designation });//Designation
    ReactGA.event({
        category: category,
        action: "ReportSPA_Click",
        label: "ReportSPA_"+reportN+"_"+name,
        value: value
    });
};
