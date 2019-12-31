import React from 'react';
import InputLabel from '../InputLabel';
import InputBox from '../InputBox';
import ErrorAlert from '../ErrorAlert';
import { FormGroupContainer } from './styles';

interface FormGroupProps {
  label: string;
  value: string;
  onChangeHandler: React.ChangeEventHandler<HTMLInputElement>;
  onClickHandler?: React.MouseEventHandler;
  onBlurHandler?: React.FocusEventHandler<HTMLInputElement>;
  id?: string;
  errorMessage?: string;
  type?: string;
}

function FormGroup({
  label, 
  value, 
  onChangeHandler, 
  onClickHandler,
  onBlurHandler, 
  id = '', 
  errorMessage = '',
  type = 'text', 
}: FormGroupProps) {
  return (
    <FormGroupContainer>
      <InputLabel htmlFor={id} label={label} />
      <InputBox
        id={id} 
        value={value}
        type={type}
        onClickHandler={onClickHandler}
        onChangeHandler={onChangeHandler}
        onBlurHandler={onBlurHandler}
        color={errorMessage ? '#FC8484' : ''}
      />
      { errorMessage ? <ErrorAlert message={errorMessage} /> : '' }
    </FormGroupContainer>
  );
}

export default FormGroup;