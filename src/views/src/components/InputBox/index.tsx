import React from 'react';
import { InputBoxContainer } from './styles';

interface InputBoxProps {
  value: string;
  id?: string;
  type?: string;
  color?: string;
  onClickHandler?: React.MouseEventHandler;
  onChangeHandler?: React.ChangeEventHandler<HTMLInputElement>;
  onBlurHandler?: React.FocusEventHandler<HTMLInputElement>;
}

function InputBox({
  value,
  onChangeHandler,
  onClickHandler,
  onBlurHandler,
  id = '', 
  type = 'text',
  color = ''
}: InputBoxProps) {
  return (
    <InputBoxContainer
      id={id} 
      value={value}
      onClick={onClickHandler ? onClickHandler : (e) => console.log(e)} 
      onChange={onChangeHandler ? onChangeHandler : (e) => console.log(e)}
      onBlur={onBlurHandler ? onBlurHandler : (e) => console.log(e)}
      type={type}
      color={color} 
    />
  );
}

export default InputBox;