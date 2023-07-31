import React, {useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import decode from 'jwt-decode';
import * as actionType from '../../store/constants/actionTypes'
import axios from 'axios' 
import {dispatchLogin, fetchUser, dispatchGetUser,dispatchLogout} from '../../store/actions/auth'
import { useRouter }  from 'next/router'
import dynamic from "next/dynamic";
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useSession, signIn, signOut,getSession} from 'next-auth/react';
import {common} from '../../components/helpers/common'
import { baseURL } from '../../store/api';
import Toolbar from '@material-ui/core/Toolbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Loader from '../controls/Loader';
const useStyles = makeStyles((theme) => ({
   
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
      paddingTop:'10px',
      paddingBottom:'10px',
      paddingLeft:'20px'
    },
    background:{
      backgroundColor:'#181f4b',
    },
    
    
  }));



  const HeaderNavBar  = dynamic(() => import( './material-ui-toolbar'),{
    loading: () => <Loader/>, ssr: false
  });
  

const Header = props => {
 const {data :session} = useSession() 
  const router = useRouter()
 const classes = useStyles()
const[token,setToken] = useState("")



const user = useSelector(state=>state.auth.user)
const dispatch = useDispatch();

 // Logout user
 const logoutUser = async() => {
  try{
    
  localStorage.clear();
  sessionStorage.clear();
  
  const res= await axios.get('/api/user/logout')
  
  dispatch(dispatchLogout())
 

  const data = await signOut({redirect: false, callbackUrl: `${baseURL}`})
  console.log("data.url : ", data,data.url)
  //common.notify("S", "Successfully signed out")
  router.push(`${baseURL}`);
  }catch (err) {
    router.push(`${baseURL}`);
}

};


 
  useEffect(() =>{
    

    async function fetch_session() {
     const session = await getSession()

     if (session) {
         
         setToken(session?.user?.accessToken)
         if (session?.error === "RefreshAccessTokenError") {
         
          //signOut()
          const data = await signOut({redirect: false, callbackUrl: `${baseURL}`})
  console.log("data.url : ", data,data.url)
  //common.notify("S", "Successfully signed out")
  router.push(`${baseURL}`);
         
        }
        dispatch(dispatchGetUser(session?.user?.accessToken))
     }
    
   }
   fetch_session()
   
   },[])
  
    return (
  <>
 
    
        <>
         {session  &&
                            
        <HeaderNavBar  logoutUser={logoutUser}/>
         }
      
         {!session && 
          <div>
          <AppBar position="static" className={classes.background}>
            <Toolbar>
            <Typography variant="h6" noWrap>
          Tour <span id='heading'>Tracker</span>
        </Typography>
            </Toolbar></AppBar>
        </div>
         }
         
        </>
 
      </>
    )
  
}


export default Header;