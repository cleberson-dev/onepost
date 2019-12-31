import axios from 'axios';
import History from 'react-router';
import { ThunkDispatch } from 'redux-thunk';
import { UserState } from './reducers';
import {
  UserActionTypes,
  GET_SESSION_USER,
  LOGIN_USER, LOGIN_USER_SUCCESS, LOGOUT_USER
} from './types';

export type UserThunkDispatcher = ThunkDispatch<UserState, undefined, UserActionTypes>;


export const getSessionUser = () => (dispatch: UserThunkDispatcher) => {
  const sessionUsername = sessionStorage.getItem('user.username') || '';

  const payload = {
    username: sessionUsername
  };

  dispatch({ type: GET_SESSION_USER, payload });
}

export const logoutUser = () => (dispatch: UserThunkDispatcher) => {
  sessionStorage.clear();

  dispatch({ type: LOGOUT_USER });
}