import axios from 'axios';
import { ThunkDispatch } from 'redux-thunk';
import { UserState } from './reducers';
import {
  UserActionTypes,
  GET_SESSION_USER,
  LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGOUT_USER,
  REGISTER_USER, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL
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

// TO FIX: Obter tipo do objeto history 
export const loginUser = (history: any, username: string, password: string) => (dispatch: UserThunkDispatcher) => {
  dispatch({ type: LOGIN_USER });

  axios
    .post('http://localhost:8080/auth/login', { username, password }, {
      headers: { 'Content-Type': 'application/json' }
    })
    .then((res) => {
      const { token, user } = res.data;
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('user.username', user.username);

      dispatch({ type: LOGIN_USER_SUCCESS, payload: { username: user.username } });

      history.push('/');
    })
    .catch((err) => {
      const { fields } = err.response.data;
      dispatch({ 
        type: LOGIN_USER_FAIL,
        payload: fields
      });
    });
}

interface UserCredentials { 
  username: string; 
  password: string;
  password2: string; 
  email: string; 
}

export const registerUser = 
    (history: any, userCredentials: UserCredentials) => 
    (dispatch: UserThunkDispatcher) => {
    dispatch({ type: REGISTER_USER });

    axios
      .post('http://localhost:8080/auth/register', { ...userCredentials }, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then((res) => {
        const { token, user } = res.data;
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user.username', user.username);

        dispatch({ type: REGISTER_USER_SUCCESS, payload: { username: user.username } });

        history.replace('/');
      })
      .catch((err) => {
        const { fields } = err.response.data;
        dispatch({ 
          type: REGISTER_USER_FAIL,
          payload: fields
        });
      });
  };
