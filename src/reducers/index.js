import {
  SET_LOADING,
  SET_ERROR,
  SET_TOKEN,
  SET_SEARCH_DATA,
  SET_JOB_DETAILS_DATA,
} from "../actions/index";

const initialState = {
  token: localStorage.getItem("token") || null,
  isLoading: false,
  error: null,
  searchData: [],
  jobDetailsData: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case SET_SEARCH_DATA:
      return {
        ...state,
        searchData: action.payload,
      };
    case SET_JOB_DETAILS_DATA:
      return {
        ...state,
        jobDetailsData: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
