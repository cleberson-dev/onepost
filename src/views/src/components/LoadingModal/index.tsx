import React from 'react';
import ReactLoading from 'react-loading';

import { LoadingModalContainer } from './styles';

import Modal from '../Modal';

interface LoadingModalProps {
  text?: string;
}

function LoadingModal({ text = '' }: LoadingModalProps) {
  return (
    <Modal>
      <LoadingModalContainer>
        {text}
        <ReactLoading 
          type='spin' 
          width='7%' 
          height='7%' 
        />
      </LoadingModalContainer>
    </Modal>
  );
}

export default LoadingModal;