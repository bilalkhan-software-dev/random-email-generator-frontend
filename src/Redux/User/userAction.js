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
import { api } from "../../config/api";
import { data } from "react-router-dom";

const handleError = (error) => {
  // Network error (no response)
  if (!error.response) {
    return {
      message: "Network error. Please check your internet connection.",
      statusCode: 0,
      isNetworkError: true,
    };
  }

  // Handle different HTTP status codes
  const status = error.response.status;
  let defaultMessage = "An error occurred";

  switch (status) {
    case 400:
      defaultMessage = "Invalid request data";
      break;
    case 401:
      defaultMessage = "Unauthorized access";
      break;
    case 403:
      defaultMessage = "Forbidden action";
      break;
    case 404:
      defaultMessage = "Resource not found";
      break;
    case 500:
      defaultMessage = "Internal server error";
      break;
    default:
      defaultMessage = "Request failed";
  }

  return {
    message: error.response.data?.message || defaultMessage,
    statusCode: status,
  };
};

// Enhanced success handler
const handleSuccess = (response) => {
  return {
    message: response.data?.message,
    data: response.data?.data,
    statusCode: response.status,
  };
};

export const saveUserEmailAction = (email) => async (dispatch) => {
  dispatch({ type: SAVE_EMAIL_REQUEST });
  try {
    const response = await api.post(`/user/save-email/${email}`);

    const { message, data, statusCode } = handleSuccess(response);
    dispatch({
      type: SAVE_EMAIL_SUCCESS,
      payload: { message, data, statusCode },
    });
  } catch (error) {
    const { message, statusCode } = handleError(error);
    dispatch({
      type: SAVE_EMAIL_FAILURE,
      payload: { message, statusCode },
    });
  }
};

export const fetchUserSavedEmailAction = () => async (dispatch) => {
  dispatch({ type: FETCH_USER_SAVE_RANDOM_EMAIL_REQUEST });
  try {
    const response = await api.get("/user/saved-emails/");
    const { message, data, statusCode } = handleSuccess(response);
    dispatch({
      type: FETCH_USER_SAVE_RANDOM_EMAIL_SUCCESS,
      payload: { message, data, statusCode },
    });
  } catch (error) {
    const { message, statusCode } = handleError(error);
    dispatch({
      type: FETCH_USER_SAVE_RANDOM_EMAIL_FAILURE,
      payload: { message, statusCode },
    });
  }
};

export const filteredRandomGeneratedEmail =
  (category, length) => async (dispatch) => {
    dispatch({ type: GENERATE_RANDOM_FILTERED_EMAIL_REQUEST });
    try {
      const response = await api.get(
        `/user/filter-emails/${length}?category=${category}`
      );
      const { message, data, statusCode } = handleSuccess(response);
      dispatch({
        type: GENERATE_RANDOM_FILTERED_EMAIL_SUCCESS,
        payload: { message, data, statusCode },
      });
    } catch (error) {
      const { message, statusCode } = handleError(error);
      dispatch({
        type: GENERATE_RANDOM_FILTERED_EMAIL_FAILURE,
        payload: { message, statusCode },
      });
    }
  };
