import {
    createStore,
    combineReducers,
    applyMiddleware,
    compose
  } from "redux";
  import * as reducers from "../../server/reducers";
  import logger from "../../server/logger";
  
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
  export default createStore(
    combineReducers(reducers),
    composeEnhancers(applyMiddleware(logger))
  );
  