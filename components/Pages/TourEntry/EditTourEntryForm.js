import React, { useState, useEffect } from 'react'
import { Grid,Button,Menu,MenuItem,InputAdornment ,makeStyles,FormLabel, Tooltip} from '@material-ui/core';
import Controls from "../../controls/Controls";
import { useForm, Form } from '../../controls/useForm';
import { useDispatch } from 'react-redux';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import {useSelector} from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AddIcon from '@material-ui/icons/Add';
import moment from 'moment';
import {getSession,useSession}  from 'next-auth/react'
import { useRouter } from 'next/router'
import useStyles from '../../../styles/styles';
import { baseURL } from '../../../store/api';
import { guides, locations } from '../../constant';



export default function EditTourEntryForm(props) {

    const router = useRouter()
    const { addOrEdit, recordForEdit,currentId} = props 
    const [anchorEl, setAnchorEl] = React.useState(null);

    
    
    const classes = useStyles(); 
    const dispatch = useDispatch();
    const initialFValues = {
     
        location: '',
        guide: '',
        costOfTour:"",
        dateOfTour: new  Date(),
        guide_status:"",
        
    }

    

    const validate = (fieldValues = values) => {
        let temp = { ...errors }

        if ('location' in fieldValues)
        temp.location = !fieldValues.location?"This field is required": fieldValues.location.length != 0 ? "" : "This field is required."
    if ('guide' in fieldValues)
        temp.guide = !fieldValues.guide ? "This field is required" : fieldValues.guide.length != 0 ? "" : "This field is required."
        if ('costOfTour' in fieldValues)
            temp.costOfTour = fieldValues.costOfTour ? "" : "This field is required."          
            if ('dateOfTour' in fieldValues)
            temp.dateOfTour = !fieldValues.dateOfTour ? "This field is required" : ""
           
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            addOrEdit(values, resetForm)
        }
    }


    useEffect(() => {
        
        if (recordForEdit != null)
        {
            
            setValues({
                location: recordForEdit.location,
                 guide: recordForEdit.guide,
                 guide_status:recordForEdit.guide_status,
                dateOfTour: new Date(recordForEdit.dateOfTour),
                costOfTour: recordForEdit.costOfTour,
            });
            
        }  

           
            
        

    }, [recordForEdit])

    useEffect(() => {
        async function fetch_session() {
            const session = await getSession()
            if (!session) {
                router.push(`${baseURL}`,3);
            }
           
        }
        fetch_session()
    }, [dispatch]);
    const handleChangedateOfTour = (e) => {
        e.setHours(0,0,0,0)
        console.log("Dateee : ", e)
        
        setValues({...values, dateOfTour: e})
    }
    const flatProps = {
        
        options: guides.map((option) => option.value),
        
      };
      const flatProps1 = {
        options: locations.map((option) => option.value),
      };
     // console.log('recordData',recordData[0].category)
      //const [categoryvalue, setcategoryValue] = React.useState(recordData[0].category);
    const handleChangeGuide = (e,newValue) => {
        setValues({...values, guide: newValue})
        
    }

    const handleChangeLocation =(e,newValue) => {
       
        
        setValues({...values,location: newValue})
    }
   

  
    return (
        <Form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12}> 
                <Autocomplete
                size="small"
                        {...flatProps}
                        name="guide"
                       
                        value={values.guide}
                        onChange={handleChangeGuide}
                        
                        renderInput={(params) => <Controls.Input  {...params}
                            label="Guide"
                            margin="normal" variant="outlined"
                            error={errors.guide}
                                                    />}
                                   
                    />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                    <Autocomplete
                    size="small"
                        {...flatProps1}
                        name="location"
                        
                        value={values.location}
                        onChange={handleChangeLocation}
                        renderInput={(params) => <Controls.Input  {...params}
                            label="Location"
                            margin="normal" variant="outlined"
                            error={errors.location}
                        />}
                       
                    />
                     
                
               </Grid> 
            </Grid>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container>
                <Grid item xs={12} >
                        <KeyboardDatePicker className={classes.root2}
                        size="small"
                        inputVariant="outlined"
                            margin="normal"
                            name="dateOfTour"
                            id="dateOfTour"
                            label="Date Of Tour*"
                            format="dd/MM/yyyy"
                            value={values.dateOfTour}
                            onChange={handleChangedateOfTour}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />

                   
                    {errors.dateOfTour && <span style={{color:'red',fontSize:'13px',marginBottom:'20px'}}> {errors.dateOfTour} </span>}
                    </Grid>
                    
                </Grid>
                
            </MuiPickersUtilsProvider>
            <Grid container>
                <Grid item xs={12} >
              
                   
                    <Grid container >
                    <Grid item xs={12} sm={6}>
                    <Controls.Input
                        name="costOfTour"
                        label="Tour Cost(AED)"
                        value={values.costOfTour}
                        onChange={handleInputChange}
                        type="number"
                        error={errors.costOfTour}
                    />
                    </Grid>
                  
                   
                </Grid>
                </Grid>
                
                </Grid>
                <Grid container justifyContent="center">
              <Button
                type="submit"
                color="primary"
                variant="contained"
                className={classes.submit}
              >
                Submit
              </Button>
              <Button
                color="primary"
                variant="contained"
                onClick={resetForm}
                className={classes.submit}
              >
                Cancel
              </Button>
                                        </Grid>
        </Form>
    )
}