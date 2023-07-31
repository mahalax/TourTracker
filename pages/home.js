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
import TourEntry from './tour';

const Login = dynamic(() => import('../pages/auth/login'),{
  loading: () => <Loader/>
});


const App = (props) => {
  const {data : session} = useSession()
  const[sessionToken,setSessionToken] = useState()
  const[userrole,setUserRole] = useState("")
  const[status,setStatus] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetch_session() {
      const session = await getSession()
      
   
      if (session){
        setSessionToken(session?.user?.accessToken)
        setUserRole(session?.user?.role)
      }
      else if(!session){
        router.push(`${baseURL}`,3);
      }
    }
    fetch_session()
    setStatus(true)
  }, []);
  
  useEffect
  

  return (
   
    <>
      {!status ? <Loader/> :
        <>
        {session && 
        <>
          {console.log("userrole:", userrole,session?.user?.role)}
        {session?.user?.role === "admin" || session?.user?.role === "guide" ?  <TourEntry/> :""}
          </>
        }
        {!session && <Login/>}
        </>
      }
      <ToastContainer />
    </>
  
  )
}

export default App;
