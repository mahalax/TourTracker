import React,{useEffect,lazy, Suspense,useState} from 'react';
import { Container } from '@material-ui/core';
import { useRouter } from 'next/router'
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios'
import dynamic from "next/dynamic";
import Cookies from 'cookies'
import { getSession, useSession } from 'next-auth/react'
import HeaderNav from '../components/Toolbar/Header'
import { ToastContainer } from 'react-toastify';
import { baseURL } from '../store/api';
import Loader from '../components/controls/Loader';

const Login = dynamic(() => import('../pages/auth/login'),{
  loading: () => <Loader/>
});


const App = (props) => {
  const {data : session} = useSession()
  const router = useRouter()


  const redirectHomePage = () => {
    router.push('/home')
  }
 

  return (
   
    <>
    
        {session && 
        
          redirectHomePage() 
        }
        {!session && <Login/>}
     
      <ToastContainer />
    </>
  
  )
}

export default App;

