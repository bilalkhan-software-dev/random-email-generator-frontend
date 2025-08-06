import { LOGOUT } from "../Auth/authActionType";
import {
  FETCH_USER_SAVE_RANDOM_EMAIL_FAILURE,
  FETCH_USER_SAVE_RANDOM_EMAIL_REQUEST,
  FETCH_USER_SAVE_RANDOM_EMAIL_SUCCESS,
  GENERATE_RANDOM_FILTERED_EMAIL_FAILURE,
  GENERATE_RANDOM_FILTERED_EMAIL_REQUEST,
  GENERATE_RANDOM_FILTERED_EMAIL_SUCCESS,
  SAVE_EMAIL_FAILURE,
  SAVE_EMAIL_REQUEST,
  SAVE_EMAIL_SUCCESS,
} from "./userActionType";

const initialState = {
  emails: [],
  userSavedEmails: [],
  email: null,
  loading: false,
  message: null,
  error: null,
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SAVE_EMAIL_REQUEST:
    case FETCH_USER_SAVE_RANDOM_EMAIL_REQUEST:
    case GENERATE_RANDOM_FILTERED_EMAIL_REQUEST:
      return {
        ...state,
        loading: true,
        message: null,
        error: null,
      };

    case SAVE_EMAIL_SUCCESS:
      return {
        ...state,
        // userSavedEmails: [...state.userSavedEmails, payload.data],
        email: payload.data,
        error: null,
        loading: false,
        message: payload.message,
      };

    case FETCH_USER_SAVE_RANDOM_EMAIL_SUCCESS:
      return {
        ...state,
        userSavedEmails: payload.data,
        loading: false,
        message: payload.message,
        error: null,
      };

    case GENERATE_RANDOM_FILTERED_EMAIL_SUCCESS:
      return {
        ...state,
        emails: payload.data,
        loading: false,
        message: payload.message,
        error: null,
      };

    case SAVE_EMAIL_FAILURE:
      return {
        ...state,
        loading: false,
        message: payload.message,
        error: payload.message,
      };

    case FETCH_USER_SAVE_RANDOM_EMAIL_FAILURE:
    case GENERATE_RANDOM_FILTERED_EMAIL_FAILURE:
      return {
        ...state,
        loading: false,
        message: payload.message,
        error: payload.message,
      };

    case LOGOUT:
      return {
        initialState,
      };

    default:
      return state;
  }
};
