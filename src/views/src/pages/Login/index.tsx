import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { LoginContainer, FormContainer, LoginTitle } from './styles';

import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup';
import Button from '../../components/Button';
import LoadingModal from '../../components/LoadingModal';

import { AppState } from '../../store';
import { UserThunkDispatcher } from '../../store/user/actions';
import { LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL } from '../../store/user/types';

import { loginUserValidator } from '../../validators/User.validator';
import FieldError from '../../interfaces/FieldError.interface';




function Login() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginStatus = useSelector((state: AppState) => state.user.login);

  const [errorMessages, setErrorMessages] = useState<FieldError[]>([]);

  useEffect(() => {
    if (loginStatus.errorMessages) setErrorMessages(loginStatus.errorMessages);
  }, [ loginStatus ]);

  const usernameError = errorMessages.find((error) => error.name === 'username') || null;
  const passwordError = errorMessages.find((error) => error.name === 'password') || null;

  const loginUserAction = 
    (username: string, password: string) => 
    (dispatch: UserThunkDispatcher) => {
    dispatch({ type: LOGIN_USER });

    axios
      .post('http://localhost:8080/auth/login', { username, password }, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then((res) => {
        const { token, user } = res.data;
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user.username', user.username);

        dispatch({ type: LOGIN_USER_SUCCESS, payload: { username: user.username } });

        history.replace('/');
      })
      .catch((err) => {
        const { fields } = err.response.data;
        dispatch({ 
          type: LOGIN_USER_FAIL,
          payload: fields
        });
      });
  }


  const onSubmitHandler: React.FormEventHandler = (e) => {
    e.preventDefault();

    const errors = loginUserValidator.validate({ username, password });

    if (errors.length > 0) {
      setErrorMessages(errors.map(err => ({ name: err.path, message: err.message })));
      return;
    }

    setErrorMessages([]);
    dispatch(loginUserAction(username, password));
  }
  return (
    <React.Fragment>
      <LoginContainer>
        <Card styles={{ padding: ' 3rem 1.5rem' }}>
          <FormContainer onSubmit={onSubmitHandler}>
            <LoginTitle text="Entre Já!" />
            <FormGroup
              id='username' 
              label='Nome de Usuário' 
              value={username}
              onChangeHandler={(e) => setUsername(e.target.value)}
              errorMessage={usernameError ? usernameError.message : ''}
            />

            <FormGroup
              id='password' 
              label='Senha' 
              value={password}
              type='password'
              onChangeHandler={(e) => setPassword(e.target.value)}
              errorMessage={passwordError ? passwordError.message : ''} 
            />
              
            <Button text='Login' type='submit' />
          </FormContainer>
        </Card>
      </LoginContainer>

      { loginStatus.isFetching ? <LoadingModal text='Entrando...' /> : ''}
    </React.Fragment>
  );
}

export default Login;