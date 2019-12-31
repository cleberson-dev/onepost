import React from 'react';
import { ModalContainer } from './styles';

interface ModalProps {
  children: any;
}

function Modal({ children }: ModalProps) {
  return (
    <ModalContainer>{children}</ModalContainer>
  );
}

export default Modal;