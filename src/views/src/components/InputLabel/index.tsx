import React from 'react';
import { InputLabelContainer } from './styles';

interface InputLabelProps {
  label: string;
  htmlFor?: string;
}

function InputLabel({ label, htmlFor = '' }: InputLabelProps) {
  return (
    <InputLabelContainer htmlFor={htmlFor}>
      { label }
    </InputLabelContainer>
  );
}

export default InputLabel;