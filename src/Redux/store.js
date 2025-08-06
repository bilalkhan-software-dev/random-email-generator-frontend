import {
  applyMiddleware,
  combineReducers,
  legacy_createStore,
} from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { authReducer } from "./Auth/authReducer";
import { emailReducer } from "./Email/emailReducer";
import { userReducer } from "./User/userReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  email: emailReducer,
  user: userReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
