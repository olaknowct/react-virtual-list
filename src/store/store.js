import logger from 'redux-logger';
import { rootReducer } from './root-reducer';
import { rootSaga } from './root-saga';
import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [logger, sagaMiddleware];

export const store = configureStore({
  reducer: rootReducer,
  middleware: middlewares,
});

sagaMiddleware.run(rootSaga);
