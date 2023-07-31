import React, { useState, useRef,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container, TextField} from '@material-ui/core';

import LockOpenIcon from '@mui/icons-material/LockOpen';

//import Icon from '../../components/Auth/icon';
import { dispatchLogin } from '../../store/actions/auth';
import { AUTH_SIGNIN } from '../../store/constants/actionTypes';
let jwt = require("jsonwebtoken");
import { signIn, getCsrfToken } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { getSession } from 'next-auth/react';
import {showErrMsg, showSuccessMsg} from '../../components/utils/notification/Notification'
import {common} from '../../components/helpers/common'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useStyles from '../../components/Auth/styles'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { baseURL } from '../../store/api';
import { darkgray,TextYellow } from '../../styles/styles';
const initialState = { email: '', password: '',success:'',err:'' };



const Login = () => {



  const [user, setUser] = useState(initialState)
  const [btnLoading,setbtnLoading] = useState(false)
  const [status,setStatus] = useState(false)
  const classes = useStyles();
  const router = useRouter()
  const dispatch = useDispatch();
  let res
  
  const { register, handleSubmit, reset,formState: { errors },watch } = useForm();

  const {email, password, err, success} = user
  

  useEffect(() => {
        setStatus(true)
  }, []);
  const onSubmit = async e => {
    setbtnLoading(true)
    try {
        const response = await axios.post('/api/user/login', {email, password})
        setUser({...user, err: '', success: 'login success'})
        console.log("login res: ",response)
        localStorage.setItem('isLogged', true)
        
        dispatch(dispatchLogin())
        //router.push("/")
        if(response.status === 200 ){
      
          const user = {
            role: response.data.role,
            emailId: response.data.email,
            userId: response.data.id,
            token: response.data.token,
            
          }
          dispatch({type: 'SET_USER', payload: user})
          let decodeData = jwt.decode(response.data.token);
          console.log("decoded data exp:" , decodeData.exp)
          
            const res = (async () => await signIn('credentials', {
              redirect: false,
              accessToken: response.data.token,
              accessTokenExp: decodeData.exp,
              refreshToken: response.data.refreshtoken,
              email: response.data.email,
              role: response.data.role,
              callbackUrl: `${baseURL}`,
            }))()
            console.log("next res:",res)
            
            if (res?.error) {
              common.notify("E", res.error);
            } 
            else{
              //common.notify("S","login success");
              setbtnLoading(false)
              setStatus(false)
              router.push(`${baseURL}`,3);
             

            }
         }

    } catch (error) {
        common.notify("E",error.response.data.msg)
        localStorage.clear()
        setbtnLoading(false)
        
    }

}

 

  const handleChange = event => {
    // use spread operator
   
    const {name, value} = event.target
    setUser({...user, [name]:value, err: '', success: ''})
    
  }
  
  return (
   <>
   {status &&(
    <div className="loginbackground">
    <Container component="main" maxWidth="xs" className='loginpage'>
      <Paper className={classes.paper} elevation={3}>
        <h3 style={{alignContent:'center'}}>Tour Booking</h3>
        <Avatar className={classes.avatar}>
          <LockOpenIcon />
        </Avatar>
        <Typography component="h1" variant="h5">Sign In</Typography>
        {err && showErrMsg(err)}
           

        <form className={classes.form} autoComplete="on" onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
          <Grid item sm={12} xs={12}>
              <TextField sm={12} xs={12} className={classes.root}
               name='email'
               {...register('email', { required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ })}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                label="Email Address"
                autoFocus
              />
              <span className={classes.error}>
                {errors.email && errors.email.type === "required" && <span>This is required</span>}
                {errors.email && errors.email.type === "pattern" && <span>Enter valid email id</span>}
              </span>
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField sm={12} xs={12} className={classes.root}
              name='password'
                {...register('password', { required: true, minLength: 8 })}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                label="Password"
                type='password'
                


              />
              <span className={classes.error}>
                {errors.password && errors.password.type === "required" && <span>This is required</span>}
                {errors.password && errors.password.type === "minLength" && <span>Password must contain atleast 8 character</span>}
              </span>
            </Grid>

            
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
           {btnLoading?"Processing":"Sign In"}
          </Button>
        
         
        </form>
      </Paper>
    
    </Container>
    </div>

   )
     
    
     }
     <ToastContainer/>
     </>
  
  );
};

export default Login;