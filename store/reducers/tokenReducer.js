import {SET_USER} from '../constants/actionTypes'



const tokenReducer = (state = {user:""}, action) => {
    switch(action.type){
        case SET_USER:
            localStorage.setItem("user", action.payload);
            console.log('user data in login :'+ JSON.stringify(action.payload ))
            
            return {...state, user:action.payload}
        default:
            return state
    }
}

export default tokenReducer