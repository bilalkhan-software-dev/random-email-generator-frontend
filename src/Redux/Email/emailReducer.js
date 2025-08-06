import {
  GET_RANDOM_EMAIL_BY_CATEGORY_FAILURE,
  GET_RANDOM_EMAIL_BY_CATEGORY_REQUEST,
  GET_RANDOM_EMAIL_BY_CATEGORY_SUCCESS,
} from "./emailActionType";

const initialState = {
  emails: [],
  loading: false,
  message: null,
};

export const emailReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_RANDOM_EMAIL_BY_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
        message: null,
      };

    case GET_RANDOM_EMAIL_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        message: null,
        emails: payload,
      };

    case GET_RANDOM_EMAIL_BY_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
      };

    default:
      return state;
  }
};
