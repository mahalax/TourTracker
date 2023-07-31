import { combineReducers } from 'redux';
import auth from './auth';

import tourentries from './tourEntry'
const reducers = combineReducers({   
    auth ,
    tourentries,
    
    });

export default (state, action) =>
 reducers(action.type === 'LOGOUT' ? undefined : state, action);