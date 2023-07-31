import { AUTH_SIGNIN,AUTH_SIGNUP,VIEWHOMECURRENCY,GET_USER, LOGOUT } from '../constants/actionTypes';
import * as api from '../api/index.js';
import { toast } from 'react-toastify';
import { Router } from 'next/router';




export const dispatchLogin = () => {
  return {
      type: AUTH_SIGNIN
  }
}

export const signup = (formData,Router) => async (dispatch) => {

  try {
    const { data } = await api.signUp(formData);
    console.log('sign up data : ' + JSON.stringify(data))
    dispatch({ type: AUTH_SIGNUP, data });
    console.log("router :" + Router)
   
    Router.push('/auth/registerAlert');
    //toast.success( JSON.stringify(data.message))
  } catch (error) {
    console.log(error);
    toast.error (error.response
      )
  }
};




{/*export const fetchUser = async (dispatch) => {
  const res = await api.fetchUser()
  console.log("user details : " + res.data)
  return res
}
*/}



export const dispatchGetUser = (token) => async (dispatch) => {

  try {
    const { data } = await api.getloggedin_userdata(token);
    console.log('user data : ' + JSON.stringify(data))
    dispatch({ type: GET_USER, payload: {
      user: data,
      isAdmin: data.isAdmin === "true" ? true : false
  } });
  } catch (error) {
    console.log(error);
    toast.error (error.response
      )
  }
};


export const dispatchLogout = (res) =>{
  return{
    type:LOGOUT
  }
}