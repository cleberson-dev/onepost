import FieldError from '../../interfaces/FieldError.interface';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAIL = 'LOGIN_USER_FAIL';

export const REGISTER_USER = 'REGISTER_USER';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAIL = 'REGISTER_USER_FAIL';

export const GET_SESSION_USER = 'GET_SESSION_USER'; 

export const LOGOUT_USER = 'LOGOUT_USER';



export interface UserData {
  username: string;
}



interface LoginUserAction {
  type: typeof LOGIN_USER;
}

interface LoginUserSuccessAction {
  type: typeof LOGIN_USER_SUCCESS;
  payload: UserData;
}

interface LoginUserFailAction {
  type: typeof LOGIN_USER_FAIL;
  payload: FieldError[];
}

interface RegisterUserAction {
  type: typeof REGISTER_USER;
}

interface RegisterUserSuccessAction {
  type: typeof REGISTER_USER_SUCCESS;
  payload: UserData;
}

interface RegisterUserFailAction {
  type: typeof REGISTER_USER_FAIL;
  payload: FieldError[];
}

interface GetSessionUserAction {
  type: typeof GET_SESSION_USER;
  payload: UserData;
}

interface LogoutUserAction {
  type: typeof LOGOUT_USER;
}





export type UserActionTypes = 
  GetSessionUserAction |
  LoginUserAction | LoginUserSuccessAction | LoginUserFailAction |
  RegisterUserAction | RegisterUserSuccessAction | RegisterUserFailAction |
  LogoutUserAction;