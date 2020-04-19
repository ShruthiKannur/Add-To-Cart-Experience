import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import mainContainerReducer from './Containers/MainContainer/action.js';
import dataContainerReducer from './Containers/DataContainer/action.js';

const rootReducer = combineReducers({data: mainContainerReducer, cartItems: dataContainerReducer});
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
