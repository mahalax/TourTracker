import React, { useState, useEffect } from 'react'
import { Paper, Avatar, Grid, InputLabel, Button, makeStyles, FormControlLabel, MenuItem, FormControl, Select, TextField, Accordion, AccordionSummary, AccordionDetails, Typography, Menu, Tooltip, FormHelperText } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { useDispatch } from 'react-redux';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  validate,
} from "@material-ui/pickers";

import Autocomplete from '@material-ui/lab/Autocomplete';

import { Formik } from "formik";
import _ from "lodash";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { darkgray, TextYellow } from '../../../styles/styles';
import useStyles  from '../../../styles/styles';
import AddIcon from '@material-ui/icons/Add';
import { useRouter } from 'next/router'
import Controls from "../../controls/Controls";
import { useSelector } from 'react-redux';
import { getSession, useSession } from 'next-auth/react'
import { baseURL } from '../../../store/api';
import { guides, locations } from '../../constant';


const useStyles1 = makeStyles((theme) => ({

  box: {
    padding: "1px",
    height: "80%",
    overflow: "auto",
  },
  buttonPad: {
    paddingTop: "20px",
  },
  fieldMargin: {
    margin: '10px'
  },
  heading: {

    paddingLeft: "15px"
  },
  heading2: {
    paddingTop: "5px",
    paddingLeft: "15px"
  },
  caption: {
    paddingLeft: "15px",
    marginTop: "-10px"
  },
  errormsg: {
    color: "goldenrod",
  },
  fieldPadding: {
    padding: "10px"
  },
  fullwidth: {
    width: "100%"
  },
  submit: {
    color: "black",
    backgroundColor: `${TextYellow}`,
    margin: '2px',
    "&:hover": {

      color: `${TextYellow}`,
      backgroundColor: `${darkgray}`
    }
  },
  dateerror:{
    "& .MuiFormHelperText-root":{
    color:"red",
    paddingLeft:"10px"
  }
}


}))




export default function AddTourEntryForm(props) {
  const {addOrEdit} = props
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [tourEntryerror,settourEntryerror] = useState("")
  const router = useRouter()
  /** Start  - Add Category and Sub Category option via this form */
  
  const handleClose = (e) => {
    setAnchorEl(null);
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  /** End - Add Category and Sub Category option via this form*/


  const [tourEntry, settourEntry] = useState([{
    location: '',
    guide: '',
    costOfTour:"",
    dateOfTour: new  Date()
  }])

  const dispatch = useDispatch();
  const classes = useStyles1();
  const classes1 = useStyles()

  const ClearForm = () => {
    settourEntryerror("")
    settourEntry([{
      location: '',
      guide: '',
      costOfTour:0,
      dateOfTour: new  Date()
    }])
  }

  const handleAddClick = () => {
    settourEntry([
      ...tourEntry,
      {
        location: '',
        guide: '',
        costOfTour:"",
        dateOfTour: new  Date()
      },
    ]);
  };

  // Add Customer Fields
  const handleInputChange = (e, index) => {
    console.log("handleinputchange : ", e, index)
    let { name, value } = e.target;
    let list = [...tourEntry];
   
    list[index][name] = value;
   console.log("list :",list)
   if (list[index]["location"] === "" || list[index]["location"] === null) {

    list[index]["locationerror"] = "Please enter location"
  }
  else {
    list[index]["guideerror"] = ""
  }
    if (list[index]["guide"] === "" || list[index]["guide"] === null) {

      list[index]["guideerror"] = "Please enter Guide"
    }
    else {
      list[index]["guideerror"] = ""
    }
    if (list[index]["costOfTour"] === "" || list[index]["costOfTour"] === null) {

      list[index]["costOfTourerror"] = "Please enter the costOfTour"
    }
    else {
      list[index]["costOfTourerror"] = ""
    }

    
    if (list[index]["dateOfTour"] === "" || list[index]["dateOfTour"] === null) {

      list[index]["dateOfTourerror"] = "Please enter dateOfTour"
    }
    else {
      list[index]["dateOfTourerror"] = ""
    }




    settourEntry(list);
  };




  const handleChangedateOfTour = (e, date, index) => {
    e.setHours(0,0,0,0)
    console.log("tour date:", e,index)
    let list = [...tourEntry];
    list[index]["dateOfTour"] = e
    if (list[index]["dateOfTour"] === "" || list[index]["dateOfTour"] === null) {

      list[index]["dateOfTourerror"] = "Please enter dateOfTour"
    }
    else {
      list[index]["dateOfTourerror"] = ""
    }
    settourEntry(list);
  }

  useEffect(() => {
    async function fetch_session() {
      const session = await getSession()
      if (!session) {
        router.push(`${baseURL}`, 3);
      }
     
    }
    fetch_session()
  }, []);

  

  const handleGuideInputChange = (e,value, index) => {
    let list = [...tourEntry];
    let result = guides.filter(item => item.label == value)
    console.log("----> e,index : ",value,index,result)
    list[index]["guide"] = result && result.length > 0 ? result[0].value : "";

    settourEntry(list);
  }

  
  const handleLocationInputChange = (e,value, index) => {
    let list = [...tourEntry];
    let result = locations.filter(item => item.label == value)
    console.log("----> e,index : ",value,index,result)
    list[index]["location"] = result && result.length > 0 ? result[0].value : "";

    settourEntry(list);
  }
  const flatProps = {

    options: guides.map((option) => option.value),

  };
  const flatProps1 = {

    options: locations.map((option) => option.value),

  };
  




  const deletetourEntry = async (value, index) => {

    const list = [...tourEntry];
    list.splice(index, 1);
    settourEntry(list);

  }

  const handleSubmit = (entrylist) => {
    
      addOrEdit(entrylist)
   
  }




 
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Formik
        initialValues={{

        }}
        validate={(values) => {
          const errors = {};
          settourEntryerror("")
          var error_count = tourEntry.filter(function (obj) {
            return obj.location == "" || obj.guide == "" || obj.dateOfTour ==""|| obj.dateOfTour == null  ||
            obj.costOfTour =="" ;
          })
          if(error_count){

          }
          if (error_count.length !== 0) {
            errors.tourEntry = "Please fill all mandatory fields properly or delete unwanted tour entry"
            settourEntryerror("Please fill all mandatory fields properly or delete unwanted tour entry")
          }

          if (tourEntry.length === 0) {
            errors.tourEntry = "Please enter atleast 1 entry"
            settourEntryerror("Please enter atleast 1 entry")
          }
       
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {

          let new_list = tourEntry.map(function(obj) {
            return {
              location: obj.location,
              guide: obj.guide,
              dateOfTour: obj.dateOfTour,
              costOfTour:obj.costOfTour,
            }
          });
          handleSubmit(new_list)

          setSubmitting(false);

        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} className="mb_15">

            <div className={classes.box}>
              
              {tourEntry !== "" && tourEntry !== undefined && tourEntry.length > 0
                ? tourEntry.map((x, i) => {

                  return (
                    <>

                      <Accordion key={i}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Avatar style={{ background: `${TextYellow}` }}>{(i + 1)}</Avatar>
                          <Grid container ><Grid item xs={12}>
                            <Typography variant='subtitle1' gutterBottom style={{ paddingTop: "5px", paddingLeft: "10px" }}>{"Entry " + (i + 1)}</Typography>
                          </Grid>
                            <Grid item className={classes.caption}><Typography variant="caption" >{x.relationship}</Typography></Grid>
                          </Grid>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Grid container>
                            <Grid item xs={12} sm={4} md={3} className={classes.fieldPadding}>
                            <Autocomplete
                             size="small"
                        {...flatProps}
                        name="guide"
                       
                        value={x.guide}
                        onChange={(event,value)=>handleGuideInputChange(event,value,i)}
                        
                        renderInput={(params) => <Controls.Input  {...params}
                            label="Guide*"
                            margin="normal" variant="outlined"
                            error={x.guideerror}
                                                    />}
                                                   
                       
                    />
                              
                            </Grid>

                            <Grid item xs={12} sm={4} md={3} className={classes.fieldPadding}>
                            <Autocomplete
                            size="small"
                        {...flatProps1}
                        name="location"
                       
                        value={x.location}
                        onChange={(event,value)=>handleLocationInputChange(event,value,i)}
                        
                        renderInput={(params) => <Controls.Input  {...params}
                            label="location*"
                            margin="normal" variant="outlined"
                            error={x.locationerror}
                                                    />}
                                                   
                       
                    />
                              
                            </Grid>


                           
                            <Grid item xs={12} sm={4} md={3} className={`${classes.fieldPadding} ${classes.fullwidth}`}>
                              <KeyboardDatePicker className={`${classes1.root2} ${classes.fullwidth}`}
                              size="small"
                                inputVariant="outlined"
                                margin="normal"
                                name="dateOfTour"
                                id="dateOfTour"
                                label="Date of Tour*"
                                format="dd/MM/yyyy"
                                value={x.dateOfTour}
                                onChange={(e, val) => handleChangedateOfTour(e, val, i)}
                                KeyboardButtonProps={{
                                  'aria-label': 'change date',
                                }}
                              />
                              {<span className={classes.dateerror}><FormHelperText >{x.dateOfTourerror}</FormHelperText></span>}
                            </Grid>


                            <Grid item xs={12} sm={4} md={2} className={`${classes.fieldPadding} ${classes.fullwidth}`}>
                              <Controls.Input
                                className={`${classes1.root2} ${classes.fullwidth}`}
                                style={{marginTop:"15px"}}
                                name="costOfTour"
                                label="Tour Cost(AED)*"
                                value={x.costOfTour}
                                onChange={(e)=>handleInputChange(e,i)}
                                type="number"
                                error={x.costOfTourerror}
                                InputProps={{
                                  inputProps: { min: 1 },
                                  style: { fontSize: 16 }
                                }}

                                InputLabelProps={{ style: { fontSize: 14 } }} // font size of input label
                              />


                            </Grid>



                            <Grid item xs={2} sm={2} md={1} className={`${classes.buttonPad} `}>

                                <DeleteIcon    onClick={() => deletetourEntry(x, i)} style={{ color: "crimson", borderColor: "crimson" }}  className={classes.fieldMargin}/>
                             

                            </Grid>
                          </Grid>

                        </AccordionDetails>
                      </Accordion>



                    </>
                  );
                })
                : ""}
              <div className="btn-box">

                <>
                <div className='errMsg'>{tourEntryerror}</div>
                  <Button

                    onClick={handleAddClick}
                    className={classes.submit}
                  >
                    <AddCircleIcon /> Add Tour Entry
                  </Button>

                  
                

            

                </>

              </div>

            </div>


            <Grid container className='justifyBtns'>
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
                onClick={ClearForm}
                className={classes.submit}
              >
                Cancel
              </Button>
             
            </Grid>
          </form>
        )}
      </Formik>
      <ToastContainer />
    </MuiPickersUtilsProvider>
  )
}  