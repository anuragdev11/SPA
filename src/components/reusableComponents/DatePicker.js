import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    DatePicker,
} from '@material-ui/pickers';
import ClearIcon from '@material-ui/icons/Clear';
import EventIcon from '@material-ui/icons/Event';
import Calender from '../../assets/logos/calendar.svg';

export default function CustomDatePicker(props) {
    const [selectedDate, setSelectedDate] = React.useState(props.Date === undefined?null:props.Date);
    const handleDateChange = (date) => {
            setSelectedDate(date);
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div id="DatePickerContainer" className="d-flex">
                <DatePicker
                    label={props.label}
                    format="dd/MM/yyyy"
                    margin="normal"
                    id={props.id}
                    style={props.style === undefined?{width: "150px",marginRight: "10px"}:props.style}
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    autoOk={props.autoOk === undefined ? false : props.autoOk}

                />
            {props.clear?<div style={{position : "absolute",color: "#707070",cursor: "pointer"}}><ClearIcon style={props.clearStyle === undefined?{position: "relative",left: "98px",top: "19px"}:props.clearStyle} onClick={()=>handleDateChange(null)}/></div>:""}
            {props.iconType? <div style={{color: "#707070",cursor: "pointer",position: "relative",top: "19px",right: "109px",zIndex: "-1"}} > <img src={Calender} style={{width: "35px",height: "22px", top: "50px",zIndex:"-1"}} className="loader"/> </div> : <div style={{color: "#707070",cursor: "pointer",position: "absolute"}}><EventIcon style={props.calStyle === undefined?{position: "relative",left: "121px",top: "19px",zIndex: "-1"}:props.calStyle}/></div>}
            {/* <div style={{color: "#707070",cursor: "pointer",position: "absolute"}}><EventIcon style={props.calStyle === undefined?{position: "relative",left: "121px",top: "19px",zIndex: "-1"}:props.calStyle}/></div> */}
            </div>
        </MuiPickersUtilsProvider>
    );
}
