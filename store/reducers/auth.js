import * as actionType from '../constants/actionTypes';

const initialState = {
  user: [],
  isLogged: false,
  isAdmin: false
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.AUTH_SIGNIN:
     
      return {
        ...state,
        isLogged: true
    }
    
    case actionType.LOGOUT:
      localStorage.clear();
      sessionStorage.clear();
      return { ...state, user: null,isLogged:false,isAdmin:false };

    case actionType.GET_USER:
        return {
            ...state,
            user: action.payload.user,
            isAdmin: action.payload.isAdmin
        }

    default:
      return state;
  }
};

export default authReducer;