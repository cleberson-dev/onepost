import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RegisterContainer, FormContainer, RegisterButton } from './styles';

import Card from '../../components/Card';
import Title from '../../components/Title';
import FormGroup from '../../components/FormGroup';
import LoadingModal from '../../components/LoadingModal';

import { AppState } from '../../store';
import { registerUser } from '../../store/user/actions';

import { registerUserValidator } from '../../validators/User.validator';
import FieldError from '../../interfaces/FieldError.interface';



function Register() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [email, setEmail] = useState('');

  const registerStatus = useSelector((state: AppState) => state.user.register);

  const [errorMessages, setErrorMessages] = useState<FieldError[]>(
    registerStatus.errorMessages ? registerStatus.errorMessages : []
  );

  useEffect(() => {
    if (registerStatus.errorMessages) setErrorMessages(registerStatus.errorMessages);
  }, [ registerStatus ]);

  const usernameError = errorMessages.find((error) => error.name === 'username') || null;
  const passwordError = errorMessages.find((error) => error.name === 'password') || null;
  const password2Error = errorMessages.find((error) => error.name === 'password2') || null;
  const emailError = errorMessages.find((error) => error.name === 'email') || null;





  const onSubmitHandler: React.FormEventHandler = (e) => {
    e.preventDefault();

    const errors = registerUserValidator.validate({ username, password, password2, email });

    if (errors.length > 0) {
      setErrorMessages(errors.map(err => ({ name: err.path, message: err.message })));
      return;
    }

    dispatch(
      registerUser(
        history, 
        { username, password, password2, email }
      )
    );
  };
  
  return (
    <React.Fragment>
      <RegisterContainer>
        <Card styles={{ padding: ' 3rem 1.5rem' }}>
          <FormContainer onSubmit={onSubmitHandler}>
            <Title text="Registre-se" />

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

            <FormGroup
              id='password2' 
              label='Repita a senha' 
              value={password2}
              type='password'
              onChangeHandler={(e) => setPassword2(e.target.value)}
              errorMessage={password2Error ? password2Error.message : ''} 
            />

            <FormGroup
              id='email' 
              label='Email' 
              value={email}
              type='email'
              onChangeHandler={(e) => setEmail(e.target.value)}
              errorMessage={emailError ? emailError.message : ''}
            />
              
            <RegisterButton text='Registrar' type='submit' />
          </FormContainer>
        </Card>
      </RegisterContainer>
      
      { registerStatus.isFetching ? <LoadingModal text='Registrando...' /> : '' }
    </React.Fragment>
  );
}

export default Register;