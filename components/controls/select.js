import React from 'react'
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText,makeStyles } from '@material-ui/core';
import useStyles from '../../styles/styles';


export default function Select(props) {

    const { name, label, value,error=null, onChange, options } = props;
    const classes = useStyles()
    return (
        
        <FormControl variant="outlined" className={classes.root2}
        {...(error && {error:true})}>
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                label={label}
                name={name}
                value={value}
                onChange={onChange}>
                   
                <MenuItem value="">None</MenuItem>
                {
                    options.map(
                        item => (<MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>)
                    )
                }
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}