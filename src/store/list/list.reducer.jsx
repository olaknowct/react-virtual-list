import { LIST_ACTION_TYPES } from './list.types';

const INITIAL_STATE = {
  virtualList: [],
};

export const listReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case LIST_ACTION_TYPES.SET_VIRTUAL_LIST:
      return {
        ...state,
        virtualList: payload,
      };
    default:
      return state;
  }
};
