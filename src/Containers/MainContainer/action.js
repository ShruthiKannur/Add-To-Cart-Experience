import React from 'react';
import { jsonData } from '../../mockData.js';

const handlers = {
  ["SET_DATA"]: (state, action) => {
    return [...action.data];
  }
};

export const fetchData = () => (dispatch, state) => {
  /*
  fetch('https://api.myjson.com/bins/qzuzi', {method: 'GET'}).then((result) => {
    console.log('result = ', result);
    return result.json();
  }).then((res) => {
    console.log('res = ', res);
    dispatch({type: 'SET_DATA', data: res});
  }).catch((error) => {
    console.log('error = ', error)
    dispatch({type: 'SET_DATA', data: mockData});
  });*/
  setTimeout(() => {
    dispatch({type: 'SET_DATA', data: jsonData.items});
  }, 50);
}

export default function(state = [], action) {
  const handler = handlers[action.type];
  if (handler) {
    return handler(state, action);
  }
  return state;
}
