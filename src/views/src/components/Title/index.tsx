import React from 'react';
import { TitleContainer } from './styles';

interface TitleProps {
  text: string;
}

function Title({ text }: TitleProps) {
  return <TitleContainer>{ text }</TitleContainer>;
}

export default Title;
