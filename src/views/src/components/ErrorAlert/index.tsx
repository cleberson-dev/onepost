import React from 'react';
import { ErrorAlertContainer, ErrorAlertMessage } from './styles';
import SVGIcon from '../SVGIcon';
import error from '../../img/error.svg';

interface ErrorAlertProps {
  message: string;
}

function ErrorAlert({ message }: ErrorAlertProps) {
  return (
    <ErrorAlertContainer>
      <SVGIcon src={error} alt='' color='#FC8484' />
      <ErrorAlertMessage children={message} />
    </ErrorAlertContainer>
  );
}

export default ErrorAlert;