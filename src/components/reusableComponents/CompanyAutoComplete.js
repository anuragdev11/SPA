import 'isomorphic-fetch';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {forEach} from "react-bootstrap/cjs/ElementChildren";

function sleep(delay = 0) {
    return new Promise(resolve => {
        setTimeout(resolve, delay);
    });
}

export default function CompanySearch(props) {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const [loading,setLoading] = React.useState(false);
    let option = props.defaultValue

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
            setLoading(false)
        }
    }, [open]);

    return (
        <Autocomplete
            id={props.id}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            className={props.className}
            getOptionSelected={(option, value) => option === value}
            getOptionLabel={option => option}
            options={options}
            defaultValue={option}
            loading={loading}
            popupIcon={""}
            renderInput={params => (
                <TextField
                    {...params}
                    label={props.label}
                    fullWidth
                    style={props.style}
                    variant="outlined"
                    onChange={function(event){
                        setLoading(true)
                        let countries = [];
                        let active = true;
                        let value = event.target.value;
                        if (active && value !== "") {
                            const url = "https://merp.intermesh.net/index.php/userlist/companydetail?native=yes&keyword=" + value + "&apiempid="+props.employeeid+"&AK="+props.AK;
                             fetch(url).then(res => res.json())
                                .then(
                                    (result) => {
                                        if(result[0].status === "200"){
                                            result[0].data.forEach(function(value) {
                                                countries.push(value.NAMEWITHGLUSERID)
                                            })
                                        }else{
                                            countries = []
                                        }
                                        if (countries.length > 0)
                                            setOptions(countries);
                                        else
                                            setLoading(false)
                                    }
                                );

                        }
                    }}
                    InputProps={{
                        ...params.InputProps,
                    }}
                />
            )}
        />
    );
}