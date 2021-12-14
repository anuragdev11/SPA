import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Table from "react-bootstrap/Table";
import Plus from "../../assets/logos/plus.png";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Popover from '@material-ui/core/Popover';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}));

function CSDTable(props) {
    const classes = useStyles();
    const [clickData, setClickData] = React.useState([]);
    const [data, setData] = React.useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [content, setContent] = React.useState("");

    const handleClick = (event, val) => {
        if (val === 1)
            setContent("Total number of leads in date range selected")
        if (val === 2)
            setContent("No Call / Meeting attempt within 15 days of HL creation")
        if (val === 3)
            setContent("Call / Meeting attemped within 24 hrs of creation")
        if (val === 4)
            setContent("Greater than 5 minutes called talktime or meeting done within 24 hrs of creation")
        if (val === 5)
            setContent("Call / Meeting attemped within 3 days of creation")
        if (val === 6)
            setContent("Greater than 5 minutes called talktime or meeting done within 3 days of creation")
        if (val === 7)
            setContent("Receipt generated within 30 days of creation")
        if (val === 8)
            setContent("Upsell done within 30 days of creation")
        if (val === 9)
            setContent("Call / Meeting attemped within 15 mins of creation")
        if (val === 10)
            setContent("Greater than 5 minutes called talktime or meeting done within 15 mins of creation")
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const makeData = () => {
        let finalResult = [];
        let clickData = [];
        let data = props.data;
        let top_total = 0
        let top_untouchedLeads = 0
        let top_sameDayAttempt = 0
        let top_sameDayConnect = 0
        let top_threeDayAttempt = 0
        let top_threeDayConnect = 0
        let top_fifteenminsAttempt = 0
        let top_fifteenminsConnect = 0
        let top_overallConversion = 0

        for (let i = 0; i < data.length; i++) {

            data.sort(function(first, second) {
                if (first.REQ_NODE_MANAGER == props.managerid) return -1;
            });

            let temp = [];
            let clickValues = {};

            let name = data[i]['REQ_NODE_MANAGER_NAME'] + ' - ' + data[i]['REQ_NODE_MANAGER'];
            let total = data[i]['TOTAL_LEADS'] == null ? "0" : data[i]['TOTAL_LEADS'];
            top_total += parseInt(total)

            let untouchedLeads = data[i]['NOT_MET_IN_15_DAYS'] == null ? "0" : data[i]['NOT_MET_IN_15_DAYS'];
            top_untouchedLeads += parseInt(untouchedLeads)
            
            let fifteenminsAttempt = data[i]['FIFTEEN_MINUTE_ATTEMPT'] == null ? "0" : data[i]['FIFTEEN_MINUTE_ATTEMPT'];
            top_fifteenminsAttempt+= parseInt(fifteenminsAttempt)

            let fifteenminsConnect = data[i]['FIFTEEN_MINUTE_CONNECT'] == null ? "0" : data[i]['FIFTEEN_MINUTE_CONNECT'];
            top_fifteenminsConnect += parseInt(fifteenminsConnect)

            let sameDayAttempt = data[i]['SAME_DAY_ATTEMPT'] == null ? "0" : data[i]['SAME_DAY_ATTEMPT'];
            top_sameDayAttempt += parseInt(sameDayAttempt)

            let sameDayConnect = data[i]['SAME_DAY_CONNECT'] == null ? "0" : data[i]['SAME_DAY_CONNECT'];
            top_sameDayConnect += parseInt(sameDayConnect)

            let threeDayAttempt = data[i]['THREE_DAY_ATTEMPT'] == null ? "0" : data[i]['THREE_DAY_ATTEMPT'];
            top_threeDayAttempt+= parseInt(threeDayAttempt)

            let threeDayConnect = data[i]['THREE_DAY_CONNECT'] == null ? "0" : data[i]['THREE_DAY_CONNECT'];
            top_threeDayConnect += parseInt(threeDayConnect)

            //let receiptEntered = data[i]['FK_AR_RECPT_ID'] == null ? "0" : data[i]['FK_AR_RECPT_ID'];

            let overallConversion = data[i]['FK_INVOICE_TYPE_CODE'] == null ? "0" : data[i]['FK_INVOICE_TYPE_CODE'];
            top_overallConversion += parseInt(overallConversion)

            clickValues["NAME"] = data[i]['REQ_NODE_MANAGER_NAME'];
            if(i===0){
                clickValues["ID"] = -1;
            }
            else{
                clickValues["ID"] = data[i]['DRILL'] == 1 ? parseInt(data[i]['REQ_NODE_MANAGER']) : -1;
            }
            clickValues["DEALID"] = parseInt(data[i]['REQ_NODE_MANAGER']);

            temp.push(name);
            temp.push(total);
            temp.push(untouchedLeads);
            temp.push(fifteenminsAttempt);
            temp.push(fifteenminsConnect);
            temp.push(sameDayAttempt);
            temp.push(sameDayConnect);
            temp.push(threeDayAttempt);
            temp.push(threeDayConnect);
            //temp.push(receiptEntered);
            temp.push(overallConversion);

            finalResult.push(temp);
            clickData.push(clickValues);
        }

        if(data[0]['REQ_NODE_MANAGER'] != props.managerid){
            finalResult.splice(0,0,[props.managerName + " - " + props.managerid, top_total,top_untouchedLeads,top_fifteenminsAttempt,top_fifteenminsConnect,top_sameDayAttempt,top_sameDayConnect,top_threeDayAttempt,top_threeDayConnect,top_overallConversion])
            let clickValues = {};
            clickValues["NAME"] = props.managerName 
            clickValues["ID"] = -1;
            clickValues["DEALID"] = parseInt(props.managerid);
            clickData.splice(0,0,clickValues);

        }else{
            finalResult[0].splice(1,9,top_total,top_untouchedLeads,top_fifteenminsAttempt,top_fifteenminsConnect,top_sameDayAttempt,top_sameDayConnect,top_threeDayAttempt,top_threeDayConnect,top_overallConversion)
        }
        setClickData(clickData);
        //console.log("Final Result")
        //console.log(finalResult)
        return finalResult
    };

    //add commas to digit in indian Format
    const indianFormat = (value) => {
        var res = value
        if (!isNaN(value)) {
            var x = Math.round(value);
            x = x.toString();
            var afterPoint = '';
            if (x.indexOf('.') > 0)
                afterPoint = x.substring(x.indexOf('.'), x.length);
            x = Math.floor(x);
            x = x.toString();
            var lastThree = x.substring(x.length - 3);
            var otherNumbers = x.substring(0, x.length - 3);
            if (otherNumbers != '')
                lastThree = ',' + lastThree;
            res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
        }
        return res
    };

    // to highLight the selected cell
    const options = (event, index) => {

        let parentElement = event.target.parentElement;
        let currentElement = event.target;

        for (let i = 0; i < parentElement.parentElement.children.length; i++) {
            for (let j = 0; j < parentElement.parentElement.children[i].children.length; j++) {
                parentElement.parentElement.children[i].children[j].classList.remove("highlight")
            }
        }
        currentElement.classList.add("highlight")
    };

    React.useEffect(() => { async function setState() { await setData(makeData); if (props.location !== 0) window.scrollTo(0, document.body.scrollHeight); else window.scrollTo(0, 0); } setState(); }, [props.data]);

    return (
        <Card style={props.style}>
            <CardContent>
                <Table className="text-center mb-0 utable" bordered hover options={options}>
                    <thead>
                        <tr>

                            <th rowSpan="2" style={{ backgroundColor: "#EAD1DC", width: "20%", minWidth: "20%" }}>Name</th>
                            <th rowSpan="2" style={{ backgroundColor: "#D5A6BD", width: "10%", minWidth: "10%" }}>Total<span><InfoOutlinedIcon onClick={(event) => handleClick(event, 1)} style={{ cursor: "pointer", fontSize: "22px", marginBottom: "3px", paddingLeft: "4px" }} /></span></th>
                            <th rowSpan="2" style={{ backgroundColor: "#D5A6BD", width: "10%", minWidth: "10%" }}>Untouched Leads<span><InfoOutlinedIcon onClick={(event) => handleClick(event, 2)} style={{ cursor: "pointer", fontSize: "22px", marginBottom: "3px", paddingLeft: "4px" }} /></span></th>
                            <th colspan="2" style={{ backgroundColor: "#6FA8DC", width: "20%", minWidth: "20%" }}>15 Minutes</th>
                            <th colspan="2" style={{ backgroundColor: "#B4A7D6", width: "20%", minWidth: "20%" }}>Same day</th>
                            <th colspan="2" style={{ backgroundColor: "#6FA8DC", width: "20%", minWidth: "20%" }}>Three day</th>
                            {/* <th rowSpan="2" style={{backgroundColor: "#B6D7A8",width: "10%",minWidth: "10%"}}>Receipt entered<span><InfoOutlinedIcon onClick={(event)=>handleClick(event,7)} style={{cursor: "pointer",fontSize: "22px",marginBottom: "3px",paddingLeft: "4px"}}/></span></th> */}
                            <th rowSpan="2" style={{ backgroundColor: "#B6D7A8", width: "10%", minWidth: "10%" }}>Overall conversion<span><InfoOutlinedIcon onClick={(event) => handleClick(event, 8)} style={{ cursor: "pointer", fontSize: "22px", marginBottom: "3px", paddingLeft: "4px" }} /></span></th>

                        </tr>
                        <tr>
                            <th style={{ backgroundColor: "#6FA8DC" }}>Attempt<span><InfoOutlinedIcon onClick={(event) => handleClick(event, 9)} style={{ cursor: "pointer", fontSize: "22px", marginBottom: "3px", paddingLeft: "4px" }} /></span></th>
                            <th style={{ backgroundColor: "#6FA8DC" }}>Connect<span><InfoOutlinedIcon onClick={(event) => handleClick(event, 10)} style={{ cursor: "pointer", fontSize: "22px", marginBottom: "3px", paddingLeft: "4px" }} /></span></th>
                            <th style={{ backgroundColor: "#B4A7D6" }}>Attempt<span><InfoOutlinedIcon onClick={(event) => handleClick(event, 3)} style={{ cursor: "pointer", fontSize: "22px", marginBottom: "3px", paddingLeft: "4px" }} /></span></th>
                            <th style={{ backgroundColor: "#B4A7D6" }}>Connect<span><InfoOutlinedIcon onClick={(event) => handleClick(event, 4)} style={{ cursor: "pointer", fontSize: "22px", marginBottom: "3px", paddingLeft: "4px" }} /></span></th>
                            <th style={{ backgroundColor: "#6FA8DC" }}>Attempt<span><InfoOutlinedIcon onClick={(event) => handleClick(event, 5)} style={{ cursor: "pointer", fontSize: "22px", marginBottom: "3px", paddingLeft: "4px" }} /></span></th>
                            <th style={{ backgroundColor: "#6FA8DC" }}>Connect<span><InfoOutlinedIcon onClick={(event) => handleClick(event, 6)} style={{ cursor: "pointer", fontSize: "22px", marginBottom: "3px", paddingLeft: "4px" }} /></span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(function (val, index) {
                                console.log(data.length);
                                return (
                                    <tr>
                                        {val.map(function (value, i) {
                                            if (clickData[index]["ID"] == -1 || i !== 0) {
                                                if (i === 0) {
                                                    return (
                                                        <td className="text-left" >{indianFormat(value)}</td>
                                                    )
                                                }
                                                return (
                                                    <td
                                                        className={value == 0 || clickData[index]["DEALID"] == -1 ? "" : "hover_text"}
                                                        style={{ cursor: value == 0 || clickData[index]["DEALID"] == -1 ? "" : "pointer" }}
                                                        onClick={(event) => { value != 0 ? props.showDeals(clickData[index]["DEALID"], i - 1, index, props.location) : console.log(); value != 0 ? options(event, i) : console.log() }}>
                                                        {indianFormat(value)}
                                                    </td>
                                                )
                                            } else {
                                                return (
                                                    <td style={{ cursor: "pointer" }} className="d-flex justify-content-between" onClick={(event) => { props.showChild(clickData[index]["ID"], clickData[index]["NAME"], props.location); options(event, i) }}><div>{indianFormat(value)}</div><img src={Plus} style={{ width: "18px", height: "18px", marginLeft: "10px" }} /></td>
                                                )
                                            }
                                        })}
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <Typography className={classes.typography}>{content}</Typography>
                </Popover>
            </CardContent>
        </Card>
    );
}

export default CSDTable;