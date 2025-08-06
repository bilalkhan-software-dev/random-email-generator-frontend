import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAILURE,
  LOGOUT,
} from "./authActionType";

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  message: null,
  statusCode: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // Register Cases
    case REGISTER_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        message: null,
      };

    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        message: action.payload.message,
        loading: false,
        error: null,
      };

    case REGISTER_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        user: null,
        token: null,
      };

    // Login Cases
    case LOGIN_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        message: null,
      };

    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        message: action.payload.message,
        loading: false,
        error: null,
      };

    case LOGIN_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        user: null,
        token: null,
      };

    // Profile Cases
    case USER_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        message: null,
      };

    case USER_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        message: action.payload.message,
        loading: false,
        error: null,
      };

    case USER_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
        statusCode: action.payload.statusCode,
      };

    // Logout Case
    case LOGOUT:
      return initialState;

    default:
      return state;
  }
};
