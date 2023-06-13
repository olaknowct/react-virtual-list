import { createAction } from '../../utils/reducer/reducer.utils';
import { LIST_ACTION_TYPES } from './list.types';

export const setVirtualList = (virtualListArray) => {
  return createAction(LIST_ACTION_TYPES.SET_VIRTUAL_LIST, virtualListArray);
};
