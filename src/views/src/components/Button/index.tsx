import React from 'react';
import { ButtonContainer } from './styles';

interface ButtonProps {
  text: string;
  size?: number;
  type?: 'submit' | 'button' | 'reset' | undefined;
  onClickHandler?: React.MouseEventHandler;
}

function Button({ 
  text, 
  size = 1,
  type = 'button', 
  onClickHandler = (e) => ({}) 
}: ButtonProps) {
  return (
    <ButtonContainer 
      size={size} 
      type={type}
      onClick={onClickHandler}
    >
      {text}
    </ButtonContainer>
  );
}

export default Button;