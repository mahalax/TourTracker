import { ADDTOURENTRY,EDITTOURENTRY, VIEWTOURENTRY ,DELETETOURENTRY,EDITSTATUSTOURENTRY} from '../constants/actionTypes';
import * as api from '../api/index.js';
import { toast } from 'react-toastify';
export const createTourEntry = (formData, router,token) => async (dispatch) => {
  try {
    const { data } = await api.createTourEntry(formData,token);
    console.log('under create TOURENTRY in actions:')
    console.log(data)
    dispatch({ type: ADDTOURENTRY, payload:data });
    toast.success('Tour Entry successfully added')
    
  } catch (error) {
    console.log(error);
    
    toast.error (error.response)
    
  }
};

export const ViewTourEntry = (token) => async (dispatch) => {
  try {
    const { data } = await api.ViewTourEntry(token);
    console.log('inside  ViewTOURENTRY action api call')
    dispatch({ type: VIEWTOURENTRY, payload: data });
  } catch (error) {
    toast.error (error.response)
  }
};



export const editTourEntry = (id,formData, router,token) => async (dispatch) => {
  try {
    const { data } = await api.editTourEntry(id,formData,token);

    dispatch({ type: EDITTOURENTRY, payload: data });
    toast.success('successfully Edited');
  
  } catch (error) {
    console.log(error);
    toast.error (error.response)
  }
};

export const deleteTourEntry = (id,token) => async (dispatch) => {
  try {
    await api.deleteTourEntry(id,token);

    dispatch({ type: DELETETOURENTRY, payload: id });
    toast.success('successfully deleted')
  } catch (error) {
    console.log(error.message);
    toast.error (error.response)
  }

 
 
};



export const updateGuideStatusTourEntry = (id,formData,token) => async (dispatch) => {
  try {
    await api.updateGuideStatusTourEntry(id,formData,token);
    dispatch({ type: VIEWTOURENTRY, payload: data });
  } catch (error) {
    console.log(error.message);
    toast.error (error.response)
  }
}

