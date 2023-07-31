import React, { useEffect } from 'react';

import { TextField as MuiTextField,makeStyles} from '@material-ui/core';
import useStyles from '../../styles/styles';



export default function Input(props) {

    const { name, label, value,error=null, onChange,...other } = props;
  
    const classes = useStyles();
    
    return (
       
        <MuiTextField
        size="small"
            variant="outlined"
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            className={classes.root2}
            {...other}
            {...(error && {error:true,helperText:error})}
            
        />
 
    )
}