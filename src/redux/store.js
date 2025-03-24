// import { createStore, combineReducers, applyMiddleware } from "redux";
// import {thunk} from "redux-thunk";
// import { composeWithDevTools } from '@redux-devtools/extension';

// import chatReducer from "./chat-reducer";
// import { alertReducer } from "./alert-reducer";

// const rootReducer = combineReducers({
//     chatReducer,
//     alertReducer,

// });

// export const store = createStore(
//     rootReducer,
//     composeWithDevTools(applyMiddleware(thunk))
// );

import { createStore, combineReducers, applyMiddleware } from "redux";
import {thunk} from "redux-thunk"; 
import { composeWithDevTools } from "@redux-devtools/extension";

import chatReducer from "./chat-reducer";
import { alertReducer } from "./alert-reducer";

// Combine all reducers into a single root reducer
const rootReducer = combineReducers({
  chatReducer, // Handles chat-related state
  alertReducer, // Handles alert/notification state
});

// Create the Redux store
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)) // Enable Redux DevTools and apply thunk middleware
);