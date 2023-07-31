import { ADDTOURENTRY, DELETETOURENTRY, EDITTOURENTRY, VIEWTOURENTRY,REMOVETOURENTRY,LOGOUT, VIEWCURRENTMONTHTOURENTRY} from "../constants/actionTypes";

export default (tourentries = [], action) => {
  
    switch (action.type) {
      case VIEWTOURENTRY:
        return action.payload;
      case ADDTOURENTRY:
        console.log("action.payload:",action.payload)
       let result = tourentries.concat(action.payload)
        return result;
      case EDITTOURENTRY:
        return tourentries.map((tourentry) => (tourentry._id === action.payload._id ? action.payload : tourentry));
     
        case DELETETOURENTRY:
        return tourentries.filter((tourentry) => tourentry._id !== action.payload);
     
       
      default:
        return tourentries;
    }
  };