import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Table from "react-bootstrap/Table";
import Plus from "../../assets/logos/plus.png";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Popover from '@material-ui/core/Popover';
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}));

function OSTable(props){
    const classes = useStyles();
    const [clickData,setClickData] = React.useState([]);
    const [data,setData] = React.useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [content, setContent] = React.useState("");

    const handleClick = (event,val) => {
        if(val === 1)
            setContent("Deal amount pending till yesterday")
        if(val === 2)
            setContent("Last Month OS")
        if(val === 3)
            setContent("Deal amount pending from Today to Month end")
        if(val === 4)
            setContent("Deal amount pending for Next month")
        if(val === 5)
            setContent("Deal amount pending for Next month Onwards")
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const makeData = () => {
        let i = 0;
        let finalResult = [];
        let clickData = [];
        let colTotal = 0
        let colTotalDeals = 0
        let colTotalCheques = 0
        while(i<props.data["OVERDUE"].length){
            let result = [];
            let clickValues = {}
            clickValues["NAME"] = props.data["OVERDUE"][i]["NAME"]
            clickValues["ID"] = props.data["OVERDUE"][i]["ID"]
            clickValues["DEALID"] = props.data["OVERDUE"][i]["ID"]
            clickData.push(clickValues);
            if(props.data["OVERDUE"][i]["DRILL"] !== 1 && props.data["Last Month"][i]["DRILL"] !== 1 && props.data["Current Month"][i]["DRILL"] !== 1 && props.data["Next Month"][i]["DRILL"] !== 1 && props.data["Remaining"][i]["DRILL"] !== 1){
                clickValues["ID"] = -1
            }
            let rowTotal = 0;
            let rowTotalDeals = 0;
            let rowTotalCheques = 0;
            result.push(props.data["OVERDUE"][i]["NAME"]);
            result.push(props.data["OVERDUE"][i]["AMOUNT"]);
            result.push(props.data["OVERDUE"][i]["DEALS"]);
            result.push(props.data["OVERDUE"][i]["CHEQUES"]);

            rowTotal += Math.round(props.data["OVERDUE"][i]["AMOUNT"]);
            rowTotalDeals += Math.round(props.data["OVERDUE"][i]["DEALS"]);
            rowTotalCheques += Math.round(props.data["OVERDUE"][i]["CHEQUES"]);

            result.push(props.data["Last Month"][i]["AMOUNT"]);
            result.push(props.data["Last Month"][i]["DEALS"]);
            result.push(props.data["Last Month"][i]["CHEQUES"]);

            // rowTotal += Math.round(props.data["Last Month"][i]["AMOUNT"]);
            // rowTotalDeals += Math.round(props.data["Last Month"][i]["DEALS"]);
            // rowTotalCheques += Math.round(props.data["Last Month"][i]["CHEQUES"]);

            result.push(props.data["Current Month"][i]["AMOUNT"]);
            result.push(props.data["Current Month"][i]["DEALS"]);
            result.push(props.data["Current Month"][i]["CHEQUES"]);

            rowTotal += Math.round(props.data["Current Month"][i]["AMOUNT"]);
            rowTotalDeals += Math.round(props.data["Current Month"][i]["DEALS"]);
            rowTotalCheques += Math.round(props.data["Current Month"][i]["CHEQUES"]);

            result.push(props.data["Next Month"][i]["AMOUNT"]);
            result.push(props.data["Next Month"][i]["DEALS"]);
            result.push(props.data["Next Month"][i]["CHEQUES"]);

            rowTotal += Math.round(props.data["Next Month"][i]["AMOUNT"]);
            rowTotalDeals +=Math.round( props.data["Next Month"][i]["DEALS"]);
            rowTotalCheques += Math.round(props.data["Next Month"][i]["CHEQUES"]);

            result.push(props.data["Remaining"][i]["AMOUNT"]);
            result.push(props.data["Remaining"][i]["DEALS"]);
            result.push(props.data["Remaining"][i]["CHEQUES"]);

            rowTotal += Math.round(props.data["Remaining"][i]["AMOUNT"]);
            rowTotalDeals += Math.round(props.data["Remaining"][i]["DEALS"]);
            rowTotalCheques += Math.round(props.data["Remaining"][i]["CHEQUES"]);
            colTotal += rowTotal;
            colTotalCheques += rowTotalCheques;
            colTotalDeals += rowTotalDeals;
            result.push(rowTotal);
            result.push(rowTotalDeals);
            result.push(rowTotalCheques);
            finalResult.push(result);
            i++;
        }
        // let clickValues = {};
        // clickValues["NAME"] = "";
        // clickValues["ID"] = -1;
        // clickValues["DEALID"] = -1;
        // clickData.push(clickValues);
        clickData.push(clickData[0]);
        console.log(clickData);
        setClickData(clickData);
        let result = [];
        result.push("Total");
        let keyArr = ["OVERDUE","Last Month","Current Month","Next Month","Remaining"];
        keyArr.map(function(val) {
            let totalAmount = 0;
            let totalDeals = 0;
            let totalCheques = 0;
            props.data[val].map(function(v){
                totalAmount += Math.round(v["AMOUNT"]);
                totalDeals += Math.round(v["DEALS"]);
                totalCheques += Math.round(v["CHEQUES"]);
            });
            result.push(totalAmount);
            result.push(totalDeals);
            result.push(totalCheques);
        });
        result.push(colTotal);
        result.push(colTotalDeals);
        result.push(colTotalCheques);
        finalResult.push(result);
        return finalResult
    };

    const indianFormat = (value) => {
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
    };

    const options = (event,index) => {
        let parentElement = event.target.parentElement;
        let currentElement = event.target;
        if(event.target.parentElement.tagName === "TD" || event.target.parentElement.tagName === "DIV"){
            currentElement = parentElement;
            parentElement = parentElement.parentElement
        }

        for (let i = 0; i < parentElement.parentElement.children.length; i++) {
            for(let j = 0;j<parentElement.parentElement.children[i].children.length;j++) {
                parentElement.parentElement.children[i].children[j].classList.remove("highlight")
            }
        }

        if(index === 0) {
            currentElement.classList.add("highlight")
        }else {
            let j = index - (index%3 === 0?3:index%3)+1;
            for (let i = j; i < j+3; i++) {
                parentElement.children[i].classList.add("highlight")
            }
        }
    };

    React.useEffect( ()=>{async function setState(){await setData(makeData); if(props.location !== 0)window.scrollTo(0,document.body.scrollHeight); else window.scrollTo(0,0);} setState();},[props.data]);

    return (
        <Card style={props.style}>
            <CardContent>
                <Table className="text-center mb-0 utable" bordered hover options={options}>
                    <thead>
                    <tr>
                        <th rowSpan="2" style={{backgroundColor: "#EAD1DC",width: "200px",minWidth: "200px"}}>Name</th>
                        <th colSpan="3" style={{backgroundColor: "#D5A6BD"}}>Overdue OS<span><InfoOutlinedIcon onClick={(event)=>handleClick(event,1)} style={{cursor: "pointer",fontSize: "22px",marginBottom: "3px",paddingLeft: "4px"}}/></span></th>
                        <th colSpan="3" style={{backgroundColor: "#B4A7D6",display: "none"}}>Last Month OS Pending<span><InfoOutlinedIcon onClick={(event)=>handleClick(event,2)} style={{cursor: "pointer",fontSize: "22px",marginBottom: "3px",paddingLeft: "4px"}}/></span></th>
                        <th colSpan="3" style={{backgroundColor: "#6FA8DC"}}>Current Month OS Pending<span><InfoOutlinedIcon onClick={(event)=>handleClick(event,3)} style={{cursor: "pointer",fontSize: "22px",marginBottom: "3px",paddingLeft: "4px"}}/></span></th>
                        <th colSpan="3" style={{backgroundColor: "#A2C4C9"}}>Next Month OS Pending<span><InfoOutlinedIcon onClick={(event)=>handleClick(event,4)} style={{cursor: "pointer",fontSize: "22px",marginBottom: "3px",paddingLeft: "4px"}}/></span></th>
                        <th colSpan="3" style={{backgroundColor: "#B6D7A8"}}>Future OS Pending<span><InfoOutlinedIcon onClick={(event)=>handleClick(event,5)} style={{cursor: "pointer",fontSize: "22px",marginBottom: "3px",paddingLeft: "4px"}}/></span></th>
                        <th colSpan="3" style={{backgroundColor: "#8bc473"}}>Total</th>
                    </tr>
                    <tr>
                        <th style={{backgroundColor: "#D5A6BD"}}>Amount</th>
                        <th style={{backgroundColor: "#D5A6BD"}}>Deals</th>
                        <th style={{backgroundColor: "#D5A6BD"}}>Cheques</th>
                        <th style={{backgroundColor: "#B4A7D6",display: "none"}}>Amount</th>
                        <th style={{backgroundColor: "#B4A7D6",display: "none"}}>Deals</th>
                        <th style={{backgroundColor: "#B4A7D6",display: "none"}}>Cheques</th>
                        <th style={{backgroundColor: "#6FA8DC"}}>Amount</th>
                        <th style={{backgroundColor: "#6FA8DC"}}>Deals</th>
                        <th style={{backgroundColor: "#6FA8DC"}}>Cheques</th>
                        <th style={{backgroundColor: "#A2C4C9"}}>Amount</th>
                        <th style={{backgroundColor: "#A2C4C9"}}>Deals</th>
                        <th style={{backgroundColor: "#A2C4C9"}}>Cheques</th>
                        <th style={{backgroundColor: "#B6D7A8"}}>Amount</th>
                        <th style={{backgroundColor: "#B6D7A8"}}>Deals</th>
                        <th style={{backgroundColor: "#B6D7A8"}}>Cheques</th>
                        <th style={{backgroundColor: "#8bc473"}}>Amount</th>
                        {/*<th style={{backgroundColor: "#B6D7A8"}}>Deals</th>*/}
                        <th style={{backgroundColor: "#8bc473"}}>Cheques</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        data.map(function(val,index) {
                            return(
                                <tr>
                                    {val.map(function(value,i) {

                                        if(clickData[index]["ID"] === -1 || i !== 0) {
                                            if(i === 0){
                                                return (
                                                    <td className="text-left" >{indianFormat(value)}</td>
                                                )
                                            }
                                            return (
                                                <td className={value==0 || clickData[index]["DEALID"] === -1?"":"hover_text"} style={{cursor: value==0 || clickData[index]["DEALID"] === -1?"":"pointer"}} onClick={(event)=>{value != 0?props.showDeals(clickData[index]["DEALID"],i-1,index,props.location):console.log(); value != 0?options(event,i):console.log()}}>{indianFormat(value)}</td>
                                            )
                                        }else{
                                            return (
                                                <td style={{cursor: "pointer"}} className="d-flex justify-content-between" onClick={(event)=>{props.showChild(clickData[index]["ID"],clickData[index]["NAME"],props.location); options(event,i)}}><div>{indianFormat(value)}</div><img src={Plus} style={{width: "18px",height: "18px",marginLeft: "10px"}}/></td>
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

export default OSTable;