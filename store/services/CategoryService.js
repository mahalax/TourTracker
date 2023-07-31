import axios from 'axios';
import { baseURL } from '../api';
const API = axios.create({ baseURL: `${baseURL}` });



API.interceptors.request.use((req) => {
  
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });

export function getCategories() {
    console.log('inside get categories api call')
    return API.get(`settings/category/ViewCategories1`,);
    
  }


export function formatCategories(categoriesData) {
    let categories = [];
    for (let key in categoriesData) {
        categories.push({ ...categoriesData[key], _id: key });
    }

    return categories;
}