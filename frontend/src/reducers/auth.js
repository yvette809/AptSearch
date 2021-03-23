import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_LOGOUT,
  GET_USERS,
  GETUSERS_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,


} from "../actions/types";


const initialState = {
  userInfo: {},
  user: {},
  loading: true,
  error: {},
};

export const userLoginReducer = (state = initialState, action) => {
  switch (action.type) {

    case LOGIN_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        loading: false,
      };

    case LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_LOGOUT:
      return {
        user: {},
      };

    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {

    case REGISTER_SUCCESS:
      return { loading: false, user: action.payload };
    case REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {

    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};