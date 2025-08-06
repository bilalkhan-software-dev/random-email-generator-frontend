import axios from "axios";
import {
  GET_RANDOM_EMAIL_BY_CATEGORY_FAILURE,
  GET_RANDOM_EMAIL_BY_CATEGORY_REQUEST,
  GET_RANDOM_EMAIL_BY_CATEGORY_SUCCESS,
} from "./emailActionType";
import { APP_BASE_URL } from "../../config/api";

const handleError = (error) => {
  // Network error (no response)
  if (!error.response) {
    return {
      message: "Network error. Please check your connection.",
      statusCode: 0,
    };
  }

  // Server error response
  return {
    statusCode: error.response.status, // Actual HTTP status code
  };
};

export const generateRandomByCategoryAction =
  (cateory, length) => async (dispatch) => {
    dispatch({ type: GET_RANDOM_EMAIL_BY_CATEGORY_REQUEST });

    try {
      const respones = await axios.get(
        `${APP_BASE_URL}/emails/${cateory}/${length}`
      );

      console.log("Generated Email: ", respones.data);

      dispatch({
        type: GET_RANDOM_EMAIL_BY_CATEGORY_SUCCESS,
        payload: respones.data,
      });

      return respones.data;
    } catch (error) {
      const { message, statusCode } = handleError(error);
      dispatch({
        type: GET_RANDOM_EMAIL_BY_CATEGORY_FAILURE,
        payload: { message, statusCode },
      });
      throw error;
    }
  };
