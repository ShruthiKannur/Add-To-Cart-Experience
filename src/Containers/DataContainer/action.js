import React from 'react';

const handlers = {
  ["ADD_TO_CART"]: (state, action) => {
    if (state[action.name]) {
      return {
        ...state,
        [action.name]: state[action.name] + 1
      };
    }
    return {
      ...state,
      [action.name]: 1,
    };
  },
  ["DECREASE_CART_ITEM"] : (state, action) => {
    return {
      ...state,
      [action.name]: state[action.name] - 1,
    }
  },
  ["INCREASE_CART_ITEM"] : (state, action) => {
    return {
      ...state,
      [action.name]: state[action.name] + 1,
    }
  },
};

export default function(state = {}, action) {
  const handler = handlers[action.type];
  if (handler) {
    return handler(state, action);
  }
  return state;
}
