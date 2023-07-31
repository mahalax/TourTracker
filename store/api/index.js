import axios from 'axios';
import { toast } from 'react-toastify';
export const baseURL = process.env.NEXTAUTH_URL;









// Tour Entry section

export const createTourEntry  = async (formData,token) => {
  let url =`${baseURL}api/tourentry/createtourEntry`
  let method = 'POST'
  return apicall(url,method,token,formData) 
}


export const editTourEntry  = async (id,formData,token) => {
  let url =`${baseURL}api/tourentry/edittourEntry/${id}`
  let method = 'POST'
  return apicall(url,method,token,formData) 
}

export const ViewTourEntry  = async(token) => {
  let url =`${baseURL}api/tourentry/viewtourEntry`
  let method = 'GET'
  return apicall(url,method,token) 
}


export const deleteTourEntry  = async(id,token) => 
{
  let url =`${baseURL}api/tourentry/deletetourEntry/${id}`
  let method = 'delete'
  return apicall(url,method,token) 
}

export const updateGuideStatusTourEntry  = async(id,formData,token) => 
{
  let url =`${baseURL}api/tourentry/updateGuideStatusTourEntry/${id}`
  let method = 'POST'
  return apicall(url,method,token,formData) 
}



const apicall = async (url,method,token,formData) => {
  let headers = {}
  headers.authorization = token
  console.log("formdata : ",formData)
  const response=""
  try {
    if(formData){
    response = await axios({ url: url, data:formData,method: method, headers: headers })
    }
    else{
      response = await axios({ url: url, method: method, headers: headers })
    }
    return response
  } catch (error) {
    toast.error(error.response.data?error.response.data.message:error.response)
  }
}

