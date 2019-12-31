import FieldError from '../../interfaces/FieldError.interface';

import { 
  UserData, UserActionTypes,
  GET_SESSION_USER,
  LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL,
  REGISTER_USER, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL,
  LOGOUT_USER
} from './types';


export interface UserState {
  data: UserData;
  login: {
    isFetching: boolean;
    didFailed: boolean;
    errorMessages?: FieldError[];
  };
  register: {
    isFetching: boolean;
    didFailed: boolean;
    errorMessages?: FieldError[];
  };
}



const initialState: UserState = {
  data: {
    username: ''
  },
  login: {
    isFetching: false,
    didFailed: false
  },
  register: {
    isFetching: false,
    didFailed: false
  } 
};

export default function (state = initialState, action: UserActionTypes) {
  switch(action.type) {
    case LOGIN_USER:
      return {
        ...state, 
        login: { isFetching: true, didFailed: false } 
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state, 
        login: { isFetching: false, didFailed: false },
        data: action.payload
      };
    case LOGIN_USER_FAIL:
      return { 
        ...state,
        data: { username: '' }, 
        login: { isFetching: false, didFailed: true, errorMessages: action.payload } 
      };
    case REGISTER_USER:
      return {
        ...state, 
        register: { isFetching: true, didFailed: false } 
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state, 
        data: action.payload,
        register: { isFetching: false, didFailed: false }
      };
    case REGISTER_USER_FAIL:
      return {
        ...state,
        data: { username: '' },
        register: { isFetching: false, didFailed: true, errorMessages: action.payload }
      };
    case GET_SESSION_USER:
      return {...state, data: action.payload };
    case LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
}