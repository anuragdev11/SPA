import 'isomorphic-fetch';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

function sleep(delay = 0) {
    return new Promise(resolve => {
        setTimeout(resolve, delay);
    });
}

export default function Asynchronous(props) {
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
                        let countries;
                        let active = true;
                        let value = event.target.value;
                        let MyGroup = props.Mygroup === undefined ? "1" : props.Mygroup
                        if (active && value !== "") {
                            const url = "https://weberp6.intermesh.net:444/userlist/assignto?keyword=" + value + "&menuid="+props.menuid+"&fnsid="+props.fnsid+"&me=" + MyGroup + "&empid="+props.employeeid+"&limit=1&AK="+props.AK;                            
                            console.log(url)
                             fetch(url).then(res => res.json())
                                .then(
                                    (result) => {
                                        countries = result;
                                        if (Object.keys(countries).length > 0)
                                            setOptions(Object.keys(countries).map(key => countries[key]));
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