import axios from "axios";
import { api, APP_BASE_URL } from "../../config/api";
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

// Login Action
export const loginUserAction = (credentials) => async (dispatch) => {
  dispatch({ type: LOGIN_USER_REQUEST });

  try {
    const response = await axios.post(
      `${APP_BASE_URL}/auth/login`,
      credentials
    );
    const { data } = response.data;
    const token = data.token;

    if (token) {
      localStorage.setItem("jwt", token);
    }

    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: {
        user: data,
        token,
        message: response.data.message,
      },
    });

    // return { success: true, data: response.data.data };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Login failed. Please try again.";

    dispatch({
      type: LOGIN_USER_FAILURE,
      payload: errorMessage,
    });
    throw errorMessage;
  }
};

// Register Action
export const registerUserAction = (userData) => async (dispatch) => {
  dispatch({ type: REGISTER_USER_REQUEST });

  try {
    const response = await axios.post(
      `${APP_BASE_URL}/auth/register`,
      userData
    );
    const { data } = response.data;
    const token = data.token;

    if (token) {
      localStorage.setItem("jwt", token);
    }

    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: {
        user: data,
        token,
        message: response.data.message,
      },
    });

    // return { success: true, data: response.data };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Registration failed. Please try again.";

    dispatch({
      type: REGISTER_USER_FAILURE,
      payload: errorMessage,
    });
    throw errorMessage;
  }
};

// User Profile Action
export const userProfileAction = () => async (dispatch) => {
  dispatch({ type: USER_PROFILE_REQUEST });

  try {
    const response = await api.get("/user/profile");
    const { data } = response.data;

    dispatch({
      type: USER_PROFILE_SUCCESS,
      payload: {
        user: data,
        message: response.data.message,
      },
    });

    // return { success: true, data: response.data };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch user profile";

    dispatch({
      type: USER_PROFILE_FAILURE,
      payload: {
        message: errorMessage,
        statusCode: error.response?.status,
      },
    });
    throw error;
  }
};

// Logout Action
export const logoutUserAction = () => (dispatch) => {
  localStorage.removeItem("jwt");
  delete api.defaults.headers.common["Authorization"];
  dispatch({ type: LOGOUT });
};
