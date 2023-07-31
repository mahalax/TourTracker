import {createStore,applyMiddleware,compose} from 'redux';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/index';
import { composeWithDevTools } from "redux-devtools-extension";

import { persistStore, persistReducer } from 'redux-persist'
import storage from './storage'
const bindMiddleware = (middleware) => {
    if(process.env.NODE_ENV !== 'production'){
      
        return composeWithDevTools(applyMiddleware(...middleware))
    }
    return applyMiddleware(...middleware)
}
const persistConfig = {
    key: 'root',
    storage,
  }
  const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer,bindMiddleware([thunkMiddleware]))
export const persistor = persistStore(store)